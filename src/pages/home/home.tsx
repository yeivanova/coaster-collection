import { FC, useEffect, useState, useContext } from "react";
import { Header } from "src/components/header/header";
import { Sidebar } from "src/components/sidebar/sidebar";
import { Preloader } from "src/components/preloader/preloader";
import { Item } from "src/components/coaster-item/coaster-item";
import { UpButton } from "src/components/upButton/upButton";
import { Modal } from "src/components/modal/modal";
import { DeviceContext } from "src/services/app-context";
import { TCoaster } from "src/services/types";
import { APIUrl } from "src/utils/api";
import { selectStatus } from "src/slices/coastersSlice";
import { fillParams } from "src/slices/filterParamsSlice";
import { useTypedSelector } from "src/services/store";
import { useAppDispatch } from "src/hooks/hooks";
import { AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./home.module.scss";
import axios from "axios";

export const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<TCoaster[]>([]);
    const [allData, setAllData] = useState<TCoaster[]>([]);
    const { isDesktop } = useContext(DeviceContext);
    const status = useTypedSelector(selectStatus);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [paramsStr, setParamsStr] = useState<string>("");
    const [sidebarIsOpened, setSidebarIsOpened] = useState<boolean>(false);
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
    const pageSize = isDesktop ? 24 : 10;

    const fetchData = () => {
        setPage(1);
        setData([]);
        const params = new URLSearchParams(paramsStr);
        axios.get(`${APIUrl}?${params.toString()}`).then((res) => {
            setAllData(res.data);
            sliceData(res.data, [], 1);
            fillParameters(res.data);
        });
    };

    const sliceData = (allData: TCoaster[], data: TCoaster[], page: number) => {
        const slice = allData.slice((page - 1) * pageSize, page * pageSize);
        if (allData.length > 0) {
            setIsLoading(false);
            setData([...data, ...slice]);
            setHasMore(slice.length === pageSize);
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (!paramsStr) setAllData([]);
        fetchData();
    }, [paramsStr]);

    const fillParameters = (data: TCoaster[]) => {
        const output = {
            type: [...new Set(data.map((item) => item.type))],
            brand: [...new Set(data.map((item) => item.brand))],
            kind: [...new Set(data.map((item) => item.kind))],
            country: [...new Set(data.map((item) => item.country))],
            shape: [...new Set(data.map((item) => item.shape))],
            reverse: [...new Set(data.map((item) => item.reverse))],
        };
        dispatch(fillParams(output));
    };

    const toggleSidebar = () => {
        setSidebarIsOpened(!sidebarIsOpened);
    };

    const closeSidebar = () => {
        setSidebarIsOpened(false);
      document.body.classList.remove("no-scroll");
    };

    const openModal = () => {
        setModalIsOpened(true);
      closeSidebar();
    };

    const closeModal = () => {
        setModalIsOpened(false);
    };

    return (
        <>
            <Header
                openModal={openModal}
                toggleSidebar={toggleSidebar}
                sidebarIsOpened={sidebarIsOpened}
                withFilter={true}
            />
            <main className={styles.main}>
                {(status === "loading" || isLoading) && allData.length > 0 ? (
                    <Preloader />
                ) : (
                    <div className={styles.infinite_scroll_wrapper}>
                        <InfiniteScroll
                            dataLength={data.length}
                            next={() => sliceData(allData, data, page)}
                            hasMore={hasMore}
                            loader={<Preloader />}
                        >
                            <ul className={styles.container}>
                                {data.map((item) => (
                                    <Item
                                        key={item.id}
                                        id={item.id}
                                        type={item.type}
                                        brand={item.brand}
                                        kind={item.kind}
                                        country={item.country}
                                        reverse={
                                            item.reverse === "Да" ? true : false
                                        }
                                        shape={item.shape}
                                    />
                                ))}
                            </ul>
                        </InfiniteScroll>
                    </div>
                )}
            </main>
            <UpButton />
            <Sidebar
                isOpened={sidebarIsOpened}
                closeSidebar={closeSidebar}
                openModal={openModal}
                paramsStr={paramsStr}
                setParamsStr={setParamsStr}
                visibleItemsQuantity={allData.length}
            />
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
          {modalIsOpened && <Modal closeModal={closeModal} />}
            </AnimatePresence>
        </>
    );
};
