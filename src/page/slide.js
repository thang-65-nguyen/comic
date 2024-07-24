import React, { useEffect, useState } from "react";
import { useLightMode } from "../components/LightDart";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const AppSlide = () => {
  const { light } = useLightMode();
  const location = useLocation();

  const [storiesCount, setStoriesCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [hasNewData, setHasNewData] = useState(false);
  const [category, setCategory] = useState(false);
  const [dataCategory, setDataCategory] = useState({ items: [] });
  const handleCategory = () => {
    setCategory(!category);
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    let bgColor = "";
    let textColor = light ? "text-white" : "text-black";

    if (isActive) {
      bgColor = light ? "bg-[#494949]" : "bg-[#e7ebee] ";
      textColor = light ? "text-white" : "text-black";
    }

    return `${bgColor} ${textColor} text-center relative rounded-2xl py-4 px-2 mt-2 cursor-pointer ${
      light ? "hover:bg-[#494949]" : "hover:bg-[#e7ebee]"
    }`;
  };
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch("https://otruyenapi.com/v1/api/the-loai");
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (!data.data) {
          throw new Error("Dữ liệu không hợp lệ từ API");
        }
        const items = data.data;
        setDataCategory(items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiData();
  }, []);
  useEffect(() => {
    const fetchStoriesCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const count = querySnapshot.size;
        setStoriesCount(count);

        setHasNewData(count > 0);
      } catch (error) {
        console.error("Error fetching stories count: ", error);
      }
    };

    fetchStoriesCount();
  }, []);
  // useEffect(() => {
  //   const fetchHistoryCount = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "history"));
  //       const count = querySnapshot.size;
  //       setHistoryCount(count);

  //       setHasNewData(count > 0);
  //     } catch (error) {
  //       console.error("Error fetching history count: ", error);
  //     }
  //   };

  //   fetchHistoryCount();
  // }, []);
  return (
    <div className="sticky top-[85px]">
      <Link to="/">
        <div className={getLinkClass("/")}>
          <i className="fa fa-house text-xl"></i>
          <p className="text-sm">Trang chủ</p>
        </div>
      </Link>
      <Link to="/new-comic/trang-1">
        <div className={getLinkClass("/new-comic/trang-1")}>
          <i className="fa-solid fa-rotate text-xl"></i>
          <p className="text-sm">Mới nhất</p>
        </div>
      </Link>
      <Link to="/archive">
        <div className={getLinkClass("/archive")}>
          <i className="fa-solid fa-bookmark text-xl"></i>
          <p className="text-sm">Kho lưu trữ</p>
          {storiesCount > 0 && (
            <div className="absolute top-[-4px] right-[-4px] flex items-center justify-center">
              {hasNewData && (
                <>
                  <span className="w-[20px] h-[20px] bg-[#10b9817a] rounded-full animate-ping"></span>
                  <span className="absolute rounded-full w-[20px] h-[20px] flex items-center shadow-sm justify-center bg-[#10b981] text-[#fff] text-xs">
                    {storiesCount}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </Link>
      <Link to="/history">
        <div className={getLinkClass("/history")}>
          <i className="fa-solid fa-clock-rotate-left text-xl"></i>
          <p className="text-sm">Lịch sử</p>
          {/* {historyCount > 0 && (
            <div className="absolute top-[-4px] right-[-4px] flex items-center justify-center">
              {hasNewData && (
                <>
                  <span className="w-[20px] h-[20px] bg-[#10b9817a] rounded-full animate-ping"></span>
                  <span className="absolute rounded-full w-[20px] h-[20px] flex items-center shadow-sm justify-center bg-[#10b981] text-[#fff] text-xs">
                    {historyCount}
                  </span>
                </>
              )}
            </div>
          )} */}
        </div>
      </Link>
      <div className={getLinkClass("/genre")} onClick={handleCategory}>
        <i className="fa-solid fa-book text-xl"></i>
        <p className="text-sm">Thể loại</p>
      </div>
      {category && (
        <div className="fixed top-0 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
          <div className="bg-white w-[100%] max-w-2xl pt-6 pb-2 rounded-lg shadow-lg">
            <div className="flex justify-between items-center px-[16px]">
              <h3 className="text-xl font-bold">Thể loại</h3>
              <button
                onClick={handleCategory}
                className="hover:bg-[#cccccc] w-11 h-11 rounded-full"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div
              className="mt-4 flex flex-wrap gap-[12px] p-[16px]"
              style={{ borderTop: "2px solid #f4f4f4" }}
            >
              {dataCategory.items.length > 0 ? (
                dataCategory.items.map((item, index) => (
                  <Link to={`/category/${item.slug}/trang-1`} key={index}>
                    <button className="px-2 py-2 hover:bg-[#10b881] hover:text-white rounded-md">
                      {item.name}
                    </button>
                  </Link>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSlide;
