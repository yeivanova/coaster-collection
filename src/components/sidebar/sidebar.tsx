import React, { FC, useState, useEffect, useContext } from "react";
import styles from "./sidebar.module.scss";
import { Checkbox } from "../checkbox/checkbox";
import { Panel } from "../filer-panel/filer-panel";
import { motion } from "framer-motion";
import { DeviceContext } from "../../services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Overlay } from "../overlay/overlay";

type TSidebarProps = {
  isOpened: boolean;
  closeSidebar: () => void;
  paramsStr: string;
  setParamsStr: (value: string) => void;
};

export const Sidebar: FC<TSidebarProps> = ({
  isOpened,
  closeSidebar,
  paramsStr,
  setParamsStr,
}) => {
  const params = useSelector((state: RootState) => state.coasters.params);
  const [reverse, setReverse] = useState(false);
  const [types, setTypes] = useState<boolean[]>();
  const [brands, setBrands] = useState<boolean[]>();
  const [kinds, setKinds] = useState<boolean[]>();
  const [countries, setCountries] = useState<boolean[]>();
  const [shapes, setShapes] = useState<boolean[]>();
  const { isDesktop } = useContext(DeviceContext);

  useEffect(() => {
    if (params.type.length > 0) {
      setTypes(new Array(params.type.length).fill(false));
      setBrands(new Array(params.brand.length).fill(false));
      setKinds(new Array(params.kind.length).fill(false));
      setCountries(new Array(params.country.length).fill(false));
      setShapes(new Array(params.shape.length).fill(false));
    }
  }, [params]);

  const handleOnChange = (
    position: number,
    arr: boolean[],
    setFunction: (value: boolean[]) => void,
    paramArr: string[],
    paramName: string
  ) => {
    const updatedCheckedState = arr.map((item, index) =>
      index === position ? !item : item
    );
    setFunction(updatedCheckedState);
    generateUrl(updatedCheckedState, paramArr, paramName);
  };

  const generateUrl = (
    arr: boolean[],
    paramArr: string[],
    paramName: string
  ) => {
    let currentParams = new URLSearchParams(paramsStr);
    
    arr.forEach((currentValue, index) => {
      if (
        currentValue === true &&
        !currentParams.getAll(paramName).includes(paramArr[index])
      ) {
        currentParams.append(paramName, paramArr[index]);
      }

      if (
        currentValue === false &&
        currentParams.getAll(paramName).includes(paramArr[index])
      ) {
        currentParams.delete(paramName);
      }
    });
    setParamsStr(currentParams.toString());
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

  if (isOpened) {
    return (
      <Overlay onClick={closeSidebar} transparent={true}>
        <motion.div
          className={styles.sidebar}
          variants={slideIn}
          initial="hidden"
          animate={"visible"}
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {!isDesktop && <h2 className={styles.h2}>Фильтр</h2>}
          <Panel className={styles.single}>
            <Checkbox
              label={"Оборот"}
              checked={reverse}
              onChange={() => {
                setReverse(!reverse);
                generateUrl([!reverse], params.reverse, "reverse");
              }}
            />
          </Panel>
          {types && (
            <Panel title="Тип" className={styles.multiple}>
              {types.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={params.type[index]}
                    checked={value}
                    onChange={() =>
                      handleOnChange(
                        index,
                        types,
                        setTypes,
                        params.type,
                        "type"
                      )
                    }
                  />
                );
              })}
            </Panel>
          )}
          {brands && (
            <Panel title="Марка" className={styles.multiple}>
              {brands.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={params.brand[index]}
                    checked={value}
                    onChange={() =>
                      handleOnChange(
                        index,
                        brands,
                        setBrands,
                        params.brand,
                        "brand"
                      )
                    }
                  />
                );
              })}
            </Panel>
          )}
          {kinds && (
            <Panel title="Вид" className={styles.multiple}>
              {kinds.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={params.kind[index]}
                    checked={value}
                    onChange={() =>
                      handleOnChange(
                        index,
                        kinds,
                        setKinds,
                        params.kind,
                        "kind"
                      )
                    }
                  />
                );
              })}
            </Panel>
          )}
          {countries && (
            <Panel title="Страна" className={styles.multiple}>
              {countries.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={params.country[index]}
                    checked={value}
                    onChange={() =>
                      handleOnChange(
                        index,
                        countries,
                        setCountries,
                        params.country,
                        "country"
                      )
                    }
                  />
                );
              })}
            </Panel>
          )}
          {shapes && (
            <Panel title="Форма" className={styles.multiple}>
              {shapes.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={params.shape[index]}
                    checked={value}
                    onChange={() =>
                      handleOnChange(
                        index,
                        shapes,
                        setShapes,
                        params.shape,
                        "shape"
                      )
                    }
                  />
                );
              })}
            </Panel>
          )}
        </motion.div>
      </Overlay> 
    );
  } else return <></>;
};
