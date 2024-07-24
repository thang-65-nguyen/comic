import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../layouts/home";

import DescribeComic from "../page/DescribeComic";
import Chapter from "../page/chapter/Index";
import Search from "../page/search/Index";

import LayoutDoiPassword from "../page/doimatkhau/Layout";
import LayoutTruyenMoiCapNhat from "../page/truyenmoicapnhat/Layout";

import NewComic from "../page/NewComic/NewComic";
import RelasingComic from "../page/DanhSachTruyen/TruyenDangPhatHanh/NewComic";
import CompleteComic from "../page/DanhSachTruyen/TruyenHoanHanh/NewComic";
import ComingSoon from "../page/DanhSachTruyen/TruyenSapRaMat/NewComic";
import Archive from "../page/Archive/Layout";
import NewCategory from "../page/category/LayoutCategory";
import { useAuth } from "../context/AuthContext";
import History from "../page/history/Layout";
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
};
const Routing = () => {
  return (
    <Routes>
      <Route
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
        path="/"
      ></Route>
      <Route element={<DescribeComic />} path="/truyen-tranh/:slug"></Route>
      <Route element={<Chapter />} path="/chapter/:comicSlug/:chapterApiData" />
      <Route
        element={<LayoutTruyenMoiCapNhat />}
        path="/truyen-moi-cap-nhat/:page"
      />
      <Route element={<Search />} path="/tim-kiem" />
      <Route element={<LayoutDoiPassword />} path="/doi-mat-khau" />
      {/* ... */}
      <Route element={<NewComic />} path="/new-comic/:page" />
      <Route element={<RelasingComic />} path="/relasing-comic/:page" />
      <Route element={<CompleteComic />} path="/complete-comic/:page" />
      <Route element={<ComingSoon />} path="/coming-soon/:page" />
      <Route element={<Archive />} path="/archive" />
      <Route element={<NewCategory />} path="/category/:slug/:page" />
      <Route element={<History />} path="/history" />
    </Routes>
  );
};

export default Routing;
