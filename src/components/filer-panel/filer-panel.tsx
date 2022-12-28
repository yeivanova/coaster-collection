import React, { FC, ReactNode, useState } from "react";
import styles from "./filer-panel.module.scss";
import cn from "classnames";
import { motion } from "framer-motion";

type TPanelProps = {
  children: ReactNode;
  title?: string;
  isMultiple?: boolean;
};

const collapse = {
  hidden: {
    maxHeight: 0,
    marginBottom: 0,
    transition: {
      duration: 0.15,
    },
  },
  visible: {
    maxHeight: 125,
    marginBottom: 10,
    transition: {
      duration: 0.15,
    },
  },
  exit: {
    maxHeight: 0,
    marginBottom: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export const Panel: FC<TPanelProps> = ({ children, title, isMultiple = true }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("isOpen", isOpen);

  return (
    <div className={cn(styles.panel, isMultiple ? styles.is_multiple : styles.is_single)}>
      {title && (
        <button
          className={cn(
            styles.button,
            isOpen ? styles.button_opened : undefined
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className={styles.h3}>{title}</h3>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path
              d="M1.70507 1.04504L7.04507 6.38504L12.3851 1.04504"
              stroke="#969696"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {isMultiple ? (
      <motion.div
        className={cn(styles.panel_inner, styles.multiple)}
        variants={collapse}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
      >
        {children}
      </motion.div>
      ) : (
        <div className={cn(styles.panel_inner, styles.single)}>{children}</div>
      )}
    </div>
  );
};
