import React, { FC, useEffect } from "react";
import styles from "./statistics.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Link } from "react-router-dom";
import * as d3 from "d3";

export const StatisticsPage: FC = () => {
  const quantity = useSelector(
    (state: RootState) => state.coasters.items
  ).length;

  useEffect(() => {
    d3.select("#text")
      .transition()
      .tween("text", () => {
        const interpolator = d3.interpolateNumber(quantity / 2, quantity);
        return function (t: number) {
          d3.select(this).text(Math.round(interpolator(t)));
        };
      })
      .duration(1000);
  }, [quantity]);

  return (
    <main className={styles.main}>
      <Link to="/" className={styles.back_home}>
        На главную
      </Link>
      <h1>
        На данный момент эта коллекция насчитывает
        <div id="counter" className={styles.quantity}>
          <svg width="100%" height="320" viewBox="0 0 530 320">
            <text
              id="text"
              className={styles.text}
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
            ></text>
          </svg>
        </div>
        <span className={styles.subtext}>бирдекелей</span>
      </h1>
      <p className={styles.h1}>
        и вся статистика на этой странице рассчитана из этого числа
      </p>
    </main>
  );
};
