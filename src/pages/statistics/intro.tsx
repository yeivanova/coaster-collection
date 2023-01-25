import React, { FC, useEffect } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import * as d3 from "d3";
import { useInView } from "react-intersection-observer";

export const SectionIntro: FC<{ quantity: number }> = ({ quantity }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      d3.select("#text")
        .transition()
        .delay(800)
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
    <section
      id="section-1"
      className={cn(styles.screen, styles.screen_1)}
      ref={ref}
    >
      <h1 className={styles.h1}>
        <div
          style={{
            transform: inView ? "none" : "translateY(-50px)",
            opacity: inView ? 1 : 0,
            transition:
              "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          На данный момент эта коллекция насчитывает
        </div>
        <div
          id="counter"
          className={styles.quantity}
          style={{
            transform: inView ? "none" : "translateY(-200px)",
            opacity: inView ? 1 : 0,
            transition:
              "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
          }}
        >
          <svg width="100%" height="320" viewBox="0 0 530 320">
            <text
              id="text"
              className={styles.text}
              x="50%"
              y="50%"
              fill="transparent"
              dominantBaseline="middle"
              textAnchor="middle"
            ></text>
          </svg>
        </div>
        <div
          className={styles.subtext}
          style={{
            transform: inView ? "none" : "translateY(-100px)",
            opacity: inView ? 1 : 0,
            transition:
              "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2s",
          }}
        >
          бирдекелей
        </div>
      </h1>
      <p
        className={styles.h1}
        style={{
          transform: inView ? "none" : "translateY(-100px)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2.6s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2.6s",
        }}
      >
        и вся статистика на этой странице рассчитана из этого числа
      </p>
      <div
        className={styles.go}
        style={{
          transform: inView
            ? "none"
            : "translateY(-200px) scale(0) rotate(1800deg)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 3.6s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 3.6s",
        }}
      >
        <img
          onClick={() => {
            const element = document.getElementById("section-2");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          src={require("../../images/gagarin.png")}
          width="200"
          height="200"
          alt="Поехали!"
        />
      </div>
    </section>
  );
};
