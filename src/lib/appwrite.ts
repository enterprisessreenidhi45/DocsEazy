import { Account, Client, TablesDB } from "appwrite";

/**
 * Appwrite project/database/table IDs are not secrets (they're sent from the browser on every
 * request) — hardcoded here with an env override for anyone who later needs a second
 * environment. The endpoint/project combination only works from hostnames registered as a
 * Web platform in the Appwrite console (see "Local dev" for localhost; the production domain
 * needs its own platform entry once it's live).
 */
// The project lives in the Singapore region — the global cloud.appwrite.io endpoint 404s on
// region-pinned projects, it must be the region-specific one (see Appwrite's Regions docs).
export const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://sgp.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "6af8083b002ee2a85211";
export const APPWRITE_DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "6af80dc2001d3398d018";
export const ENQUIRIES_TABLE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_ENQUIRIES_TABLE_ID ?? "enquiries";

export const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
