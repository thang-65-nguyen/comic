import React, { useEffect, useState } from "react";
import { useLightMode } from "../../../components/LightDart";

import AppSlide from "../../slide";
import Footer from "../../../components/footer";
import ListComingSoon from "./Index";
import Header from "../../../components/header";

const LayOutComingSoon = () => {
  const { light } = useLightMode();
  const [totalNewComic, setTotalNewComic] = useState(0);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(
          "https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat"
        );
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (!data.data || !data.data.params) {
          throw new Error("Dữ liệu không hợp lệ từ API");
        }
        const { pagination } = data.data.params;
        setTotalNewComic(pagination.totalItems);
        const { titlePage } = data.data;
        setTitle(titlePage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, []);
  return (
    <div className={`${light ? "bg-[#18191a]" : "bg-white"} h-auto w-auto`}>
      <Header />
      <div className="flex gap-[32px] w-[1124px] mx-auto pb-10">
        <div className="flex-shrink-0">
          <AppSlide />
        </div>
        <div className="flex-1 mb-[2rem] mt-5">
          <div
            className={`${
              light
                ? "bg-[#494949] border-2 border-[#636363]"
                : "bg-[#dbf5ec] border-2 border-[#1ab382]"
            } rounded-lg py-2 font-bold`}
          >
            <h1
              className={`text-2xl text-center ${
                light ? "text-white" : "text-[#1ab382]"
              }`}
            >
              <i className="fa-solid fa-book-open"></i> {title} ({totalNewComic}
              truyện)
            </h1>
          </div>
          <ListComingSoon />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayOutComingSoon;
