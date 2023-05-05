import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { useInView } from "react-intersection-observer";
import { GlassFill } from "src/components/statistics/glass-fill/glass-fill";

type TSectionKindsProps = {
  setActiveSection: (value: string) => void;
};

export const SectionKinds: FC<TSectionKindsProps> = ({ setActiveSection }) => {
  const { isDesktop } = useContext(DeviceContext);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;
  const itemsBeer = items.filter(item => item.type === "Пиво").length;
  const [ales, setAles] = useState<string>("0");
  const [lagers, setLagers] = useState<string>("0");

  useEffect(() => {
    if (inView) {
      setActiveSection("kinds");
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    setAles(
      Number(
        (items.filter((item) => item.beerType[0] === "Ale").length * 100) /
        itemsBeer
      ).toFixed(1)
    );
    setLagers(
      Number(
        (items.filter((item) => item.beerType[0] === "Lager").length * 100) /
        itemsBeer
      ).toFixed(1)
    );
  }, [items, itemsBeer]);

  return (
    <section
      id="kinds"
      className={cn(styles.screen, styles.screen_5)}
      ref={ref}
    >
      <div className={styles.col}>
        <h2 className={styles.h2} style={{
                  transform: inView ? "none" : "translateY(-100px)",
                  opacity: inView ? 1 : 0,
                  transition: "transform 0.3s ease-in-out 0.3s, opacity 0.3s ease-in-out 0.3s",
                }}>
          На этой странице статистика будет основываться только на пивных
          бирдекелях
        </h2>
        <h3 className={styles.h3} style={{
                  transform: inView ? "none" : "translateY(-50px)",
                  opacity: inView ? 1 : 0,
                  transition: "transform 0.3s ease-in-out 0.6s, opacity 0.3s ease-in-out 0.6s",
                }}>
          Выше вы уже узнали, что пивные бирдикели составляют {(itemsBeer *100 /quantity).toFixed(1)}% коллекции или {itemsBeer} штук. <br/>Эту цифру мы и возмем за абсолютную величину.
        </h3>
      </div>
      <div
        className={styles.col_2}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(-100%)",
          opacity: inView ? 1 : 0,
          width: "45%",
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.2s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.2s" : "0s"
          }`,
        }}
      >
        <GlassFill
          type="ale"
          percent={+ales}
          width={174}
          height={296}
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
            Ale
          </div>
        </GlassFill>
      </div>
      <div
        className={styles.col_2}
        style={{
          transform: inView
            ? "none"
            : isDesktop
            ? "scale(0)"
            : "translateX(100%)",
          opacity: inView ? 1 : 0,
          width: "45%",
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.4s" : "0s"
          }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
            isDesktop ? "0.4s" : "0s"
          }`,
        }}
      >
        <GlassFill
          type="lager"
          percent={+lagers}
          width={174}
          height={296}
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
            Lager
          </div>
        </GlassFill>
      </div>
    </section>
  );
};
