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
import { useTypedSelector } from "../../services/store";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export const HomePage: FC = () => {
  const { isDesktop } = useContext(DeviceContext);
  const status = useTypedSelector(selectStatus);
  const [data, setData] = useState<TCoaster[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [paramsStr, setParamsStr] = useState<string>("");
  const [sidebarIsOpened, setSidebarIsOpened] = useState<boolean>(false);

  const fetchData = (isInit: boolean) => {
    const params = new URLSearchParams(paramsStr);
    params.append("PageNumber", (isInit ? 1 : page).toString());
    params.append("PageSize", (isDesktop ? 24 : 10).toString());

    axios.get(`${baseUrl}?${params.toString()}`).then((res) => {
      setHasMore(res.data.length === 24 ? true : false);
      setData(isInit ? [...res.data] : [...data, ...res.data]);
      setPage(page + 1);
    });
  };

  useEffect(() => {
    fetchData(true);
  }, [paramsStr]);

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
        {status === "loading" ? (
          <Preloader />
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={() => fetchData(false)}
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
        )}
      </main>
    </>
  );
};
