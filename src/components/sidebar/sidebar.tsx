import React, { FC, useState, useEffect, useContext } from "react";
import styles from "./sidebar.module.scss";
import { Navbar } from "../navbar/navbar";
import { Checkbox } from "../checkbox/checkbox";
import { Panel } from "../filer-panel/filer-panel";
import { motion } from "framer-motion";
import { DeviceContext } from "src/services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { Overlay } from "../overlay/overlay";
import { TValues } from "src/slices/filterParamsSlice";
import { TParams } from "src/services/types";

type TSidebarProps = {
  isOpened: boolean;
  closeSidebar: () => void;
  paramsStr: string;
  setParamsStr: (value: string) => void;
};

type TParamsActivity = {
  types: boolean[];
  brands: boolean[];
  kinds: boolean[];
  countries: boolean[];
  shapes: boolean[];
  reverse: boolean[];
};

export const Sidebar: FC<TSidebarProps> = ({
  isOpened,
  closeSidebar,
  paramsStr,
  setParamsStr,
}) => {
  const allParams = useSelector((state: RootState) => state.coasters.params);
  const currentParams = useSelector((state: RootState) => state.filterParams);
  const [reverse, setReverse] = useState(false);
  const [types, setTypes] = useState<boolean[]>();
  const [brands, setBrands] = useState<boolean[]>();
  const [kinds, setKinds] = useState<boolean[]>();
  const [countries, setCountries] = useState<boolean[]>();
  const [shapes, setShapes] = useState<boolean[]>();
  const [filterPanels, setFilterPanels] = useState<boolean[]>(
    new Array(5).fill(true)
  );
  const [paramsActivity, setParamsActivity] = useState<TParamsActivity>();
  const [lastParams, setLastParams] = useState<TValues>();
  const [lastChangedParam, setLastChangedParam] = useState<TParams>();
  const [checkboxAction, setCheckboxAction] = useState<boolean>(false);
  const { isDesktop } = useContext(DeviceContext);

  const initParams = () => {
    setTypes(new Array(allParams.type.length).fill(false));
    setBrands(new Array(allParams.brand.length).fill(false));
    setKinds(new Array(allParams.kind.length).fill(false));
    setCountries(new Array(allParams.country.length).fill(false));
    setShapes(new Array(allParams.shape.length).fill(false));
    setParamsActivity({
      types: new Array(allParams.type.length).fill(true),
      brands: new Array(allParams.brand.length).fill(true),
      kinds: new Array(allParams.kind.length).fill(true),
      countries: new Array(allParams.country.length).fill(true),
      shapes: new Array(allParams.shape.length).fill(true),
      reverse: new Array(allParams.reverse.length).fill(true),
    });
    setLastParams(allParams);
  }

  useEffect(() => {
    if (allParams.type.length > 0) {
      initParams();
    }
  }, [allParams]);

  useEffect(() => {
    if (currentParams.type.length > 0) {
      if (typeof lastChangedParam !== "undefined") {
        compareParams(lastChangedParam);
      }
    }
  }, [currentParams]);

  const clearFilter = () => {
    setParamsStr("");
    setReverse(false);
    initParams();
  }

  const compareParams = (category: TParams) => {
    if (typeof paramsActivity !== "undefined") {
      const newParamsActivity = paramsActivity;
      const tempTypes: boolean[] = [];
      const tempBrands: boolean[] = [];
      const tempKinds: boolean[] = [];
      const tempCountries: boolean[] = [];
      const tempShapes: boolean[] = [];
      const tempReverse: boolean[] = [];

      allParams.type.forEach((type, index) => {
        tempTypes[index] =
          category !== "type" || checkboxAction
            ? currentParams.type.includes(type)
            : lastParams?.type.includes(type)
            ? true
            : false;
      });

      allParams.brand.forEach((brand, index) => {
        tempBrands[index] =
          category !== "brand" || checkboxAction
            ? currentParams.brand.includes(brand)
            : lastParams?.brand.includes(brand)
            ? true
            : false;
      });
      
      allParams.kind.forEach((kind, index) => {
        tempKinds[index] =
          category !== "kind" || checkboxAction
            ? currentParams.kind.includes(kind)
            : lastParams?.kind.includes(kind)
            ? true
            : false;
      });
      allParams.country.forEach((country, index) => {
        tempCountries[index] =
          category !== "country" || checkboxAction
            ? currentParams.country.includes(country)
            : lastParams?.country.includes(country)
            ? true
            : false;
      });
      allParams.shape.forEach((shape, index) => {
        tempShapes[index] =
          category !== "shape" || checkboxAction
            ? currentParams.shape.includes(shape)
            : lastParams?.shape.includes(shape)
            ? true
            : false;
      });
      allParams.reverse.forEach((reverse, index) => {
        tempReverse[index] =
          category !== "reverse" || checkboxAction
            ? currentParams.reverse.includes(reverse)
            : lastParams?.reverse.includes(reverse)
            ? true
            : false;
      });

      newParamsActivity.types = tempTypes;
      newParamsActivity.brands = tempBrands;
      newParamsActivity.kinds = tempKinds;
      newParamsActivity.countries = tempCountries;
      newParamsActivity.shapes = tempShapes;
      newParamsActivity.reverse = tempReverse;
      setParamsActivity(newParamsActivity);
      const lastTemp = { ...currentParams };
      if (typeof lastParams !== "undefined") {
        lastTemp[category] = lastParams[category];
      }
      setLastParams(lastTemp);
    }
  };

  const handleOnOpen = (position: number) => {
    const updatedOpenedState = filterPanels.map((item, index) =>
      index === position ? !item : item
    );
    setFilterPanels(updatedOpenedState);
  };

  const handleOnChange = (
    position: number,
    arr: boolean[],
    setFunction: (value: boolean[]) => void,
    paramArr: string[],
    paramName: TParams
  ) => {
    const updatedCheckedState = arr.map((item, index) =>
      index === position ? !item : item
    );
    setFunction(updatedCheckedState);
    generateUrl(updatedCheckedState, paramArr, paramName);
    setLastChangedParam(paramName);
  };

  const generateUrl = (
    arr: boolean[],
    paramArr: string[],
    paramName: string
  ) => {
    let currentParams = new URLSearchParams(paramsStr);

    arr.forEach((currentValue, index) => {
      if (
        currentValue &&
        !currentParams.getAll(paramName).includes(paramArr[index])
      ) {
        currentParams.append(paramName, paramArr[index]);
      }

      if (
        !currentValue &&
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
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {!isDesktop && (
            <>
              <Navbar />
              <h2 className={styles.h2}>Фильтр</h2>
            </>
          )}
          <button className={styles.clear_filter} onClick={clearFilter}>Очистить фильтр</button>
          <Panel isMultiple={false}>
            <Checkbox
              label={"Оборот"}
              checked={reverse}
              onChange={() => {
                setCheckboxAction(reverse);
                setReverse(!reverse);
                generateUrl([!reverse], allParams.reverse, "reverse");
                setLastChangedParam("reverse");
              }}
            />
          </Panel>
          {types && (
            <Panel
              title="Тип"
              isOpen={filterPanels[0]}
              setIsOpen={() => handleOnOpen(0)}
            >
              {types.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={allParams.type[index]}
                    checked={value}
                    isDisabled={!paramsActivity?.types[index]}
                    onChange={() => {
                      setCheckboxAction(value);
                      handleOnChange(
                        index,
                        types,
                        setTypes,
                        allParams.type,
                        "type"
                      );
                    }}
                  />
                );
              })}
            </Panel>
          )}
          {brands && (
            <Panel
              title="Марка"
              isOpen={filterPanels[1]}
              setIsOpen={() => handleOnOpen(1)}
            >
              {brands.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={allParams.brand[index]}
                    checked={value}
                    isDisabled={!paramsActivity?.brands[index]}
                    onChange={() => {
                      setCheckboxAction(value);
                      handleOnChange(
                        index,
                        brands,
                        setBrands,
                        allParams.brand,
                        "brand"
                      );
                    }}
                  />
                );
              })}
            </Panel>
          )}
          {kinds && (
            <Panel
              title="Вид"
              isOpen={filterPanels[2]}
              setIsOpen={() => handleOnOpen(2)}
            >
              {kinds.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={allParams.kind[index]}
                    checked={value}
                    isDisabled={!paramsActivity?.kinds[index]}
                    onChange={() => {
                      setCheckboxAction(value);
                      handleOnChange(
                        index,
                        kinds,
                        setKinds,
                        allParams.kind,
                        "kind"
                      );
                    }}
                  />
                );
              })}
            </Panel>
          )}
          {countries && (
            <Panel
              title="Страна"
              isOpen={filterPanels[3]}
              setIsOpen={() => handleOnOpen(3)}
            >
              {countries.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={allParams.country[index]}
                    checked={value}
                    isDisabled={!paramsActivity?.countries[index]}
                    onChange={() => {
                      setCheckboxAction(value);
                      handleOnChange(
                        index,
                        countries,
                        setCountries,
                        allParams.country,
                        "country"
                      );
                    }}
                  />
                );
              })}
            </Panel>
          )}
          {shapes && (
            <Panel
              title="Форма"
              isOpen={filterPanels[4]}
              setIsOpen={() => handleOnOpen(4)}
            >
              {shapes.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    label={allParams.shape[index]}
                    checked={value}
                    isDisabled={!paramsActivity?.shapes[index]}
                    onChange={() => {
                      setCheckboxAction(value);
                      handleOnChange(
                        index,
                        shapes,
                        setShapes,
                        allParams.shape,
                        "shape"
                      );
                    }}
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
