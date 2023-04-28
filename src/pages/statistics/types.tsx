import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { useInView } from "react-intersection-observer";
import { DonutChart } from "src/components/statistics/donut-chart/donut-chart";
import { SegmentChart } from "src/components/statistics/segment-chart/segment-chart";
import { TChartData } from "src/services/types";

type TSectionTypesProps = {
  setActiveSection: (value: string) => void;
};

export const SectionTypes: FC<TSectionTypesProps> = ({ setActiveSection }) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const params = useSelector((state: RootState) => state.coasters.params);
  const quantity = items.length;
  const [typeBeer, setTypeBeer] = useState<string>("0");
  const [typeBar, setTypeBar] = useState<string>("0");
  const [typeOthers, setTypeOthers] = useState<string>("0");
  const [typeOthersData, setTypeOthersData] = useState<TChartData[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const uniqueTypeParams = (): TChartData[] => {
    const dataset = [] as TChartData[];
    const othersQuantity = items.filter(
      (item) => item.type !== "Пиво" && item.type !== "Заведение"
    ).length;

    params.type.forEach((param) => {
      if (param !== "Пиво" && param !== "Заведение") {
        const value = Number(
          (items.filter((item) => item.type === param).length * 100) /
          othersQuantity
        ).toFixed(1);

      dataset.push({
        label: param,
        value: +value
      });
      }
    });
    return dataset;
  }

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
      setTypeOthersData(uniqueTypeParams());
    }
  }, [items, quantity]);

  return (
    <section
      id="types"
      className={cn(styles.screen, styles.screen_2)}
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
        <SegmentChart
          percent={+typeBeer}
          inView={inView}
          radius={238}
          strokeWidth={40}
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
            Пиво
          </div>
        </SegmentChart>
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
        <SegmentChart
          percent={+typeBar}
          inView={inView}
          radius={238}
          strokeWidth={40}
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
            Заведения
          </div>
        </SegmentChart>
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
          className={cn(styles.chart_wrapper, {
            [styles.chart_wrapper_large]: showDetails
          })}
          onClick={() => setShowDetails(true)}
        >
          {showDetails ? (
            <DonutChart
            percent={+typeOthers}
            data={typeOthersData}
            inView={inView}
            radius={238}
            strokeWidth={40}
          >
            <div
              className={cn(styles.label, {
                [styles.label_large]: showDetails
              })}
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
              Остальное
            </div>
          </DonutChart>
          ) : (
            <SegmentChart
              percent={+typeOthers}
              inView={inView}
              radius={238}
              strokeWidth={40}
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
                Остальное
              </div>
            </SegmentChart>
          )}
        </div>
      </div>
    </section>
  );
};
