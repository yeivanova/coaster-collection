import React, { FC } from "react";
import styles from "./checkbox.module.scss";
import cn from "classnames";

type TCheckboxProps = {
  className?: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: FC<TCheckboxProps> = ({
  className,
  checked,
  label,
  ...props
}) => {
  return (
    <div className={cn(styles.checkbox, className)}>
      <label>
        <input type="checkbox" checked={checked} {...props} />
        {label}
      </label>
    </div>
  );
};
