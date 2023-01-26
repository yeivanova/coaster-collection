import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { DonutChart } from "../../components/donut-chart/donut-chart";

type TSectionTypesProps = {
  setActiveSection: (value: string) => void;
}

export const SectionTypes: FC<TSectionTypesProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;
  const [typeBeer, setTypeBeer] = useState<string>("0");
  const [typeBar, setTypeBar] = useState<string>("0");
  const [typeOthers, setTypeOthers] = useState<string>("0");

  useEffect(() => {
    if (inView) {
      setActiveSection("types");
    }
  }, [inView]);

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

  return (
    <section
      id="types"
      className={cn(styles.screen, styles.screen_2)}
      ref={ref}
    >
      <div
        className={styles.col_3}
        style={{
          transform: inView ? "none" : "scale(0)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        <DonutChart percent={+typeBeer} inView={inView}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                "transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.9s, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.9s",
            }}
          >
            Пиво
          </div>
        </DonutChart>
      </div>
      <div
        className={styles.col_3}
        style={{
          transform: inView ? "none" : "scale(0)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
        }}
      >
        <DonutChart percent={+typeBar} inView={inView}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                "transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.1s, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.1s",
            }}
          >
            Заведения
          </div>
        </DonutChart>
      </div>
      <div
        className={styles.col_3}
        style={{
          transform: inView ? "none" : "scale(0)",
          opacity: inView ? 1 : 0,
          transition:
            "transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
        }}
      >
        <DonutChart percent={+typeOthers} inView={inView}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                "transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.3s, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.3s",
            }}
          >
            Остальное
          </div>
        </DonutChart>
      </div>
    </section>
  );
};
