import { FC, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import close from "src/images/close.svg";
import { Overlay } from "../overlay/overlay";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { declension } from "src/utils/utils";

const modalRoot = document.getElementById("react-modals") as
  | Element
  | DocumentFragment;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.15,
      type: "spring",
      damping: 35,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

type TModalProps = {
  closeModal: () => void;
};

export const Modal: FC<TModalProps> = ({ closeModal }) => {
  const quantity = useSelector((state: RootState) => state.coasters.items).length;
  const closeMe = useCallback(() => {
    closeModal();
    document.body.classList.remove("no-scroll");
  }, [closeModal]);

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

  return ReactDOM.createPortal(
    <Overlay onClick={closeModal} transparent={false}>
      <motion.div
        className={styles.modal_window}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modal_close} onClick={closeMe} aria-label="Закрыть">
          <img className={styles.logo} src={close} alt="Закрыть"  aria-hidden="true" />
        </button>
        <div className={styles.modal_content}>
          <p>Привет!</p>
          <p>
            Меня зовут Дима. Я собираю бирдекели с момента, как начал ходить по
            барам, то есть практически с рождения :)
          </p>
          <p>
            Сейчас моя коллекция насчитывает {declension(quantity, ["бирдекель", "бирдекеля", "бирдекелей"])}. И это не предел!
          </p>
          <p>
            Я безмерно признателем всем друзьям, которые со всех краев нашей
            необъятной планеты присылают мне “печенки”.
          </p>
          <p>
            Если у тебя есть желание поделиться со мной своими бирдкелями, то
            напиши на почту{" "}
            <a href="mailto:5883477@gmail.com">5883477@gmail.com</a> и мы
            договоримся!
          </p>
          <p>
            На сайте работает прекрасный фильтр на случай, если ты устанешь
            скролить до экзотических бирдекелей (а они есть).
          </p>
          <p>
            Еще обязательно загляни в раздел статистики, чтобы поразиться
            количеству бирдекелей, которые пылятся (с любовью хранятся) в шкафу
            в картонной коробке.
          </p>
          <p>Ах, да! Еще я варю пиво. Вот!</p>
        </div>
      </motion.div>
      <div id="overlay" className={`${styles.overlay}`} onClick={closeMe} />
    </Overlay>,
    modalRoot
  );
};
