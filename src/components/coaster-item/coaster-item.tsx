import { FC, useEffect, useState, useRef, useContext, RefObject } from "react";
import styles from "./coaster-item.module.scss";
import cn from "classnames";
import { APIUrl } from "src/utils/api";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { DeviceContext } from "src/services/app-context";

type TItemProps = {
  id: number;
  type: string;
  brand: string;
  kind?: string;
  country?: string;
  reverse: boolean;
  shape: string;
};

interface ValidRefTarget {
  contains(target: EventTarget | null): any;
}

const slideUp = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
  },
};

const frontVariants: Variants = {
  flip: {
    rotateY: 180,
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
      opacity: {
        delay: 0.25,
        duration: 0.5,
      },
      rotateY: {
        duration: 1,
      },
    },
  },
  hidden: {
    rotateY: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
      opacity: {
        delay: 0.25,
        duration: 0.5,
      },
      rotateY: {
        duration: 1,
      },
    },
  },
};

const backVariants: Variants = {
  flip: {
    rotateY: 0,
    translateX: "-50%",
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
      opacity: {
        delay: 0.25,
        duration: 0.5,
      },
      rotateY: {
        duration: 1,
      },
    },
  },
  hidden: {
    rotateY: 180,
    translateX: "-50%",
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
      opacity: {
        delay: 0.25,
        duration: 0.5,
      },
      rotateY: {
        duration: 1,
      },
    },
  },
};

function useOutsideAlerter(
  ref: RefObject<ValidRefTarget>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export const Item: FC<TItemProps> = ({
  id,
  type,
  brand,
  kind,
  country,
  reverse,
  shape,
}) => {
  const [infoIsOpened, setInfoIsOpened] = useState(false);
  const [isFlip, setIsFlip] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useContext(DeviceContext);

  const openInfo = () => {
    setInfoIsOpened(true);
  };

  const closeInfo = () => {
    setInfoIsOpened(false);
  };

  const turnSide = () => {
    setIsFlip(!isFlip);
  };

  useOutsideAlerter(wrapperRef, closeInfo);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeInfo();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <li className={styles.item}>
      <motion.div className={styles.image_container} onClick={(!isDesktop && reverse) ? turnSide : (e) => e.preventDefault}>
        <motion.img
          className={cn(styles.image, styles.front_image)}
          src={`${APIUrl}/${id}/image/`}
          variants={frontVariants}
          initial="hidden"
          animate={isFlip ? "flip" : "hidden"}
          width="320"
          height="320"
          alt=""
        />
        {reverse && (
          <motion.img
            className={cn(styles.image, styles.back_image)}
            src={`${APIUrl}/${id}/image/?reverse=true`}
            variants={backVariants}
            initial="hidden"
            animate={isFlip ? "flip" : "hidden"}
            width="320"
            height="320"
            alt=""
          />
        )}
      </motion.div>
      <div className={styles.details}>
        <button className={styles.more} onClick={openInfo}>
          <svg width="25" height="5" viewBox="0 0 25 5" fill="white">
            <circle cx="2.5" cy="2.5" r="2.5" />
            <circle cx="12.5" cy="2.5" r="2.5" />
            <circle cx="22.5" cy="2.5" r="2.5" />
          </svg>
        </button>
        {reverse && (
          <button className={styles.turn} onClick={turnSide}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="white">
              <path d="M0.560812 17.9097C0.415706 18.0294 0.172668 18.2301 0.253109 18.6199C0.435033 19.3664 5.9053 22.7289 11.9276 24.0212C12.4609 24.0651 13.0317 23.7702 13.3454 23.306C13.59 22.4842 13.7406 21.631 13.8284 20.6775C14.2676 20.5395 14.6879 20.3827 15.1082 20.2258C19.3991 18.5697 21.9586 16.211 22.5231 13.8271C22.956 11.5876 23.0376 10.8912 22.9497 8.51995C22.7553 6.71953 22.7302 6.53133 22.4165 5.25159C22.291 4.82501 22.1279 4.27297 21.9774 3.82129C22.9811 6.92027 20.3275 10.3517 14.6189 12.5474C14.1923 12.7105 13.7657 12.861 13.3328 13.0053C13.107 11.7758 12.8184 10.5462 12.4734 9.32293C12.3918 9.14101 12.1346 8.57014 11.4069 8.73325C11.3508 8.75431 11.3051 8.77144 11.2617 8.79316C11.0724 8.88785 10.9268 9.06968 10.146 10.0444C9.21758 11.2112 6.41971 14.2976 0.566767 17.9047L0.560812 17.9097Z" />
              <path d="M19.661 8.51995C20.9324 7.13755 21.8156 5.45085 21.3438 3.56408C20.9423 2.48509 20.1017 1.45627 18.7843 0.52783C18.5898 0.408636 18.2824 0.2769 18.3891 0.847762C18.6275 1.72602 18.7843 2.67328 18.8533 3.67073C18.9286 4.77482 18.8972 5.89773 18.7655 7.02064C18.7467 7.55387 18.8972 7.94281 19.2485 8.24393C19.4932 8.4133 19.4477 8.34429 19.661 8.51995Z" />
            </svg>
          </button>
        )}
      </div>
      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {infoIsOpened && (
          <motion.div
            ref={wrapperRef}
            className={cn(styles.info, "info")}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul>
              <li>Тип: {type}</li>
              <li>Марка: {brand}</li>
              <li>Вид: {kind}</li>
              <li>Страна: {country}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
