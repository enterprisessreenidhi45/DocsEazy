import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { SectionDivider } from "@/components/SectionDivider";
import { Testimonials } from "@/components/Testimonials";
import { TopServices } from "@/components/TopServices";
import { TrustStats } from "@/components/TrustStats";
import { faqs } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider from="bg-navy" to="fill-paper-dim" rotate />
      <TrustStats />
      <SectionDivider from="bg-paper-dim" to="fill-paper" rotate />
      <TopServices />
      <SectionDivider from="bg-paper" to="fill-navy" rotate />
      <Process />
      <SectionDivider from="bg-navy" to="fill-paper" rotate />
      <Testimonials />
      <SectionDivider from="bg-paper" to="fill-paper-dim" rotate />
      <Faq items={faqs} />
      <SectionDivider from="bg-paper-dim" to="fill-amber" rotate />
      <FinalCta />
      <SectionDivider from="bg-amber" to="fill-navy-deep" rotate />
    </>
  );
}
