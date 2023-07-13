import { FC, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "src/pages/home/home";
import { StatisticsPage } from "src/pages/statistics/main";
import { NotFoundPage } from "src/pages/404/404";
import { DeviceContext } from "src/services/app-context";
import { useAppDispatch } from "src/hooks/hooks";
import { fetchCoasters } from "src/services/fetchCoasters";

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const loadData = () => dispatch(fetchCoasters(0));

  useEffect(() => {
    loadData();
  }, [dispatch]);

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="statistics" element={<StatisticsPage />} />
        </Routes>
      </div>
    </>
  );
};

export const App: FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768 ? true : false);
  const [windowDimension, setWindowDimension] = useState<number | null>(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
    windowDimension && windowDimension >= 768
      ? setIsDesktop(true)
      : setIsDesktop(false);
  }, [windowDimension, isDesktop]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <BrowserRouter basename="/coaster-collection">
      <DeviceContext.Provider
        value={{ isDesktop: isDesktop, changeIsDesktop: setIsDesktop }}
      >
        <Main />
      </DeviceContext.Provider>
    </BrowserRouter>
  );
};
