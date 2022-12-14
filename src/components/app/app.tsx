import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { StatisticsPage } from "../../pages/statistics/statistics";
import { NotFoundPage } from "../../pages/404/404";
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { Modal } from "../modal/modal";
import { AnimatePresence } from "framer-motion";

export const Main: FC = () => {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpened(!sidebarIsOpened);
  };

  const closeSidebar = () => {
    setSidebarIsOpened(false);
  };

  const openModal = () => {
    setModalIsOpened(true);
  };

  const closeModal = () => {
    setModalIsOpened(false);
  };

  return (
    <>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} openModal={openModal} sidebarIsOpened={sidebarIsOpened}/>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {sidebarIsOpened && <Sidebar closeSidebar={closeSidebar} />}
        </AnimatePresence>
        
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Routes>

      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalIsOpened && (
          <Modal closeModal={closeModal} />
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
