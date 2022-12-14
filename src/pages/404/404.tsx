import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./404.module.scss";

export const NotFoundPage: FC = () => {
  return (
    <main className={styles.main}>
      <p className={styles.text}>
        <Link to={{ pathname: "/" }} className={styles.link}>
          На главную
        </Link>
      </p>
    </main>
  );
};
