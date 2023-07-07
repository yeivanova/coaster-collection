import { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { useInView } from "react-intersection-observer";
import { GlassFill } from "src/components/statistics/glass-fill/glass-fill";
import { TCoaster } from "src/services/types";
import { v4 as uuid } from "uuid";

type TSectionKindsProps = {
    setActiveSection: (value: string) => void;
};

type Tbeer = {
    name: string;
    number: number;
    type?: "ale" | "lager";
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
                    });
                });
                beerProjection.next.push(currentElementSubtypes);
            }
        });
    }
    return beerProjection;
};

export const SectionKinds: FC<TSectionKindsProps> = ({ setActiveSection }) => {
    const { isDesktop } = useContext(DeviceContext);
    const [ref, inView] = useInView({ threshold: 0.1 });
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
                {beerProjection !== undefined &&
                    Object.keys(beerProjection).length !== 0 && (
                        <>
                            <div className={styles.wrap_col}>
                                {beerProjection.current.map((item) => (
                                    <div
                                        className={`${styles.col_auto}`}
                                        key={uuid()}
                                    >
                                        <div
                                            className={`${styles.chart_inner}`}
                                        >
                                            <div>
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
                                                            opacity: inView
                                                                ? 1
                                                                : 0,
                                                            transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                                isDesktop
                                                                    ? "0.9s"
                                                                    : "0s"
                                                            }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                                isDesktop
                                                                    ? "0.9s"
                                                                    : "0s"
                                                            }`,
                                                        }}
                                                    >
                                                        {item.name}
                                                    </div>
                                                </GlassFill>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.wrap_col}>
                                {beerProjection.next.map((item) => (
                                    <div
                                        className={`${styles.chart_inner}`}
                                        key={uuid()}
                                    >
                                        {item.map((el) => (
                                            <div
                                                className={styles.subtypes_item}
                                                key={uuid()}
                                            >
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
                                                            opacity: inView
                                                                ? 1
                                                                : 0,
                                                            transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                                isDesktop
                                                                    ? "0.9s"
                                                                    : "0s"
                                                            }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                                                isDesktop
                                                                    ? "0.9s"
                                                                    : "0s"
                                                            }`,
                                                        }}
                                                    >
                                                        {el.name}
                                                    </div>
                                                </GlassFill>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
            </div>
        </section>
    );
};
