import React, { FC, useEffect, useState } from "react";
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
  const [activeLink, setActiveLink] = useState<Element>();

  useEffect(() => {
    const listItems = document.querySelectorAll("#statistics_menu li a");

    Array.from(listItems).forEach((el) => {
      const href = (el as HTMLLinkElement).href;
      const link = href.substring(href.lastIndexOf("#") + 1) as string;
      if (link === activeSection) {
        setActiveLink(el);
      }
    });

    if (activeLink) {
      const element = activeLink as HTMLLIElement;
      const elOffset = element.offsetLeft;
      const elWidth = element.offsetWidth;
      const menu = document.getElementById(
        "statistics_menu"
      ) as HTMLUListElement;
      const menuScrollLeft = menu.scrollLeft;
      const menuWidth = menu.offsetWidth;

      const myScrollPos =
        elOffset + elWidth / 2 + menuScrollLeft - menuWidth / 2;
      menu.style.scrollBehavior = "smooth";
      menu.scrollLeft = myScrollPos;
    }
  }, [activeSection]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul id="statistics_menu" className={styles.navigation_list}>
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
    </header>
  );
};
