import { FC } from "react";
import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";

type TNavbarProps = {
    openModal: () => void;
};

export const Navbar: FC<TNavbarProps> = ({ openModal }) => {
    return (
        <nav>
            <ul className={styles.navigation_list}>
                <li>
                    <NavLink
                        onClick={() =>
                            document.body.classList.remove("no-scroll")
                        }
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
    );
};
