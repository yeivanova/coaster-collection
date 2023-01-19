import React, { FC, useEffect } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import * as d3 from "d3";
import { useInView } from "react-intersection-observer";

export const SectionIntro: FC<{quantity: number}> = ({ quantity }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      d3.select("#text")
        .transition()
        .tween("text", () => {
          const interpolator = d3.interpolateNumber(+quantity / 2, +quantity);
          return function (t: number) {
            d3.select(this).text(Math.floor(interpolator(t)));
          };
        })
        .duration(1000);
    }
  }, [inView, quantity]);

  return (
    <section id="section-1" className={cn(styles.screen, styles.screen_1)} ref={ref}>
        <h1 className={styles.h1}>
          На данный момент эта коллекция насчитывает
          <div id="counter" className={styles.quantity}>
            <svg width="100%" height="320" viewBox="0 0 530 320">
              <text
                id="text"
                className={styles.text}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
              ></text>
            </svg>
          </div>
          <span className={styles.subtext}>бирдекелей</span>
        </h1>
        <p className={styles.h1}>
          и вся статистика на этой странице рассчитана из этого числа
        </p>
        <img
          onClick={() => {
            const element = document.getElementById("section-2");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={styles.go}
          src={require("../../images/gagarin.png")}
          width="200"
          height="200"
          alt="Поехали!"
        />
      </section>
  );
};
