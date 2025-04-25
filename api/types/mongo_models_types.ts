import aaa from "../db/data/council_en.json";

export type Aaa = typeof aaa;
export interface ThirdParty {
  id: number;
  date: string;
  keywords: string[];
  title: string;
  images: string[];
  description: string;
  socials: { id: number; title: string; url: string }[];
}

export interface Council {
  id: number;
  role: string;
  name: string;
  photo: string;
  socials: { id: number; type: string; url: string}[];
}

export interface Counselor {
  id: number;
  role: string;
  name: string;
  photo: string;
  links: { id: number; type: string; url: string}[];
}

export interface Department {
  id: number;
  name: string;
  logo: string;
  leader: string;
  description: string;
}

export interface Event {
  id: number;
  date: string;
  location: string;
  title: string;
  thumbnail: string;
  keywords: string[];
  description: string[];
  registration_form: string;
  registration_deadline: string;
  images: string[];
  links: { id: number; title: string; url: string }[];
}

export interface News {
  id: number;
  date: string;
  title: string;
  keywords: string[];
  images: string[];
  description: string;
  links: { title: string; url: string }[];
}

export interface SG {
  id: number;
  name: string;
  logo: string;
  leader: string;
  description: string;
  projects: {
    title: string;
    image: string;
    description: string;
    keys: string[];
  }[];
}
