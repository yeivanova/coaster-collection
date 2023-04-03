import React, { FC, useContext } from "react";
import styles from "./statistics-header.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../../services/app-context";
import { HashLink } from "react-router-hash-link";

type TStatisticsHeaderProps = {
  activeSection: string;
};

export const StatisticsHeader: FC<TStatisticsHeaderProps> = ({
  activeSection,
}) => {
  const { isDesktop } = useContext(DeviceContext);

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        {isDesktop && (
          <nav className={styles.navbar}>
            <ul className={styles.navigation_list}>
              <li>
                <HashLink
                  to="#types"
                  className={
                    activeSection === "types"
                      ? cn(styles.nav_link, styles.active)
                      : styles.nav_link
                  }
                  smooth
                >
                  Тип
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="#reverses"
                  className={
                    activeSection === "reverses"
                      ? cn(styles.nav_link, styles.active)
                      : styles.nav_link
                  }
                  smooth
                >
                  Оборот
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="#shapes"
                  className={
                    activeSection === "shapes"
                      ? cn(styles.nav_link, styles.active)
                      : styles.nav_link
                  }
                  smooth
                >
                  Форма
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="#countries"
                  className={
                    activeSection === "countries"
                      ? cn(styles.nav_link, styles.active)
                      : styles.nav_link
                  }
                  smooth
                >
                  Страна
                </HashLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
