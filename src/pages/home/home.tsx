import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { Preloader } from "../../components/preloader/preloader";

export const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then((res) => {
        const data = res.data;
        setData(data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <>{isLoading ? <Preloader /> : 
  <>
	{data}
  </>
  }</>;
};
