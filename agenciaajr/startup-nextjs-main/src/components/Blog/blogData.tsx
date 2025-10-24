import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Como o Marketing Digital pode transformar seu negócio em 2025",
    paragraph:
      "Descubra as estratégias de marketing digital que estão revolucionando os negócios em Moçambique e como sua empresa pode se beneficiar dessas tendências.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    author: {
      name: "Equipe AJR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      designation: "Especialistas em Marketing",
    },
    tags: ["marketing digital"],
    publishDate: "Janeiro 2025",
  },
  {
    id: 2,
    title: "Desenvolvimento de Software: Por que investir em soluções personalizadas?",
    paragraph:
      "Entenda os benefícios de ter um software desenvolvido especificamente para suas necessidades e como isso pode otimizar seus processos empresariais.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    author: {
      name: "Equipe AJR",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      designation: "Desenvolvedores",
    },
    tags: ["desenvolvimento"],
    publishDate: "Janeiro 2025",
  },
  {
    id: 3,
    title: "Gestão de TI: A importância da segurança digital para empresas",
    paragraph:
      "Saiba como proteger seus dados empresariais e implementar uma estratégia de TI robusta que garanta a continuidade do seu negócio.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center",
    author: {
      name: "Equipe AJR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      designation: "Especialistas em TI",
    },
    tags: ["tecnologia"],
    publishDate: "Janeiro 2025",
  },
];
export default blogData;
