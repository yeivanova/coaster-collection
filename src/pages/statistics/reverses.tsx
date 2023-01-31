import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { DonutChart } from "../../components/donut-chart/donut-chart";

type TSectionReverseProps = {
  setActiveSection: (value: string) => void;
}

export const SectionReverse: FC<TSectionReverseProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;
  const [withReverse, setWithReverse] = useState<string>("0");
  const [withoutReverse, setWithoutReverse] = useState<string>("0");

  useEffect(() => {
    if (inView) {
      setActiveSection("reverse");
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    if (items.length > 0) {
      setWithReverse(
        Number(
          (items.filter((item) => item.reverse === "Да").length * 100) / quantity
        ).toFixed(1)
      );
      setWithoutReverse(
        Number(
          (items.filter((item) => item.reverse === "Нет").length * 100) /
            quantity
        ).toFixed(1)
      );
    }
  }, [items, quantity]);

  return (
    <section
      id="reverse"
      className={cn(styles.screen, styles.screen_3)}
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
        <DonutChart percent={+withReverse} inView={inView}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                "transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.9s, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.9s",
            }}
          >
            С оборотом
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
        <DonutChart percent={+withoutReverse} inView={inView}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                "transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.1s, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.1s",
            }}
          >
            Без оборота
          </div>
        </DonutChart>
      </div>
    </section>
  );
};
