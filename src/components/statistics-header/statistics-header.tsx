import React, { FC, useContext } from "react";
import styles from "./statistics-header.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
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
                  to="#reverse"
                  className={
                    activeSection === "reverse"
                      ? cn(styles.nav_link, styles.active)
                      : styles.nav_link
                  }
                  smooth
                >
                  Оборот
                </HashLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
