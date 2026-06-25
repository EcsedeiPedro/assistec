export type BoxWithCompany = {
  id: string;
  number: number;
  observation: string | null;

  companies: {
    id: string;
    name: string;
  }[];
};

export type BoxListItem = {
  id: string;
  number: number;
  observation: string | null;
  companies?: {
    id: string;
    name: string;
  }[];
};