import React, { FC, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "src/images/logo.svg";
import styles from "./header.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { Navbar } from "../navbar/navbar";

type THeaderProps = {
  toggleSidebar?: () => void;
  sidebarIsOpened?: boolean;
  withFilter?: boolean;
};

export const Header: FC<THeaderProps> = ({
  toggleSidebar,
  sidebarIsOpened,
  withFilter = false,
}) => {
  const { isDesktop } = useContext(DeviceContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isHeaderSticky);
    return () => {
      window.removeEventListener("scroll", isHeaderSticky);
    };
  }, []);

  const isHeaderSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 100 ? setIsSticky(true) : setIsSticky(false);
  };

  const toggleMenu = () => {
    setIsOpened((current) => !current);
    toggleSidebar && toggleSidebar();
    document.body.classList.toggle("no-scroll");
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          isOpened && styles.is_opened,
          isSticky && styles.is_sticky
        )}
      >
        <div className={styles.logo_wrapper}>
          <Link to="/">
            <span className="sr-only">MynyaCat Brewery, основана в 2018</span>
            <img className={styles.logo} src={logo} alt="На главную" />
          </Link>
        </div>
        <div className={styles.header_inner}>
          <div className={styles.button_wrapper}>
            {withFilter && (
              <button
                className={cn(
                  styles.filter_button,
                  sidebarIsOpened && styles.menu_open
                )}
                onClick={toggleMenu}
              >
                <span className={styles.icon}>
                  <span className={cn(styles.line, styles.line1)}></span>
                  <span className={cn(styles.line, styles.line2)}></span>
                  <span className={cn(styles.line, styles.line3)}></span>
                </span>
                <span className="sr-only">{sidebarIsOpened ? "Закрыть фильтр" : "Открыть фильтр"}</span>
                <span aria-hidden="true">
                  {isDesktop && "Фильтр"}
                </span>
              </button>
            )}
          </div>
          {isDesktop && <Navbar />}
        </div>
      </header>
    </>
  );
};
