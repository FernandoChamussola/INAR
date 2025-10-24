import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agência AJR - Soluções de Marketing e Inovação Para negócios",
  description: "A AJR é parceira de negócios que desejam se destacar. Criamos soluções inteligentes em marketing, branding e tecnologia que impulsionam a presença da sua empresa, aumentam resultados e garantem segurança em cada etapa.",
  keywords: "agência digital, marketing digital, desenvolvimento web, gestão de TI, backup e recuperação, pensamento de internet, Beira, Moçambique",
  authors: [{ name: "Agência AJR" }],
  openGraph: {
    title: "Agência AJR - Soluções de Marketing e Inovação Para negócios",
    description: "A AJR é parceira de negócios que desejam se destacar. Criamos soluções inteligentes em marketing, branding e tecnologia.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
}
