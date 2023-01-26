import React, { FC, useEffect, useState, useContext, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";
import cn from "classnames";
import { DeviceContext } from "../../services/app-context";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../modal/modal";

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
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", isHeaderSticky);
    return () => {
      window.removeEventListener("scroll", isHeaderSticky);
    };
  }, []);

  const openModal = () => {
    setModalIsOpened(true);
  };

  const closeModal = () => {
    setModalIsOpened(false);
  };

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
                {isDesktop && "Фильтр"}
              </button>
            )}
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
                  <button className={styles.link} onClick={openModal}>
                    О проекте
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modalIsOpened && <Modal closeModal={closeModal} />}
      </AnimatePresence>
    </>
  );
};
