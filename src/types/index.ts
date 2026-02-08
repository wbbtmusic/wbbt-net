export interface SocialLinks {
  spotify?: string;
  instagram?: string;
  youtube?: string;
  apple?: string;
  soundcloud?: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  realName: string;
  image: string;
  banner: string;
  bio: string;
  email: string;
  links: SocialLinks;
  topTracks: string[];
  comingSoon?: boolean;
}

export interface Release {
  id: number;
  artist: string;
  title: string;
  cover: string;
  spotify: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string;
  tags?: string;
  metaDesc?: string;
  metaKeywords?: string;
  lastModified?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
}

export interface PageSEO {
  url: string;
  seo: SEOMeta;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  founderStory?: string[];
  missionTitle: string;
  missionText: string;
  contactTitle: string;
  contactEmail: string;
  contactDemoUrl: string;
  address?: {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}
