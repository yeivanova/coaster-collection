import { FC } from "react";
import { Link } from "react-router-dom";
import { Header } from "src/components/header/header";
import styles from "./404.module.scss";

export const NotFoundPage: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <p className={styles.text}>
          <Link to={{ pathname: "/" }} className={styles.link}>
            На главную
          </Link>
        </p>
      </main>
    </>
  );
};
