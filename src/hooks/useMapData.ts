import { useState, useEffect } from "react";
import { FeatureCollection } from "geojson";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import { TCountryJSON, TCountryRus } from "../services/types";
import axios from "axios";

export const useMapData = () => {
  const [geographies, setGeographies] = useState<any>([]);
  const [countriesRUS, setCountriesRUS] = useState<TCountryRus[]>();

  useEffect(() => {
    axios.get("https://yeivanova.github.io/coaster-collection/geo-map.json").then((res) => {
      const data = feature(
        res.data as Topology,
        (res.data as Topology).objects.countries
      ) as FeatureCollection;
      setGeographies(data.features);
    });

    axios.get("https://yeivanova.github.io/coaster-collection/countries-rus.json").then((res) => {
      const data = [] as TCountryRus[];
      res.data.map((el: TCountryJSON) =>
        data.push({ code: el.alpha3, name: el.name })
      );
      setCountriesRUS(data);
    });
  }, []);

  return [geographies, countriesRUS];
};
