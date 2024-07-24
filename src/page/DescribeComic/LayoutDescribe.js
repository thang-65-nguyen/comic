import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import AppSlide from "../slide";
import LayoutDescribeComic from "./layouts";
import Footer from "../../components/footer";
import { useLightMode } from "../../components/LightDart";

const LayoutDescribe = () => {
  const { light } = useLightMode();
  const appSlideRef = useRef(null);
  const layoutDescribeComicRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const appSlideBottom = appSlideRef.current.getBoundingClientRect().bottom;
    const layoutDescribeComicTop =
      layoutDescribeComicRef.current.getBoundingClientRect().top;
    if (appSlideBottom >= layoutDescribeComicTop) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${light ? "bg-[#282828]" : "bg-white"}`}>
      <Header />
      <div className="w-[1124px] h-auto mx-auto">
        <div className="flex gap-[32px] pb-10">
          <div
            className={`flex-shrink-0 z-10 ${isSticky ? "sticky top-0" : ""}`}
            ref={appSlideRef}
          >
            <AppSlide />
          </div>
          <div className="flex-1 mb-[2rem] mt-6" ref={layoutDescribeComicRef}>
            <LayoutDescribeComic />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutDescribe;
