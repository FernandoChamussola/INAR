import ScrollUp from "@/components/Common/ScrollUp";
import Portfolio from "@/components/Portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio - Agência AJR",
  description: "Conheça os projetos realizados pela Agência AJR. Veja nosso portfólio de trabalhos em desenvolvimento de software, gestão de TI, desenvolvimento web e marketing digital.",
  keywords: "portfólio, projetos, trabalhos realizados, desenvolvimento, agência AJR",
  authors: [{ name: "Agência AJR" }],
  openGraph: {
    title: "Portfólio - Agência AJR",
    description: "Conheça os projetos realizados pela Agência AJR.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <ScrollUp />
      <Portfolio />
    </>
  );
}
