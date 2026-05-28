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