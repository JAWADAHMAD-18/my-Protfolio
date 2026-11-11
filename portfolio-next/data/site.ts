export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  responseTime: string;
  whatsapp: {
    number: string;
    display: string;
    url: string;
  };
  links: {
    github: string;
    linkedin: string;
    zalvro: string;
  };
  resume: {
    url: string;
    fallback: string;
    exists: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "Jawad Ahmad",
  role: "Full-stack & AI application engineer",
  tagline: "Turning ideas into scalable, impactful products. Web, mobile and AI, built end to end.",
  bio: "Full-stack and AI application engineer building web apps, React Native mobile apps and AI voice and chat systems, from idea to production.",
  email: "jawadahmad5618@gmail.com",
  responseTime: "Usually within a few hours.",
  whatsapp: {
    number: "+923037741461",
    display: "+92 303 7741461",
    url: "https://wa.me/923037741461",
  },
  links: {
    github: "https://github.com/JAWADAHMAD-18",
    linkedin: "https://www.linkedin.com/in/jawad-tech/",
    zalvro: "https://zalvrohq.com",
  },
  resume: {
    url: "/resume.pdf",
    fallback: "/contact",
    exists: true,
  },
};
