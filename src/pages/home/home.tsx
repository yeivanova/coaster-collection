import React, { FC, useEffect, useState, useContext } from "react";
import styles from "./home.module.scss";
import { baseUrl } from "../../utils/api";
import { Preloader } from "../../components/preloader/preloader";
import { Item } from "../../components/coaster-item/coaster-item";
import { DeviceContext } from "../../services/app-context";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

type TCoaster = {
  id: number;
  beerType: string[];
  brand: string;
  country?: string;
  kind?: string;
  category: string;
  type: string;
  reverse: string;
  shape: string;
};

export const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TCoaster[]>([]);
  const [page, setPage] = useState(1);
  const { isDesktop } = useContext(DeviceContext);

  const fetchData = () => {
    axios
      .get(`${baseUrl}?PageNumber=${page}&PageSize=${isDesktop ? 24 : 10}`)
      .then((res) => {
        setData([...data, ...res.data]);
        setPage(page + 1);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <Preloader />
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={() => fetchData()}
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
