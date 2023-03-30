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
