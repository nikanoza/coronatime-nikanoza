export type CountryType = {
  code: string;
  name: {
    en: string;
    ka: string;
  };
  statistics: {
    confirmed: number;
    critical: number;
    deaths: number;
    recovered: number;
  };
  id: string;
};

export type Statistics = {
  confirmed: number;
  critical: number;
  deaths: number;
  recovered: number;
};
