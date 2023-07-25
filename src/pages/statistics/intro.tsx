import { FC, useEffect, useContext } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import * as d3 from "d3";
import { DeviceContext } from "src/services/app-context";
import { useInView } from "react-intersection-observer";
import { HashLink } from "react-router-hash-link";

type TSectionIntroProps = {
  quantity: number;
  setActiveSection: (value: string) => void;
};

export const SectionIntro: FC<TSectionIntroProps> = ({
  quantity,
  setActiveSection,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { isDesktop } = useContext(DeviceContext);

  useEffect(() => {
    if (inView) {
      setActiveSection("intro");
    }
  }, [inView]);

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
      id="intro"
      className={cn(styles.screen, styles.screen_1)}
      ref={ref}
    >
      <h1 className={styles.h1}>
        <div
          style={{
            transform: inView ? "none" : "translateY(-50px)",
            opacity: inView ? 1 : 0,
            transition:
              "transform 0.3s ease-in-out 0.01s, opacity 0.3s ease-in-out 0.01s",
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
              "transform 0.5s ease-in-out 0.05s, opacity 0.5s ease-in-out 0.05s",
          }}
        >
          <svg viewBox="0 0 600 280">
            <text
              id="text"
              className={styles.text}
              x="50%"
              y="50%"
              fontSize="220px"
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
              "transform 0.3s ease-in-out 0.6s, opacity 0.3s ease-in-out 0.6s",
          }}
        >
          бирдекелей
        </div>

        <div
          className={cn(styles.h1, styles.h1_bottom)}
          style={{
            transform: inView ? "none" : "translateY(-100px)",
            opacity: inView ? 1 : 0,
            transition:
              "transform 0.3s ease-in-out 0.8s, opacity 0.3s ease-in-out 0.8s",
          }}
        >
          и вся статистика на этой странице рассчитана из этого числа
        </div>
      </h1>
      <div
        className={styles.go}
        style={{
          transform: inView
            ? "none"
            : "translateY(-200px) scale(0) rotate(-1800deg)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s, opacity 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
        }}
      >
        <HashLink to="#types" smooth={isDesktop}>
          <img
            src={require("src/images/gagarin.png")}
            width="200"
            height="200"
            alt="Поехали!"
          />
        </HashLink>
      </div>
    </section>
  );
};
