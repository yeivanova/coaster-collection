import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { ShapeFill } from "../../components/shape-fill/shape-fill";

type TSectionShapeProps = {
  setActiveSection: (value: string) => void;
};

export const SectionShape: FC<TSectionShapeProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;
  const [circles, setCircles] = useState<string>("0");
  const [squares, setSquares] = useState<string>("0");
  const [others, setOthers] = useState<string>("0");

  useEffect(() => {
    if (inView) {
      setActiveSection("shape");
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    if (items.length > 0) {
      setCircles(
        Number(
          (items.filter((item) => item.shape === "Круг").length * 100) /
            quantity
        ).toFixed(1)
      );
      setSquares(
        Number(
          (items.filter((item) => item.shape === "Квадрат").length * 100) /
            quantity
        ).toFixed(1)
      );
      setOthers(
        Number(
          (items.filter(
            (item) => item.shape !== "Круг" && item.shape !== "Квадрат"
          ).length *
            100) /
            quantity
        ).toFixed(1)
      );
    }
  }, [items, quantity]);

  return (
    <section
      id="shape"
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
        <ShapeFill shape="square" percent={+squares} width={359} height={359} inView={inView}>
          Квадрат
        </ShapeFill>
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
        <ShapeFill shape="circle" percent={+circles} width={370} height={370}  inView={inView}>
          Круг
        </ShapeFill>
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
        <ShapeFill shape="other" percent={+others} width={400} height={383}  inView={inView}>
          Другое
        </ShapeFill>
      </div>
    </section>
  );
};
