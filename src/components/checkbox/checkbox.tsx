import React, { FC } from "react";
import styles from "./checkbox.module.scss";
import cn from "classnames";
import { v4 as uuid } from "uuid";

type TCheckboxProps = {
  className?: string;
  label: string;
  checked: boolean;
  isDisabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: FC<TCheckboxProps> = ({
  className,
  checked,
  isDisabled,
  label,
  ...props
}) => {
  const fieldId = `field-${uuid()}`;
  return (
    <div className={cn(styles.checkbox, className)}>
      <label className={isDisabled ? styles.label_disabled : undefined} htmlFor={fieldId}>
        <input id={fieldId} type="checkbox" checked={checked} {...props} disabled={isDisabled}/>
        {label}
      </label>
    </div>
  );
};
