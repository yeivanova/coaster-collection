import { FC, useState, useEffect } from "react";
import styles from "./upButton.module.scss";
import cn from "classnames";

export const UpButton: FC = () => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", isUpButtonVisible);
    return () => window.removeEventListener("scroll", isUpButtonVisible);
  }, []);

  const isUpButtonVisible = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 400 ? setShowTopBtn(true) : setShowTopBtn(false);
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        styles.up_button,
        showTopBtn && styles.is_visible
      )}
      onClick={goToTop}
    >
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path
          d="M12.3851 6.38507L7.04509 1.04507L1.70509 6.38507"
          stroke="#969696"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
