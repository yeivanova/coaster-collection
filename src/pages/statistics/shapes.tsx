import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useInView } from "react-intersection-observer";
import { ShapeFill } from "../../components/shape-fill/shape-fill";

type TSectionShapeProps = {
  setActiveSection: (value: string) => void;
};

export const SectionShape: FC<TSectionShapeProps> = ({ setActiveSection }) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
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
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.2s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.2s" : "0s"
          }`,
        }}
      >
        <ShapeFill
          shape="square"
          percent={+squares}
          width={359}
          height={359}
          inView={inView}
        >
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isDesktop ? "0.9s" : "0s"
              }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isDesktop ? "0.9s" : "0s"
              }`,
            }}
          >
            Квадрат
          </div>
        </ShapeFill>
      </div>
      <div
        className={styles.col_3}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(100%)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.4s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.4s" : "0s"
          }`,
        }}
      >
        <ShapeFill
          shape="circle"
          percent={+circles}
          width={370}
          height={370}
          inView={inView}
        >
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isDesktop ? "1.1s" : "0s"
              }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isDesktop ? "1.1s" : "0s"
              }`,
            }}
          >
            Круг
          </div>
        </ShapeFill>
      </div>
      <div
        className={styles.col_3}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.6s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.6s" : "0s"
          }`,
        }}
      >
        <ShapeFill
          shape="other"
          percent={+others}
          width={400}
          height={383}
          inView={inView}
        >
          <div
            className={styles.label}
            style={{
              transform: inView ? "none" : "translateY(-100px)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isDesktop ? "1.3s" : "0s"
              }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isDesktop ? "1.3s" : "0s"
              }`,
            }}
          >
            Другое
          </div>
        </ShapeFill>
      </div>
    </section>
  );
};
