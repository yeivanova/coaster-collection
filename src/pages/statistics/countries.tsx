import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { HorizontalBarChart } from "../../components/statistics/horizontal-bar-chart/horizontal-bar-chart";
import { TChartData } from "../../services/types";
import { useMapData } from "../../hooks/useMapData";
import { Map } from "../../components/statistics/map/map";

type TSectionCountriesProps = {
  setActiveSection: (value: string) => void;
};

export const SectionCountries: FC<TSectionCountriesProps> = ({
  setActiveSection,
}) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const params = useSelector((state: RootState) => state.coasters.params);
  const quantity = items.length;
  const [countryData, setCountryData] = useState<TChartData[]>([]);
  const [activeCountry, setActiveCountry] = useState<string>(params.country[0]);
  const [geographies, countriesRUS] = useMapData();

  const uniqueCountryParams = (): TChartData[] => {
    const dataset = [] as TChartData[];

    params.country.forEach((param) => {
      const value = Number(
        (items.filter((item) => item.country === param).length * 100) / quantity
      ).toFixed(1);

      dataset.push({
        label: param,
        value: +value,
      });
    });

    dataset.sort((a, b) => (a.label > b.label ? 1 : -1));
    return dataset;
  };

  useEffect(() => {
    if (inView) {
      setActiveSection("countries");
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    if (items.length > 0) {
      setCountryData(uniqueCountryParams());
    }
  }, [items, quantity]);

  return (
    <section
      id="countries"
      className={cn(styles.screen, styles.screen_4)}
      ref={ref}
    >
      <div className={cn(styles.col, styles.countries_col)}>
      <div
          style={{
            transform: inView ? "none" : "translateY(-50px)",
            opacity: inView ? 1 : 0,
            transition: `transform 0.6s ease-in-out ${
              isDesktop ? "0.5s" : "0s"
            }, opacity 0.6s ease-in-out ${isDesktop ? "0.5s" : "0s"}`,
          }}
        className={styles.countries_wrapper}>
          <ul className={styles.countries_list}>
            {countryData.map((country, index) => {
              return (
                <li
                  className={cn(
                    styles.country_item,
                    country.label === activeCountry &&
                      styles.country_item_active
                  )}
                  onMouseOver={() => setActiveCountry(country.label)}
                  key={index}
                  style={{
                    transform: inView ? "none" : "translateY(-50px)",
                    opacity: inView ? 1 : 0,
                    transition: `transform 0.3s ease-in-out ${
                      index / 100 + 0.5
                    }s, opacity 0.3s ease-in-out  ${index / 100 + 0.5}s`,
                  }}
                >
                  {country.label}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={styles.map_wrapper}
          style={{
            transform: inView ? "none" : "scale(0.75)",
            opacity: inView ? 1 : 0,
            transition: `transform 0.6s ease-in-out ${
              isDesktop ? "0.5s" : "0s"
            }, opacity 0.6s ease-in-out ${isDesktop ? "0.5s" : "0s"}`,
          }}
        >
        <Map
          geoData={geographies}
          countriesNames={countriesRUS}
          width={1109}
          height={616}
          inView={inView}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        ></Map>
        </div>
        <div
          style={{
            transform: inView ? "none" : "translateY(-50px)",
            opacity: inView ? 1 : 0,
            transition: `transform 0.6s ease-in-out ${
              isDesktop ? "0.5s" : "0s"
            }, opacity 0.6s ease-in-out ${isDesktop ? "0.5s" : "0s"}`,
          }}
        >
          <HorizontalBarChart
            data={countryData}
            width={1548}
            height={73}
            inView={inView}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
          ></HorizontalBarChart>
        </div>
      </div>
    </section>
  );
};
