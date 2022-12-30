import React, { FC, useEffect, useState, useContext } from "react";
import styles from "./home.module.scss";
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Preloader } from "../../components/preloader/preloader";
import { Item } from "../../components/coaster-item/coaster-item";
import { DeviceContext } from "../../services/app-context";
import { TCoaster } from "../../services/types";
import { baseUrl } from "../../utils/api";
import { selectStatus } from "../../slices/coastersSlice";
import { fillParams } from "../../slices/filterParamsSlice";
import { useTypedSelector } from "../../services/store";
import { useAppDispatch } from "../../hooks/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const pageSize = isDesktop ? 24 : 10;

  const fetchData = () => {
    setPage(1);
    setData([]);
    const params = new URLSearchParams(paramsStr);
    axios.get(`${baseUrl}?${params.toString()}`).then((res) => {
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
    setAllData([]);
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
  };

  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
        sidebarIsOpened={sidebarIsOpened}
        withFilter={true}
      />
      <Sidebar
        isOpened={sidebarIsOpened}
        closeSidebar={closeSidebar}
        paramsStr={paramsStr}
        setParamsStr={setParamsStr}
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
                    reverse={item.reverse === "Да" ? true : false}
                    shape={item.shape}
                  />
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        )}
      </main>
    </>
  );
};
