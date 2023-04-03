import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { TChartData } from "../../services/types";

type TSectionCountriesProps = {
  setActiveSection: (value: string) => void;
};

export const SectionCountries: FC<TSectionCountriesProps> = ({ setActiveSection }) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const params = useSelector((state: RootState) => state.coasters.params);
  const quantity = items.length;

  const uniqueTypeParams = (): TChartData[] => {
    const dataset = [] as TChartData[];
    const othersQuantity = items.filter(
      (item) => item.shape !== "Квадрат" && item.shape !== "Круг"
    ).length;

    params.shape.forEach((param) => {
      if (param !== "Квадрат" && param !== "Круг") {
        const value = Number(
          (items.filter((item) => item.shape === param).length * 100) /
            othersQuantity
        ).toFixed(1);

        dataset.push({
          label: param,
          value: +value,
        });
      }
    });

    dataset.sort((a, b) => (a < b) ? 1 : -1);
    return dataset;
  };

  useEffect(() => {
    if (inView) {
      setActiveSection("countries");
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    if (items.length > 0) {
      
    }
  }, [items, quantity]);

  return (
    <section
      id="countries"
      className={cn(styles.screen, styles.screen_4)}
      ref={ref}
    >
      test
    </section>
  );
};
