"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Query } from "appwrite";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Search,
  SearchX,
} from "lucide-react";
import { site } from "@/data/site";
import { account, APPWRITE_DATABASE_ID, ENQUIRIES_TABLE_ID, tablesDB } from "@/lib/appwrite";
import { Logo } from "./Logo";

// ---------------------------------------------------------------------------------------
// Live data: rows come from the "enquiries" Appwrite table, written by the public enquiry
// form (EnquiryForm.tsx). Columns mirror the form's own fields (name, phone, email, service,
// message) plus what an admin reviewing a queue actually needs (where it stands, and a way
// to change that).
// ---------------------------------------------------------------------------------------

type Status = "New" | "In Progress" | "Completed";

const STATUSES: Status[] = ["New", "In Progress", "Completed"];

const statusStyle: Record<Status, string> = {
  New: "bg-blue-50 text-[#2a78d6]",
  "In Progress": "bg-amber/15 text-amber-deep",
  Completed: "bg-[#0ca30c]/10 text-[#006300]",
};

type Row = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
  status: Status;
};

const PAGE_SIZE = 5;

type EnquiryRow = {
  $id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  status?: string;
};

function toRow(enquiry: EnquiryRow): Row {
  return {
    id: enquiry.$id,
    name: enquiry.name,
    phone: enquiry.phone,
    email: enquiry.email || undefined,
    service: enquiry.service || "—",
    message: enquiry.message || "—",
    status: (STATUSES as string[]).includes(enquiry.status ?? "")
      ? (enquiry.status as Status)
      : "New",
  };
}

// ---------------------------------------------------------------------------------------

