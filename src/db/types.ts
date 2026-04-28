export interface Programme {
  id: number;
  name: string;
}

export interface Promotion {
  id: number;
  name: string;
  date?: string | Date;
}

export type Project = {
  id: number;
  title: string;
  thumbnail: string | null;
  adresseweb: string;
  gitHubLink: string;
  demoLink: string | null;
  creationDate: string;
  publicationDate: string | null;
  promotionId: number;
  programmeId: number;
}
