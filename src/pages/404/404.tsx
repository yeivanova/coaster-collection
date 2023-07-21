import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "src/components/header/header";
import { Modal } from "src/components/modal/modal";
import { AnimatePresence } from "framer-motion";
import styles from "./404.module.scss";

export const NotFoundPage: FC = () => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    const openModal = () => {
        setModalIsOpened(true);
    };

    const closeModal = () => {
        setModalIsOpened(false);
    };

    return (
        <>
            <Header openModal={openModal} />
            <main className={styles.main}>
                <p className={styles.text}>
                    <Link to={{ pathname: "/" }} className={styles.link}>
                        На главную
                    </Link>
                </p>
            </main>
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