function Topbar({ onLogOut }: { onLogOut: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu on an outside click/tap or Escape — without this it only ever closes by
  // clicking the toggle button again.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="flex items-center gap-4 border-b border-line bg-white px-5 py-4 sm:px-8">
      <Logo />
      <div className="ml-auto flex items-center gap-3">
        <span className="relative grid size-10 place-items-center rounded-full border border-line text-muted">
          <Bell className="size-5" aria-hidden="true" />
          <span className="absolute top-2 right-2.5 size-2 rounded-full bg-red-500" aria-hidden="true" />
        </span>
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full border border-line py-1 pr-2 pl-1"
          >
            <span className="grid size-8 place-items-center rounded-full bg-navy text-sm font-semibold text-amber">
              A
            </span>
            <span className="hidden text-left text-sm sm:block">
              <span className="block font-semibold text-navy">Admin</span>
              <span className="block text-xs text-muted">{site.name}</span>
            </span>
            <ChevronDown className="size-4 text-muted" aria-hidden="true" />
          </button>
          {open && (
            <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-line bg-white py-1.5 shadow-lg">
              <button
                type="button"
                onClick={onLogOut}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm font-medium text-ink hover:bg-paper-dim"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

type StatusFilter = "All" | Status;

function EnquiriesTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [page, setPage] = useState(1);

  async function load() {
    setLoadState("loading");
    try {
      const result = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: ENQUIRIES_TABLE_ID,
        queries: [Query.orderDesc("$createdAt"), Query.limit(100)],
      });
      setRows(result.rows.map((row) => toRow(row as unknown as EnquiryRow)));
      setLoadState("ready");
    } catch (error) {
      console.error("Could not load enquiries:", error);
      setLoadState("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: Status) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
    try {
      await tablesDB.updateRow({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: ENQUIRIES_TABLE_ID,
        rowId: id,
        data: { status },
      });
    } catch (error) {
      console.error("Could not save the status change:", error);
    }
  }

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter !== "All" && row.status !== statusFilter) return false;
      if (!query) return true;
      return (
        row.name.toLowerCase().includes(query) ||
        row.phone.toLowerCase().includes(query) ||
        (row.email?.toLowerCase().includes(query) ?? false) ||
        row.service.toLowerCase().includes(query) ||
        row.message.toLowerCase().includes(query)
      );
    });
  }, [rows, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  // Clamp rather than reset-on-every-keystroke: only matters once a filter shrinks the result
  // set below the current page, so it doesn't fight the user while they're still typing.
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filteredRows.slice(startIdx, startIdx + PAGE_SIZE);

  const filters: StatusFilter[] = ["All", ...STATUSES];

  function countFor(filter: StatusFilter) {
    return filter === "All" ? rows.length : rows.filter((r) => r.status === filter).length;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex flex-col gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy">Enquiries</h2>
          <button
            type="button"
            onClick={load}
            disabled={loadState === "loading"}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-muted hover:border-teal hover:text-teal-deep disabled:opacity-60"
          >
            <RefreshCw className={`size-3.5 ${loadState === "loading" ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search: real, filters the rows below as you type (moved here from the top bar — it
              searches this table, not "the dashboard" in the abstract, so it belongs next to
              what it searches). */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, phone, service…"
              className="w-full rounded-lg border border-line bg-white py-2.5 pr-3 pl-10 text-sm text-ink placeholder:text-muted/80 focus:border-teal focus:outline-none"
            />
          </div>

          {/* Status filter */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setStatusFilter(f);
                  setPage(1);
                }}
                aria-pressed={statusFilter === f}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === f
                    ? "border-navy bg-navy text-paper"
                    : "border-line bg-white text-muted hover:border-teal hover:text-teal-deep"
                }`}
              >
                {f} <span className={statusFilter === f ? "text-paper/70" : "text-muted/70"}>({countFor(f)})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-wide text-muted uppercase">
              <th scope="col" className="px-5 py-3 font-semibold sm:px-6">
                Sr No
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Name
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Contact
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Service
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Details
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-3 py-3 pr-5 font-semibold sm:pr-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loadState === "loading" && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted">
                  <LoaderCircle className="mx-auto size-6 animate-spin text-muted/70" aria-hidden="true" />
                  <p className="mt-2 text-sm">Loading enquiries…</p>
                </td>
              </tr>
            )}
            {loadState === "error" && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted">
                  <p className="text-sm text-red-700">Couldn&apos;t load enquiries. Check your connection.</p>
                  <button
                    type="button"
                    onClick={load}
                    className="mt-2 font-semibold text-amber-deep underline hover:text-navy"
                  >
                    Try again
                  </button>
                </td>
              </tr>
            )}
            {loadState === "ready" && pageRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted">
                  <SearchX className="mx-auto size-6 text-muted/70" aria-hidden="true" />
                  <p className="mt-2 text-sm">
                    {rows.length === 0
                      ? "No enquiries yet — they'll show up here as soon as someone submits the contact form."
                      : "No enquiries match your search or filter."}
                  </p>
                </td>
              </tr>
            )}
            {loadState === "ready" && pageRows.map((row, i) => (
              <tr key={row.id} className="align-top hover:bg-paper-dim/60">
                <td className="px-5 py-4 text-muted sm:px-6">{startIdx + i + 1}</td>
                <td className="px-3 py-4 font-medium whitespace-nowrap text-navy">{row.name}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <a href={`tel:${row.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-ink hover:text-amber-deep">
                    <Phone className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
                    {row.phone}
                  </a>
                  {row.email && (
                    <a href={`mailto:${row.email}`} className="mt-0.5 flex items-center gap-1.5 text-xs text-muted hover:text-amber-deep">
                      <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                      {row.email}
                    </a>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-ink">{row.service}</td>
                <td className="px-3 py-4 text-muted">
                  <span className="block max-w-xs">{row.message}</span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-4 pr-5 whitespace-nowrap sm:pr-6">
                  <label className="sr-only" htmlFor={`status-${row.id}`}>
                    Change status for {row.name}
                  </label>
                  <select
                    id={`status-${row.id}`}
                    value={row.status}
                    onChange={(e) => updateStatus(row.id, e.target.value as Status)}
                    className="rounded-md border border-line bg-white px-2 py-1.5 text-xs font-medium text-ink focus:border-teal focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-5 py-4 text-sm sm:flex-row sm:px-6">
        <p className="text-muted">
          {filteredRows.length === 0
            ? "No results"
            : `Showing ${startIdx + 1}–${Math.min(startIdx + PAGE_SIZE, filteredRows.length)} of ${filteredRows.length}`}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="grid size-8 place-items-center rounded-md border border-line text-muted hover:border-teal hover:text-teal-deep disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`grid size-8 place-items-center rounded-md border text-xs font-semibold ${
                p === currentPage
                  ? "border-navy bg-navy text-paper"
                  : "border-line text-ink hover:border-teal hover:text-teal-deep"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className="grid size-8 place-items-center rounded-md border border-line text-muted hover:border-teal hover:text-teal-deep disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let active = true;
    account
      .get()
      .then(() => {
        if (!active) return;
        setAuthed(true);
        setChecked(true);
      })
      .catch(() => {
        if (!active) return;
        setChecked(true);
        window.location.replace("/admin/");
      });
    return () => {
      active = false;
    };
  }, []);

  async function logOut() {
    try {
      await account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error("Could not sign out cleanly:", error);
    }
    window.location.assign("/admin/");
  }

  if (!checked || !authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper text-muted">
        {checked ? "Redirecting to sign in…" : "Checking session…"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-dim">
      <Topbar onLogOut={logOut} />

      <main className="mx-auto max-w-6xl space-y-6 p-5 sm:p-8">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy to-navy-soft p-6 text-paper sm:p-8">
          <span
            aria-hidden="true"
            className="absolute -top-10 -right-10 size-48 rounded-full bg-teal/20 blur-2xl"
          />
          <p className="text-xs font-semibold tracking-wide text-amber-light uppercase">Welcome back</p>
          <h1 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">Admin 👋</h1>
          <p className="mt-2 max-w-md text-paper/80">
            Here&apos;s the enquiry queue for {site.name}.
          </p>
          <span className="mt-4 block h-1 w-12 rounded-full bg-amber" aria-hidden="true" />
        </div>

        <EnquiriesTable />
      </main>
    </div>
  );
}
