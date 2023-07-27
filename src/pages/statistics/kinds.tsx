import { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { useOrientation } from "react-use";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { useInView } from "react-intersection-observer";
import { GlassFill } from "src/components/statistics/glass-fill/glass-fill";
import { TCoaster } from "src/services/types";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
};

const zoomIn = {
    hidden: {
        y: "100vh",
        scale: 0.5,
        opacity: 0,
    },
    visible: {
        y: "0",
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.7,
            type: "spring",
            damping: 50,
            stiffness: 500,
        },
    },
    exit: {
        y: "-100vh",
        scale: 0.5,
        opacity: 0,
    },
};

type TSectionKindsProps = {
    setActiveSection: (value: string) => void;
};

type Tbeer = {
    name: string;
    number: number;
    type?: "ale" | "lager";
    from?: string;
    percent?: number;
    subtypes?: Tbeer[];
};

type TBeerProjection = {
    prev: Tbeer[];
    current: Tbeer[];
    next: Tbeer[][];
};

const fillBeerTree = (arr: Tbeer[], types: string[], type = "") => {
    const currentType = types.shift();
    if (type === "") {
        if (currentType === "Ale") {
            type = "ale";
        }
        if (currentType === "Lager") {
            type = "lager";
        }
    }

    let found = arr.find((el) => el.name === currentType);

    if (found) {
        found.number = found.number + 1;
    } else {
        arr.push({
            name: currentType!,
            number: 1,
            type: type as "ale" | "lager",
        });

        found = arr.find((el) => el.name === currentType);
    }

    if (types.length > 0) {
        if (!found!.hasOwnProperty("subtypes")) found!.subtypes = [];
        fillBeerTree(found!.subtypes!, [...types], type);
    }
};

const generateBeerTree = (entries: TCoaster[]) => {
    const beerObj = [] as Tbeer[];
    entries.forEach((el) => fillBeerTree(beerObj, [...el.beerType]));
    return beerObj;
};

const getBeerTreeProjection = (tree: Tbeer[] | undefined, route: string[]) => {
    const beerProjection = {} as TBeerProjection;
    if (tree === undefined) return beerProjection;

    let currentTree = [...tree];

    route.forEach((item) => {
        beerProjection.prev = [];
        const sum = currentTree.reduce(
            (accumulator, currentItem) => accumulator + currentItem.number,
            0
        );
        currentTree.forEach((el) => {
            beerProjection.prev.push({
                name: el.name,
                number: el.number,
                percent: Number(((el.number * 100) / sum).toFixed(1)),
                type: el.type,
            });
        });
        currentTree = currentTree.find((el) => el.name === item)?.subtypes!;
    });

    beerProjection.current = [];
    beerProjection.next = [];
    if (currentTree !== undefined) {
        const sum = currentTree.reduce(
            (accumulator, currentItem) => accumulator + currentItem.number,
            0
        );
        currentTree.forEach((el) => {
            beerProjection.current.push({
                name: el.name,
                number: el.number,
                percent: Number(((el.number * 100) / sum).toFixed(1)),
                type: el.type,
            });

            const currentElementSubtypes = [] as Tbeer[];
            if (el.subtypes?.length !== 0 && el.subtypes !== undefined) {
                const sum = el.subtypes!.reduce(
                    (accumulator, currentItem) =>
                        accumulator + currentItem.number,
                    0
                );
                el.subtypes!.forEach((subtype) => {
                    currentElementSubtypes.push({
                        name: subtype.name,
                        number: subtype.number,
                        percent: Number(
                            ((subtype.number * 100) / sum).toFixed(1)
                        ),
                        type: subtype.type,
                        from: el.name,
                    });
                });
                beerProjection.next.push(currentElementSubtypes);
            }
        });
    }
    return beerProjection;
};

const findbyFieldName = (arr: Tbeer[][], fieldName: string) => {
    const arrSpreaded = [] as Tbeer[];
    arr.forEach((item) => arrSpreaded.push(...item));
    return arrSpreaded.find((obj) => obj.from === fieldName);
};

