export type TCoaster = {
  id: number;
  beerType: string[];
  brand: string;
  country: string;
  kind: string;
  category: string;
  type: string;
  reverse: string;
  shape: string;
};

export type TParams = "type" | "brand" | "kind" | "country" | "shape" | "reverse";

export type TChartData = {
  label: string;
  value: number;
};

export type TCountryJSON = {
  id: number;
  alpha2: string;
  alpha3: string;
  name: string;
};

export type TCountryRus = {
  code: string;
  name: string;
};
