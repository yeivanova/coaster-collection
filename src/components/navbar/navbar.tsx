import React, { FC, useState } from 'react';
import styles from './navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { AnimatePresence } from 'framer-motion';

export const Navbar: FC = () => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    const openModal = () => {
        setModalIsOpened(true);
    };

    const closeModal = () => {
        setModalIsOpened(false);
    };

    return (
        <>
            <nav>
                <ul className={styles.navigation_list}>
                    <li>
                        <NavLink onClick={() => document.body.classList.remove("no-scroll")}
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
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {modalIsOpened && <Modal closeModal={closeModal} />}
            </AnimatePresence>
        </>
    );
};
