import React, { FC, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { AboutPage } from "../../pages/about/about";
import { StatisticsPage } from "../../pages/statistics/statistics";
import { Header } from "../header/header";

export const Main: FC = () => {
  // const history = useNavigate();

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
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
