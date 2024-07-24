import React from "react";
import { useLightMode } from "../../components/LightDart";

import Footer from "../../components/footer";
import ListComicHome from "./ListComicHome";
import Banner from "../../components/banner";
import AppSlide from "../slide";
import Header from "../../components/header";

const Content = () => {
  const { light } = useLightMode();

  return (
    <div className={`${light ? "bg-[#18191a]" : "bg-white"} h-auto w-auto`}>
      <Header />
      <div className="flex gap-[32px] w-[1124px] mx-auto pb-10">
        <div className="flex-shrink-0 z-10">
          <AppSlide />
        </div>
        <div className="flex-1 mb-[2rem] z-0 mt-6">
          <Banner />
          <ListComicHome
            apiEndpoint="https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=2"
            to="/new-comic/trang-1"
          />
          <div className="mt-10">
            <ListComicHome
              apiEndpoint="https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat"
              to="/coming-soon/trang-1"
            />
          </div>
          <div className="mt-10">
            <ListComicHome
              apiEndpoint="https://otruyenapi.com/v1/api/danh-sach/dang-phat-hanh"
              to="/relasing-comic/trang-1"
            />
          </div>
          <div className="mt-10">
            <ListComicHome
              apiEndpoint="https://otruyenapi.com/v1/api/danh-sach/hoan-thanh"
              to="/complete-comic/trang-1"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Content;
