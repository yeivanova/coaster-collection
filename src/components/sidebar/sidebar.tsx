import React, { FC, useState, useEffect } from "react";
import styles from "./sidebar.module.scss";
import { Overlay } from "../overlay/overlay";
import { motion } from "framer-motion";

type TSidebarProps = {
  closeSidebar: () => void;
};

export const Sidebar: FC<TSidebarProps> = ({ closeSidebar }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsDesktop(window.innerWidth >= 768)
    );
  }, []);
  const slideIn = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.15,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
  };

  return (
    <Overlay onClick={closeSidebar} transparent={true}>
      <motion.div
        className={styles.sidebar}
        variants={slideIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {!isDesktop && (<h2 className={styles.h2}>Фильтр</h2>)}
      </motion.div>
    </Overlay>
  );
};
