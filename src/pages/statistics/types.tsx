import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";

export const SectionTypes: FC = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;
  const [typeBeer, setTypeBeer] = useState<string>("0");
  const [typeBar, setTypeBar] = useState<string>("0");
  const [typeOthers, setTypeOthers] = useState<string>("0");

  useEffect(() => {
    if (items.length > 0) {
      setTypeBeer(
        Number(
          (items.filter((item) => item.type === "Пиво").length * 100) / quantity
        ).toFixed(2)
      );
      setTypeBar(
        Number(
          (items.filter((item) => item.type === "Заведение").length * 100) /
            quantity
        ).toFixed(2)
      );
      setTypeOthers(
        Number(
          (items.filter(
            (item) => item.type !== "Пиво" && item.type !== "Заведение"
          ).length *
            100) /
            quantity
        ).toFixed(2)
      );
    }
  }, [items, quantity]);

  useEffect(() => {
    if (inView) {
      countToPercent("#typeBeer", typeBeer);
      countToPercent("#typeBar", typeBar);
      countToPercent("#typeOthers", typeOthers);
    }
  }, [inView, typeBeer, typeBar, typeOthers]);

  const countToPercent = (id: string, numberStr: string) => {
    d3.select(id)
      .transition()
      .tween("text", () => {
        const interpolator = d3.interpolateNumber(+numberStr / 2, +numberStr);
        return function (t: number) {
          d3.select(this).text(+interpolator(t).toFixed(2) + "%");
        };
      })
      .duration(1000);
  };

  return (
    <section
      id="section-2"
      className={cn(styles.screen, styles.screen_2)}
      ref={ref}
    >
      <div className={styles.col_3}>
        <span id="typeBeer" className={styles.percent}></span>
        Пиво
      </div>
      <div className={styles.col_3}>
        <span id="typeBar" className={styles.percent}></span>
        Заведение
      </div>
      <div className={styles.col_3}>
        <span id="typeOthers" className={styles.percent}></span>
        Остальное
      </div>
    </section>
  );
};
