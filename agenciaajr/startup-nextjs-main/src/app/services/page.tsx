import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossos Serviços - Agência AJR",
  description: "Conheça todos os serviços oferecidos pela Agência AJR: Desenvolvimento de Softwares, Gestão de TI, Desenvolvimento Web, Backup & Recuperação, Pensamento de Internet e Marketing Digital.",
  keywords: "serviços, desenvolvimento de software, gestão de TI, desenvolvimento web, backup, marketing digital, agência AJR",
  authors: [{ name: "Agência AJR" }],
  openGraph: {
    title: "Nossos Serviços - Agência AJR",
    description: "Conheça todos os serviços oferecidos pela Agência AJR para impulsionar seu negócio.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function Services() {
  return (
    <>
      <ScrollUp />
      <Features />
      {/* <AboutSectionOne />
      <AboutSectionTwo /> */}
      {/* <Portfolio />
      <Testimonials /> */}
    </>
  );
}
