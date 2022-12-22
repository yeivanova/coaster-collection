import React, { FC, useState, useContext } from "react";
import styles from "./sidebar.module.scss";
import { Overlay } from "../overlay/overlay";
import { Checkbox } from "../checkbox/checkbox";
import { Panel } from "../filer-panel/filer-panel";
import { motion } from "framer-motion";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

type TSidebarProps = {
  closeSidebar: () => void;
};

export const Sidebar: FC<TSidebarProps> = ({ closeSidebar }) => {
  const params = useSelector((state: RootState) => state.coasters.params);
  console.log(params);
  const [reverse, setReverse] = useState(false);
  const [types, setTypes] = useState<boolean[]>(
    new Array(params.type.length).fill(false)
  );
  const [brands, setBrands] = useState<boolean[]>(
    new Array(params.brand.length).fill(false)
  );
  const [kinds, setKinds] = useState<boolean[]>(
    new Array(params.kind.length).fill(false)
  );
  const [countries, setCountries] = useState<boolean[]>(
    new Array(params.country.length).fill(false)
  );
  const [shapes, setShapes] = useState<boolean[]>(
    new Array(params.shape.length).fill(false)
  );
  const { isDesktop } = useContext(DeviceContext);

  const handleOnChange = (
    position: number,
    arr: boolean[],
    setFunction: (value: boolean[]) => void
  ) => {
    const updatedCheckedState = arr.map((item, index) =>
      index === position ? !item : item
    );
    setFunction(updatedCheckedState);
  };

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
        {!isDesktop && <h2 className={styles.h2}>Фильтр</h2>}
        <Panel className={styles.single}>
          <Checkbox
            label={"Оборот"}
            checked={reverse}
            onChange={() => setReverse(!reverse)}
          />
        </Panel>
        <Panel title="Тип" className={styles.multiple}>
          {types.map((value, index) => {
            return (
              <Checkbox
                key={index}
                label={params.type[index]}
                checked={value}
                onChange={() => handleOnChange(index, types, setTypes)}
              />
            );
          })}
        </Panel>
        <Panel title="Марка" className={styles.multiple}>
          {brands.map((value, index) => {
            return (
              <Checkbox
                key={index}
                label={params.brand[index]}
                checked={value}
                onChange={() => handleOnChange(index, brands, setBrands)}
              />
            );
          })}
        </Panel>
        <Panel title="Вид" className={styles.multiple}>
          {kinds.map((value, index) => {
            return (
              <Checkbox
                key={index}
                label={params.kind[index]}
                checked={value}
                onChange={() => handleOnChange(index, kinds, setKinds)}
              />
            );
          })}
        </Panel>
        <Panel title="Страна" className={styles.multiple}>
          {countries.map((value, index) => {
            return (
              <Checkbox
                key={index}
                label={params.country[index]}
                checked={value}
                onChange={() => handleOnChange(index, countries, setCountries)}
              />
            );
          })}
        </Panel>
        <Panel title="Форма" className={styles.multiple}>
          {shapes.map((value, index) => {
            return (
              <Checkbox
                key={index}
                label={params.shape[index]}
                checked={value}
                onChange={() => handleOnChange(index, shapes, setShapes)}
              />
            );
          })}
        </Panel>
      </motion.div>
    </Overlay>
  );
};
