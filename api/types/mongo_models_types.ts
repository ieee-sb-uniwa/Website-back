// import aaa from "../db/data/council_en.json";

// export type Aaa = typeof aaa;
export interface Council {
  id: number;
  photo: string;
  socials: { id: number; type: string; url: string}[];
  info: {
    gr: {role: string; name: string }
    en: {role: string; name: string }
  };
}

export interface Counselor {
  id: number;
  photo: string;
  socials: { id: number; type: string; url: string}[];
  info: {
    gr: {role: string; name: string }
    en: {role: string; name: string }
  };
}

export interface People {
  id: number;
  photo: string;
  socials: { id: number; type: string; url: string}[];
  info: {
    gr: {roles: string[]; name: string }
    en: {roles: string[]; name: string }
  };
}

export interface ScientificGroup {
  id: number,
  name: string,
  name_short: string,
  wallpaper: string,
  images: string[]
  info: {
    gr: {description: string}
    en: {description: string}
  }
}

export interface Project {
  id: 0,
  sg: string,
  name: string,
  status: string,
  thumbnail: string,
  images: string[],
  technologies: string[],
  info: {
    gr: {description: string, links: {id: number; title: string; url: string}[]}
    en: {description: string, links: {id: number; title: string; url: string}[]}
  }
}

export interface Event {
  id: number
  date: string;
  end_date: string;
  registration_form: string;
  registration_deadline: string;
  thumbnail: string;
  images: string[];
  info: {
    gr: {location: string; title: string; keywords: string[]; description: string; links: {id: number; title: string; url: string}[]}
    en: {location: string; title: string; keywords: string[]; description: string; links: {id: number; title: string; url: string}[]}
  };
}

export interface ThirdParty {
  id: number
  date: string;
  end_date: string;
  registration_form: string;
  registration_deadline: string;
  thumbnail: string;
  images: string[];
  info: {
    gr: {location: string; title: string; keywords: string[]; description: string; links: {id: number; title: string; url: string}[]}
    en: {location: string; title: string; keywords: string[]; description: string; links: {id: number; title: string; url: string}[]}
  };
}

// export interface News {
//   id: number;
//   date: string;
//   title: string;
//   keywords: string[];
//   images: string[];
//   description: string;
//   links: { title: string; url: string }[];
// }

// export interface SG {
//   id: number;
//   name: string;
//   logo: string;
//   leader: string;
//   description: string;
//   projects: {
//     title: string;
//     image: string;
//     description: string;
//     keys: string[];
//   }[];
// }

// export interface Department {
//   id: number;
//   name: string;
//   logo: string;
//   leader: string;
//   description: string;
// }
