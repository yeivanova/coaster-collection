import React, { FC } from "react";
import styles from "./preloader.module.scss";
import preloader from "../../images/loader.svg";

export const Preloader: FC = () => {
  return (
    <div className={styles.preloader}>
      <img
        className={styles.preloader_image}
        src={preloader}
        alt="Загрузка..."
      />
    </div>
  );
};