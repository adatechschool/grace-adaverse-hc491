export interface Programme {
  id: number;
  name: string;
}

export interface Promotion {
  id: number;
  name: string;
  // la table promotions a un champ date ; on laisse le type permissif
  date?: string | Date;
}
