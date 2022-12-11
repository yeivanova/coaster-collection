import React, { useState, useContext, FC } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import cn from "classnames";

export const Header: FC = () => {
	const [isNavExpanded, setIsNavExpanded] = useState(false);
	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<ul className={styles.navigation_list}>
					<li className={styles.navbar_item}>
						Home
					</li>
				</ul>
			</nav>
		</header>
	)
}