export const SectionKinds: FC<TSectionKindsProps> = ({ setActiveSection }) => {
    const { isDesktop } = useContext(DeviceContext);
    const { type } = useOrientation();
    const [ref, inView] = useInView({
        threshold: isDesktop || type === "landscape-primary" ? 0.1 : 0.5,
    });
    const items = useSelector((state: RootState) => state.coasters.items);
    const quantity = items.length;
    const [beerTree, setBeerTree] = useState<Tbeer[]>();
    const [beerProjection, setBeerProjection] = useState<TBeerProjection>();
    const itemsBeer = items.filter(
        (item) =>
            item.type === "Пиво" &&
            (item.beerType[0] === "Ale" || item.beerType[0] === "Lager")
    );
    const [path, setPath] = useState<string[]>([]);

    useEffect(() => {
        if (inView) {
            setActiveSection("kinds");
        }
    }, [inView, setActiveSection]);

    useEffect(() => {
        setBeerTree(generateBeerTree([...itemsBeer]));
    }, [items]);

    useEffect(() => {
        setBeerProjection(getBeerTreeProjection(beerTree, path));
    }, [beerTree, path]);

    const mobileCurrentBeerTreeItems = (
        <>
            {beerTree !== undefined && Object.keys(beerTree).length !== 0 && (
                <div className={styles.wrap_col}>
                    {beerTree.map((item) => (
                        <motion.div
                            key={uuid()}
                            className={styles.col_auto}
                            variants={zoomIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <GlassFill
                                type={item.type!}
                                percent={(item.number * 100) / itemsBeer.length}
                                width={174}
                                height={296}
                                inView={inView}
                            >
                                <div
                                    className={styles.label}
                                    style={{
                                        transform: inView
                                            ? "none"
                                            : "translateY(-100px)",
                                        opacity: inView ? 1 : 0,
                                        transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                            isDesktop ? "0.9s" : "0s"
                                        }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                            isDesktop ? "0.9s" : "0s"
                                        }`,
                                    }}
                                >
                                    {item.name}
                                </div>
                            </GlassFill>
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );

    let previousBeerProjectionItems,
        currentBeerProjectionItems,
        nextBeerProjectionItems;

    if (
        beerProjection !== undefined &&
        Object.keys(beerProjection).length !== 0
    ) {
        previousBeerProjectionItems = (
            <>
                {beerProjection.prev !== undefined && (
                    <div
                        className={`${styles.wrap_col} ${
                            path.length > 1 ? styles.inner_step : ""
                        }`}
                        style={{ cursor: "pointer" }}
                    >
                        {beerProjection.prev.map((item) => (
                            <motion.div
                                key={uuid()}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={() => {
                                    path.pop();
                                    setPath([...path]);
                                }}
                            >
                                <div
                                    className={cn(
                                        styles.chart_inner,
                                        styles.subtypes_item
                                    )}
                                >
                                    <GlassFill
                                        type={item.type!}
                                        percent={item.percent!}
                                        width={174}
                                        height={296}
                                        inView={inView}
                                    >
                                        <div
                                            className={styles.label}
                                            style={{
                                                transform: inView
                                                    ? "none"
                                                    : "translateY(-100px)",
                                                opacity: inView ? 1 : 0,
                                                transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                    isDesktop ? "0.9s" : "0s"
                                                }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                    isDesktop ? "0.9s" : "0s"
                                                }`,
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    </GlassFill>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </>
        );

        currentBeerProjectionItems = (
            <div className={styles.wrap_col}>
                {beerProjection.current.map((item) => (
                    <motion.div
                        className={`${styles.col_auto} ${
                            path.length > 0 ? styles.col_subtype : ""
                        }`}
                        key={uuid()}
                        variants={zoomIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div
                            className={styles.chart_inner}
                            style={{
                                cursor: `${
                                    findbyFieldName(
                                        beerProjection.next,
                                        item.name
                                    )
                                        ? "pointer"
                                        : "default"
                                }`,
                            }}
                            onClick={
                                findbyFieldName(beerProjection.next, item.name)
                                    ? () => setPath([...path, item.name])
                                    : (e) => e.preventDefault
                            }
                        >
                            <div
                                className={`${
                                    findbyFieldName(
                                        beerProjection.next,
                                        item.name
                                    ) && beerProjection.prev !== undefined
                                        ? styles.clickable
                                        : ""
                                }`}
                            >
                                <GlassFill
                                    type={item.type!}
                                    percent={item.percent!}
                                    width={174}
                                    height={296}
                                    inView={inView}
                                >
                                    <div
                                        className={styles.label}
                                        style={{
                                            transform: inView
                                                ? "none"
                                                : "translateY(-100px)",
                                            opacity: inView ? 1 : 0,
                                            transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                isDesktop ? "0.9s" : "0s"
                                            }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                isDesktop ? "0.9s" : "0s"
                                            }`,
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                </GlassFill>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );

        nextBeerProjectionItems = (
            <div className={cn(styles.wrap_col, styles.next)}>
                {beerProjection.next.map((item) => (
                    <motion.div
                        className={styles.chart_inner}
                        key={uuid()}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {item.map((el) => (
                            <div className={styles.subtypes_item} key={uuid()}>
                                <GlassFill
                                    type={el.type!}
                                    percent={el.percent!}
                                    width={174}
                                    height={296}
                                    inView={inView}
                                >
                                    <div
                                        className={styles.label}
                                        style={{
                                            transform: inView
                                                ? "none"
                                                : "translateY(-100px)",
                                            opacity: inView ? 1 : 0,
                                            transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                isDesktop ? "0.9s" : "0s"
                                            }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                isDesktop ? "0.9s" : "0s"
                                            }`,
                                        }}
                                    >
                                        {el.name}
                                    </div>
                                </GlassFill>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        );
    }
    return (
        <section
            id="kinds"
            className={cn(styles.screen, styles.screen_5)}
            ref={ref}
        >
            <div className={styles.col}>
                <h2
                    className={styles.h2}
                    style={{
                        transform: inView ? "none" : "translateY(-100px)",
                        opacity: inView ? 1 : 0,
                        transition:
                            "transform 0.3s ease-in-out 0.3s, opacity 0.3s ease-in-out 0.3s",
                    }}
                >
                    На этой странице статистика будет основываться только на
                    пивных бирдекелях
                </h2>
                <h3
                    className={styles.h3}
                    style={{
                        transform: inView ? "none" : "translateY(-50px)",
                        opacity: inView ? 1 : 0,
                        transition:
                            "transform 0.3s ease-in-out 0.6s, opacity 0.3s ease-in-out 0.6s",
                    }}
                >
                    Выше вы уже узнали, что пивные бирдикели составляют{" "}
                    {((itemsBeer.length * 100) / quantity).toFixed(1)}%
                    коллекции или {itemsBeer.length} штук. <br />
                    Эту цифру мы и возмем за абсолютную величину.
                </h3>
            </div>
            <div
                className={styles.common_col}
                style={{
                    transform: inView ? "none" : "translateY(-50px)",
                    opacity: inView ? 1 : 0,
                    transition: `transform 0.6s ease-in-out ${
                        isDesktop ? "0.5s" : "0s"
                    }, opacity 0.6s ease-in-out ${isDesktop ? "0.5s" : "0s"}`,
                }}
            >
                {!isDesktop ? (
                    <>
                        {mobileCurrentBeerTreeItems}
                        <p
                            className={styles.mobile_hint}
                            style={{
                                transform: inView
                                    ? "none"
                                    : "translateY(-50px)",
                                opacity: inView ? 1 : 0,
                                transition:
                                    "transform 0.3s ease-in-out 0.9s, opacity 0.3s ease-in-out 0.9s",
                            }}
                        >
                            <svg
                                width="42"
                                height="42"
                                viewBox="0 0 42 42"
                                fill="none"
                            >
                                <path
                                    d="M3.5 24.5V28C3.5 32.949 3.5 35.4253 5.03825 36.9618C6.57475 38.5 9.051 38.5 14 38.5H15.75C20.699 38.5 23.1753 38.5 24.7118 36.9618C26.25 35.4253 26.25 32.949 26.25 28V14C26.25 9.051 26.25 6.57475 24.7118 5.03825C23.1753 3.5 20.699 3.5 15.75 3.5H14C9.051 3.5 6.57475 3.5 5.03825 5.03825C3.5 6.57475 3.5 9.051 3.5 14V17.5M30.625 17.5123C33.88 17.5595 35.7245 17.801 36.9618 19.0383C38.5 20.5765 38.5 23.051 38.5 28C38.5 32.9508 38.5 35.4253 36.9618 36.9635C35.7245 38.2008 33.88 38.4423 30.625 38.4895M19.25 8.75H10.5M33.25 31.5V24.5"
                                    stroke="#F7AD2A"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M17.5 30.625C17.5 31.3212 17.2234 31.9889 16.7312 32.4812C16.2389 32.9734 15.5712 33.25 14.875 33.25C14.1788 33.25 13.5111 32.9734 13.0188 32.4812C12.5266 31.9889 12.25 31.3212 12.25 30.625C12.25 29.9288 12.5266 29.2611 13.0188 28.7688C13.5111 28.2766 14.1788 28 14.875 28C15.5712 28 16.2389 28.2766 16.7312 28.7688C17.2234 29.2611 17.5 29.9288 17.5 30.625Z"
                                    stroke="#F7AD2A"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M35.875 12.2255L38.5 14C38.5 8.72375 34.7165 4.34525 29.75 3.5"
                                    stroke="#F7AD2A"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>
                                Для удобства навигации по сортам <br />
                                пива советую перевернуть телефон
                            </span>
                        </p>
                    </>
                ) : (
                    beerProjection !== undefined &&
                    Object.keys(beerProjection).length !== 0 && (
                        <>
                            {previousBeerProjectionItems}
                            {currentBeerProjectionItems}
                            {nextBeerProjectionItems}
                        </>
                    )
                )}
            </div>
        </section>
    );
};
