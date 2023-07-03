import React, { FC, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { Link } from "react-router-dom";
import { Preloader } from "src/components/preloader/preloader";
import { StatisticsHeader } from "src/components/statistics/statistics-header/statistics-header";
import { SectionIntro } from "./intro";
import { SectionTypes } from "./types";
import { SectionReverse } from "./reverses";
import { SectionShape } from "./shapes";
import { SectionCountries } from "./countries";
import { SectionKinds } from "./kinds";
import { motion, AnimatePresence } from "framer-motion";
import logo_white from "src/images/logo_white.svg";

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
      <div className={styles.scroll_wrapper}>
        <div className={styles.container}>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <Link to="/" className={styles.back_home}>
                <span className="sr-only">Вернуться на главную страницу</span>
                <img className={styles.logo} src={logo_white} alt="На главную" />
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
              <SectionShape setActiveSection={setActiveSection} />
              <SectionCountries setActiveSection={setActiveSection} />
              <SectionKinds setActiveSection={setActiveSection} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};
