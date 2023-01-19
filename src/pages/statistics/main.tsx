import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Link } from "react-router-dom";
import { Preloader } from "../../components/preloader/preloader";
import { SectionIntro } from "./intro";
import { SectionTypes } from "./types";

export const StatisticsPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;
  useEffect(() => {
    if (items.length > 0) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <main className={styles.main}>
      {isLoading ? (
      <Preloader />
      ) : (
        <>
         <Link to="/" className={styles.back_home}>
          На главную
        </Link>
        <SectionIntro quantity={quantity} />
        <SectionTypes />
        </>
      )}
    </main>
  );
};
