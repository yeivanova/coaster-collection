import React, { FC, useContext, useEffect, useState, useRef } from "react";
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

interface ValidRefTarget {
    contains(target: EventTarget | null): any;
}

const generateBeerObj = (entries: TCoaster[]) => {
    const beerObj = {} as { [key: string]: number };
    const particle = Number((100 / entries.length).toFixed(1));
    entries.forEach(
        (el) =>
            el.beerType[1] !== undefined &&
            (beerObj[el.beerType[1]] = !beerObj.hasOwnProperty(el.beerType[1])
                ? particle
                : Number((beerObj[el.beerType[1]] + particle).toFixed(1)))
    );
    return beerObj;
};

function useOutsideAlerter(
    ref: React.RefObject<ValidRefTarget>,
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

export const SectionKinds: FC<TSectionKindsProps> = ({ setActiveSection }) => {
    const { isDesktop } = useContext(DeviceContext);
    const [ref, inView] = useInView({ threshold: 0.1 });
    const items = useSelector((state: RootState) => state.coasters.items);
    const quantity = items.length;
    const itemsBeer = items.filter((item) => item.type === "Пиво").length;
    const [ales, setAles] = useState<number>(0);
    const [alesSubtypes, setAlesSubtypes] = useState<{ [key: string]: number }>(
        {}
    );
    const [lagersSubtypes, setLagersSubtypes] = useState<{
        [key: string]: number;
    }>({});
    const [lagers, setLagers] = useState<number>(0);
    const [showAleSubtypes, setShowAleSubtypes] = useState<boolean>(false);
    const [showLagerSubtypes, setShowLagerSubtypes] = useState<boolean>(false);
    const wrapperAleRef = useRef<HTMLDivElement>(null);
    const wrapperLagerRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(wrapperAleRef, () => {
        setShowAleSubtypes(false);
        setShowLagerSubtypes(false);
    });

    useOutsideAlerter(wrapperLagerRef, () => {
        setShowAleSubtypes(false);
        setShowLagerSubtypes(false);
    });

    useEffect(() => {
        if (inView) {
            setActiveSection("kinds");
        }
    }, [inView, setActiveSection]);

    useEffect(() => {
        const aleEntries = items.filter((item) => item.beerType[0] === "Ale");
        const lagerEntries = items.filter(
            (item) => item.beerType[0] === "Lager"
        );

        setAles(Number(((aleEntries.length * 100) / itemsBeer).toFixed(1)));
        setLagers(Number(((lagerEntries.length * 100) / itemsBeer).toFixed(1)));

        setAlesSubtypes(generateBeerObj(aleEntries));
        setLagersSubtypes(generateBeerObj(lagerEntries));
    }, [items, itemsBeer]);

    const hiddenClass = (condition: boolean) =>
        condition ? styles.hidden : styles.default;
    const shownClass = (condition: boolean) => (condition ? styles.shown : "");
    const diminishClass =
        showAleSubtypes || showLagerSubtypes ? styles.diminished : "";

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
                    {((itemsBeer * 100) / quantity).toFixed(1)}% коллекции или{" "}
                    {itemsBeer} штук. <br />
                    Эту цифру мы и возмем за абсолютную величину.
                </h3>
            </div>
            <div
                className={styles.wrap_col}
                style={{
                    transform: inView ? "none" : "translateY(-50px)",
                    opacity: inView ? 1 : 0,
                    transition: `transform 0.6s ease-in-out ${
                        isDesktop ? "0.5s" : "0s"
                    }, opacity 0.6s ease-in-out ${isDesktop ? "0.5s" : "0s"}`,
                }}
            >
                <div
                    className={`${styles.col_2} ${styles.subtypes_ale} ${
                        styles.initial_subtyps
                    } ${shownClass(showAleSubtypes)} ${hiddenClass(
                        showLagerSubtypes
                    )}`}
                >
                    <div
                        className={`${styles.subtypes_wrapper} ${
                            showAleSubtypes && styles.subtypes_wrapper_active
                        }`}
                    >
                        {Object.entries(alesSubtypes).map((entry) => {
                            return (
                                <div
                                    className={`${styles.subtypes_item} ${
                                        showAleSubtypes &&
                                        styles.subtypes_active
                                    }`}
                                    key={uuid()}
                                >
                                    <GlassFill
                                        type="ale"
                                        percent={entry[1]}
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
                                            {entry[0]}
                                        </div>
                                    </GlassFill>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div
                    className={`${styles.col_2} ${styles.subtypes_lager} ${
                        styles.initial_subtyps
                    } ${hiddenClass(showAleSubtypes)} ${shownClass(
                        showLagerSubtypes
                    )}`}
                >
                    <div
                        className={`${styles.subtypes_wrapper} ${
                            showLagerSubtypes && styles.subtypes_wrapper_active
                        }`}
                    >
                        {Object.entries(lagersSubtypes).map((entry) => {
                            return (
                                <div
                                    className={`${styles.subtypes_item} ${
                                        showLagerSubtypes &&
                                        styles.subtypes_active
                                    }`}
                                    key={uuid()}
                                >
                                    <GlassFill
                                        type="lager"
                                        percent={entry[1]}
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
                                            {entry[0]}
                                        </div>
                                    </GlassFill>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div
                    className={`${styles.col_2} ${styles.ale} ${diminishClass}`}
                >
                    <div
                        className={`${styles.chart_wrapper}`}
                        onClick={() => setShowAleSubtypes(!showAleSubtypes)}
                        ref={wrapperAleRef}
                    >
                        <GlassFill
                            type="ale"
                            percent={ales}
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
                                Ale
                            </div>
                        </GlassFill>
                    </div>
                </div>

                <div
                    className={`${styles.col_2} ${styles.lager} ${diminishClass}`}
                >
                    <div
                        className={`${styles.chart_wrapper}`}
                        onClick={() => setShowLagerSubtypes(!showLagerSubtypes)}
                        ref={wrapperLagerRef}
                    >
                        <GlassFill
                            type="lager"
                            percent={lagers}
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
                                Lager
                            </div>
                        </GlassFill>
                    </div>
                </div>
            </div>
        </section>
    );
};
