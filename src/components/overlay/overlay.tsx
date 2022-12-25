import React, { FC, useCallback, useEffect, ReactNode } from "react";
import styles from "./overlay.module.scss";
import { motion } from "framer-motion";
import cn from "classnames";

type TModalProps = {
  children: ReactNode;
  onClick: () => void;
  transparent: boolean;
};

export const Overlay: FC<TModalProps> = ({
  children,
  onClick,
  transparent = 0,
}) => {
  const closeModal = useCallback(() => {
    onClick();
    document.body.classList.remove("no-scroll");
  }, [onClick]);

  const handleClose = () => {
    onClick();
    document.body.classList.remove("no-scroll");
  }

  useEffect(() => {
    document.body.classList.add("no-scroll");
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [closeModal]);

  return (
    <motion.div
      id="overlay"
      className={cn(styles.overlay, transparent && styles.transparent)}
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
