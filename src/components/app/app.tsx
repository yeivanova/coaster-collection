import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { StatisticsPage } from "../../pages/statistics/statistics";
import { NotFoundPage } from "../../pages/404/404";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { AnimatePresence } from "framer-motion";

export const Main: FC = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const openModal = () => {
    setModalIsOpened(true);
  };

  const closeModal = () => {
    setModalIsOpened(false);
  };

  return (
    <>
      <div className="app">
        <Header openModal={openModal} />
        <main className="main">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalIsOpened && (
          <Modal openModal={openModal} closeModal={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};
