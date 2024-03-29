import { FC, useContext, useEffect, useState } from "react";
import styles from "./statistics.module.scss";
import cn from "classnames";
import { DeviceContext } from "src/services/app-context";
import { useOrientation } from "react-use";
import { useSelector } from "react-redux";
import { RootState } from "src/services/store";
import { useInView } from "react-intersection-observer";
import { SegmentChart } from "src/components/statistics/segment-chart/segment-chart";

type TSectionReverseProps = {
    setActiveSection: (value: string) => void;
};

export const SectionReverse: FC<TSectionReverseProps> = ({
    setActiveSection,
}) => {
    const { isDesktop } = useContext(DeviceContext);
    const { type } = useOrientation();
    const [ref, inView] = useInView({
        threshold: isDesktop || type === "landscape-primary" ? 0.1 : 0.5,
    });
    const items = useSelector((state: RootState) => state.coasters.items);
    const quantity = items.length;
    const [withReverse, setWithReverse] = useState<string>("0");
    const [withoutReverse, setWithoutReverse] = useState<string>("0");

    useEffect(() => {
        if (inView) {
            setActiveSection("reverses");
        }
    }, [inView, setActiveSection]);

    useEffect(() => {
        if (items.length > 0) {
            setWithReverse(
                Number(
                    (items.filter((item) => item.reverse === "Да").length *
                        100) /
                        quantity
                ).toFixed(1)
            );
            setWithoutReverse(
                Number(
                    (items.filter((item) => item.reverse === "Нет").length *
                        100) /
                        quantity
                ).toFixed(1)
            );
        }
    }, [items, quantity]);

    return (
        <section
            id="reverses"
            className={cn(styles.screen, styles.screen_3)}
            ref={ref}
        >
            <div
                className={styles.col_3}
                style={{
                    transform: inView
                        ? "none"
                        : isDesktop
                        ? "scale(0)"
                        : "translateX(-100%)",
                    opacity: inView ? 1 : 0,
                    width: isDesktop ? "33%" : "45%",
                    transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                        isDesktop ? "0.2s" : "0s"
                    }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                        isDesktop ? "0.2s" : "0s"
                    }`,
                }}
            >
                <SegmentChart
                    percent={+withReverse}
                    inView={inView}
                    radius={238}
                    strokeWidth={50}
                >
                    <div
                        className={styles.label}
                        style={{
                            transform: inView ? "none" : "translateY(-100px)",
                            opacity: inView ? 1 : 0,
                            transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                isDesktop ? "0.9s" : "0s"
                            }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                isDesktop ? "0.9s" : "0s"
                            }`,
                        }}
                    >
                        С оборотом
                    </div>
                </SegmentChart>
            </div>
            <div
                className={styles.col_3}
                style={{
                    transform: inView
                        ? "none"
                        : isDesktop
                        ? "scale(0)"
                        : "translateX(100%)",
                    opacity: inView ? 1 : 0,
                    width: isDesktop ? "33%" : "45%",
                    transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                        isDesktop ? "0.4s" : "0s"
                    }, opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                        isDesktop ? "0.4s" : "0s"
                    }`,
                }}
            >
                <SegmentChart
                    percent={+withoutReverse}
                    inView={inView}
                    radius={238}
                    strokeWidth={50}
                >
                    <div
                        className={styles.label}
                        style={{
                            transform: inView ? "none" : "translateY(-100px)",
                            opacity: inView ? 1 : 0,
                            transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                isDesktop ? "1.1s" : "0s"
                            }, opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${
                                isDesktop ? "1.1s" : "0s"
                            }`,
                        }}
                    >
                        Без оборота
                    </div>
                </SegmentChart>
            </div>
        </section>
    );
};
