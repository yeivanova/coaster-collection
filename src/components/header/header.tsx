import React, { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";
import cn from "classnames";


type THeaderProps = {
  toggleSidebar: () => void;
  openModal: () => void;
  sidebarIsOpened: boolean
};

export const Header: FC<THeaderProps> = ({toggleSidebar, openModal, sidebarIsOpened}) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsDesktop(window.innerWidth >= 768)
    );
    window.addEventListener("scroll", isHeaderSticky);
    return () => {
      window.removeEventListener("scroll", isHeaderSticky);
    };
  }, []);

  const isHeaderSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 100 ? setIsSticky(true) : setIsSticky(false);
  };

  const openMenu = () => {
    setIsOpened((current) => !current);
    toggleSidebar();
  };

  return (
    <header className={cn(styles.header, isOpened && styles.is_opened, isSticky && styles.is_sticky)}>
      <div className={styles.logo_wrapper}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="На главную" />
        </Link>
      </div>
      <div className={styles.header_inner}>
        <div className={styles.button_wrapper}>
          <button
            className={cn(styles.filter_button, sidebarIsOpened && styles.menu_open)}
            onClick={openMenu}
          >
            <span className={styles.icon}>
              <span className={cn(styles.line, styles.line1)}></span>
              <span className={cn(styles.line, styles.line2)}></span>
              <span className={cn(styles.line, styles.line3)}></span>
            </span>
            {isDesktop && "Фильтр"}
          </button>
        </div>
        {isDesktop && (
          <nav className={styles.navbar}>
            <ul className={styles.navigation_list}>
              <li>
                <NavLink
                  to="/statistics"
                  className={({ isActive, isPending }) => {
                    return isActive
                      ? styles.active
                      : isPending
                      ? styles.pending
                      : styles.link;
                  }}
                >
                  Статистика
                </NavLink>
              </li>
              <li>
                <button className={styles.link} onClick={openModal}>О проекте</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
