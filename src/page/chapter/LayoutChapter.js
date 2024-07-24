import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import AppSlide from "../slide";
import Footer from "../../components/footer";
import { useLightMode } from "../../components/LightDart";
import ChapterComic from "./ChapterComic";

const LayoutChapter = () => {
  const { light } = useLightMode();
  const appSlideRef = useRef(null);
  const layoutDescribeComicRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const top = () => {
    window.scrollTo(0, 0);
  };
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
    <div className={`${light ? "bg-[#282828]" : "bg-white"} min-h-[100vh]`}>
      <Header />
      <div className="w-[1124px] h-auto mx-auto">
        <div className="flex gap-[32px] pb-10">
          <div
            className={`flex-shrink-0 ${isSticky ? "sticky top-0" : ""}`}
            ref={appSlideRef}
          >
            <AppSlide />
          </div>
          <div className="flex-1 mb-[2rem] mt-6" ref={layoutDescribeComicRef}>
            <ChapterComic />
          </div>
        </div>
        <Footer />
      </div>
      {showScrollToTop && (
        <div className="sticky w-[1140px] mx-auto bottom-4 left-[69px]">
          <button
            onClick={top}
            className="bg-[#10b881] px-4 py-[10px] rounded-md cursor-pointer hover:scale-[1.05] transition-all"
          >
            <i className="fa-solid fa-arrow-up text-white"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default LayoutChapter;
