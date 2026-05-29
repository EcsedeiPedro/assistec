export type BoxWithCompany = {
  id: string;
  number: number;
  observation: string | null;

  companyId: string;

  company: {
    id: string;
    name: string;
  };
};

export type BoxListItem = {
  id: string;
  number: number;
  observation: string | null;
  company?: {
    name: string;
  };
};