import React, { FC, ReactNode } from "react";
import styles from "./filer-panel.module.scss";
import cn from "classnames";

type TPanelProps = {
  children: ReactNode,
  title?: string;
  className?: string;
};

export const Panel: FC<TPanelProps> = ({
  children,
  title,
  className
}) => {
  return (
    <div className={cn(styles.panel, className)}>
      {title && (
        <h3 className={styles.h3}>{title}</h3>
      )}
      <div className={styles.panel_inner}>
        {children}
      </div>
    </div>
  );
};
