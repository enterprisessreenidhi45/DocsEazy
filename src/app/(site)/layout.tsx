import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";

// Public-site chrome (header, footer, mobile action bar). The admin area sits outside this
// group, so it renders with only the bare root layout — no header or footer.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
