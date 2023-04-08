import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { HorizontalBarChart } from "../../components/statistics/horizontal-bar-chart/horizontal-bar-chart";
import { TChartData } from "../../services/types";

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
        <ul className={styles.countries_list}>
          {countryData.map((country, index) => {
            return (
              <li
                className={cn(
                  styles.country_item,
                  country.label === activeCountry && styles.country_item_active
                )}
                onMouseOver={() => setActiveCountry(country.label)}
                key={index}
              >
                {country.label}
              </li>
            );
          })}
        </ul>
        <HorizontalBarChart
          data={countryData}
          width={1548}
          height={73}
          inView={inView}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        ></HorizontalBarChart>
      </div>
    </section>
  );
};
