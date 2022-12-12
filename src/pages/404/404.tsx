import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./404.module.scss";

export const NotFoundPage: FC = () => {
	return (
		<div>
			<h1 className={styles.h1}>Страница не найдена</h1>
			<p className={styles.text}>
            <Link to={{ pathname: "/" }} className={styles.link}>
              На главную
            </Link>
          </p>
		</div>
	);
};