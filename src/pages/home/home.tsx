import React, { FC, useEffect, useState, useContext } from "react";
import styles from "./home.module.scss";
import { Preloader } from "../../components/preloader/preloader";
import { Item } from "../../components/coaster-item/coaster-item";
import { DeviceContext } from "../../services/app-context";
import { TCoaster } from "../../services/types";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { selectStatus } from "../../slices/coastersSlice";
import { useTypedSelector } from "../../services/store";
import InfiniteScroll from "react-infinite-scroll-component";

export const HomePage: FC = () => {
  const items = useSelector((state: RootState) => state.coasters.items);
  const [data, setData] = useState<TCoaster[]>([]);
  const [page, setPage] = useState(1);
  const { isDesktop } = useContext(DeviceContext);
  const status = useTypedSelector(selectStatus);

  const pageSize = isDesktop ? 24 : 10;

  const sliceData = () => {
    if (items.length > 0) {
      setData([
        ...data,
        ...items.slice((page - 1) * pageSize, page * pageSize),
      ]);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    sliceData();
  }, [items]);

  return (
    <main className={styles.main}>
      {status === "loading" ? (
        <Preloader />
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={() => sliceData()}
          hasMore={true}
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
  );
};
