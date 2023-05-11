import React, { FC, useContext, useEffect, useState, useMemo } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { useInView } from "react-intersection-observer";
import { ShapeFill } from "src/components/statistics/shape-fill/shape-fill";
import { VerticalBarChart } from "src/components/statistics/vertical-bar-chart/vertical-bar-chart";
import { TChartData } from "src/services/types";

type TSectionShapeProps = {
  setActiveSection: (value: string) => void;
};

export const SectionShape: FC<TSectionShapeProps> = ({ setActiveSection }) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const params = useSelector((state: RootState) => state.coasters.params);
  const quantity = items.length;
  const [circles, setCircles] = useState<string>("0");
  const [squares, setSquares] = useState<string>("0");
  const [others, setOthers] = useState<string>("0");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [shapeOthersData, setShapeOthersData] = useState<TChartData[]>([]);

  const uniqueTypeParams = (): TChartData[] => {
    const dataset = [] as TChartData[];
    const othersQuantity = items.filter(
      (item) => item.shape !== "Квадрат" && item.shape !== "Круг"
    ).length;

    params.shape.forEach((param) => {
      if (param !== "Квадрат" && param !== "Круг") {
        const value = Number(
          (items.filter((item) => item.shape === param).length * 100) /
            othersQuantity
        ).toFixed(1);

        dataset.push({
          label: param,
          value: +value,
        });
      }
    });

    dataset.sort((a, b) => (a < b) ? 1 : -1);
    return dataset;
  };

  const uniqueParams = useMemo(() => uniqueTypeParams(), []);

  useEffect(() => {
    if (inView) {
      setActiveSection("shapes");
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
      setShapeOthersData(uniqueParams);
    }
  }, [items, quantity]);

  return (
    <section
      id="shapes"
      className={cn(styles.screen, styles.screen_3)}
      ref={ref}
    >
      <div
        className={styles.col}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          width: isDesktop ? "33%" : "45%",
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.2s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.2s" : "0s"
          }, width 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)`,
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
        className={styles.col}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(100%)",
          opacity: inView ? 1 : 0,
          width: isDesktop ? "33%" : "45%",
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.4s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.4s" : "0s"
          }, width 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)`,
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
        className={styles.col}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          width: isDesktop ? (showDetails ? "50%" : "33%") : (showDetails ? "80%" : "45%"),
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.6s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.6s" : "0s"
          }, width 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)`,
        }}
      >
        <div
          className={styles.chart_wrapper}
          onClick={() => setShowDetails(true)}
        >
          {showDetails ? (
            <VerticalBarChart
              data={shapeOthersData}
              percent={+others}
              width={520}
              height={488}
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
                Остальные формы
              </div>
            </VerticalBarChart>
          ) : (
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
                Остальные формы
              </div>
            </ShapeFill>
          )}
        </div>
      </div>
    </section>
  );
};
