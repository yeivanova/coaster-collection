import React, { FC, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { AboutPage } from "../../pages/about/about";
import { StatisticsPage } from "../../pages/statistics/statistics";
import { NotFoundPage } from "../../pages/404/404";
import { Header } from "../header/header";

export const Main: FC = () => {

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};
