import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Link } from "react-router-dom";
import { Preloader } from "../../components/preloader/preloader";
import { StatisticsHeader } from "../../components/statistics-header/statistics-header";
import { SectionIntro } from "./intro";
import { SectionTypes } from "./types";
import { SectionReverse } from "./reverse";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const StatisticsPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headerIsVisible, setHeaderIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const items = useSelector((state: RootState) => state.coasters.items);
  const quantity = items.length;

  useEffect(() => {
    if (activeSection !== "intro") {
      setHeaderIsVisible(true);
    } else {
      setHeaderIsVisible(false);
    }
  }, [activeSection]);

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
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
          >
            {headerIsVisible && (
              <motion.div
                className={styles.header}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <StatisticsHeader activeSection={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
          <SectionIntro
            quantity={quantity}
            setActiveSection={setActiveSection}
          />
          <SectionTypes setActiveSection={setActiveSection} />
          <SectionReverse setActiveSection={setActiveSection} />
        </>
      )}
    </main>
  );
};
