import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { SegmentChart } from "../../components/segment-chart/segment-chart";

type TSectionTypesProps = {
  setActiveSection: (value: string) => void;
}

export const SectionTypes: FC<TSectionTypesProps> = ({ setActiveSection }) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
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
        ).toFixed(1)
      );
      setTypeBar(
        Number(
          (items.filter((item) => item.type === "Заведение").length * 100) /
            quantity
        ).toFixed(1)
      );
      setTypeOthers(
        Number(
          (items.filter(
            (item) => item.type !== "Пиво" && item.type !== "Заведение"
          ).length *
            100) /
            quantity
        ).toFixed(1)
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
          transform: inView ? "none" : isDesktop ? "scale(0)" : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          transition:
          `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.2s" : "0s"}, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.2s" : "0s"}`,
        }}
      >
        <SegmentChart percent={+typeBeer} inView={inView} radius={238} strokeWidth={40}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.9s" : "0s"}, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.9s" : "0s"}`,
            }}
          >
            Пиво
          </div>
        </SegmentChart>
      </div>
      <div
        className={styles.col_3}
        style={{
          transform: inView ? "none" : isDesktop ? "scale(0)" : "translateX(100%)",
          opacity: inView ? 1 : 0,
          transition:
            `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.4s" : "0s"}, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.4s" : "0s"}`,
        }}
      >
        <SegmentChart percent={+typeBar} inView={inView} radius={238} strokeWidth={40}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "1.1s" : "0s"}, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "1.1s" : "0s"}`,
            }}
          >
            Заведения
          </div>
        </SegmentChart>
      </div>
      <div
        className={styles.col_3}
        style={{
          transform: inView ? "none" : isDesktop ? "scale(0)" : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          transition:
            `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.6s" : "0s"}, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "0.6s" : "0s"}`,
        }}
      >
        <SegmentChart percent={+typeOthers} inView={inView} radius={238} strokeWidth={40}>
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition:
                `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "1.3s" : "0s"}, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${isDesktop ? "1.3s" : "0s"}`,
            }}
          >
            Остальное
          </div>
        </SegmentChart>
      </div>
    </section>
  );
};
