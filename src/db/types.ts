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
  adresseweb: string | null;
  gitHubLink: string;
  demoLink: string | null;
  creationDate: Date | null;
  publicationDate: Date | null;
  promotionId: number;
  programmeId: number;
}
