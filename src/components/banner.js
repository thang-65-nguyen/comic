import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useLightMode } from "./LightDart";

const Banner = () => {
  const [banner, setBanner] = useState({ items: [] });
  const [visibleBannerIndex, setVisibleBannerIndex] = useState(0);
  const { light } = useLightMode();

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch("https://otruyenapi.com/v1/api/home");
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (!data.data || !data.data.seoOnPage) {
          throw new Error("Dữ liệu không hợp lệ từ API");
        }
        const { seoOnPage, items } = data.data;
        setBanner({ seoOnPage, items: items.slice(0, 10) }); // Chỉ lấy 10 mục mới nhất
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, []);

  const showNextBanner = () => {
    setVisibleBannerIndex((prevIndex) =>
      banner.items.length > 0 ? (prevIndex + 1) % banner.items.length : 0
    );
  };

  const showPrevBanner = () => {
    setVisibleBannerIndex((prevIndex) =>
      prevIndex === 0 ? banner.items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (banner.items.length > 0) {
      const intervalId = setInterval(showNextBanner, 5000);
      return () => clearInterval(intervalId);
    }
  }, [banner.items]);

  return (
    <div className="overflow-hidden mb-3 w-full relative">
      {banner.items.length > 0 ? (
        banner.items.map((item, index) => (
          <div
            key={item.slug} 
            className={`w-full relative h-full cursor-pointer ${
              index === visibleBannerIndex ? "block" : "hidden"
            }`}
          >
            <div>
              <img
                src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                alt={item.name}
                className="h-[318px] w-[1084px] object-cover rounded-lg opacity-50"
              />
            </div>
            <div className="absolute text-white items-center top-0 left-[64px] flex bottom-0 gap-x-7 z-50">
              <img
                src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                alt={item.name}
                className="h-[250px] w-[180px] object-cover rounded-lg"
              />
              <div>
                {item.chaptersLatest && item.chaptersLatest.length > 0 ? (
                  item.chaptersLatest.map((chapter) => (
                    <div
                      key={chapter.chapter_api_data}
                      className="text-3xl font-semibold text-white"
                      style={{ textShadow: "2px 2px rgba(0,0,0, .502)" }}
                    >
                      Chương {chapter.chapter_name}
                    </div>
                  ))
                ) : (
                  <div className="text-3xl font-semibold text-white">
                    Truyện đang gặp lỗi
                  </div>
                )}
                <div
                  className="text-[32px] font-semibold text-[#10b981] my-[12px] whitespace-nowrap text-ellipsis overflow-hidden w-[720px]"
                  style={{ textShadow: "2px 2px rgba(0,0,0, .502)" }}
                >
                  {item.name}
                </div>
                <div className="my-[5px] flex gap-x-2 flex-wrap gap-y-2 w-[720px]">
                  {item.category.map((category) => (
                    <div
                      key={category.name} 
                      className="font-bold border-2 inline-block px-2 py-1 border-white rounded-lg hover:border-[#10b982] hover:text-[#10b982] hover:duration-500"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
                <div className="flex gap-x-2 my-[12px]">
                  {item.chaptersLatest && item.chaptersLatest.length > 0 ? (
                    item.chaptersLatest.map((chapter) => {
                      const chapterId = chapter.chapter_api_data
                        .split("/")
                        .pop();
                      return (
                        <Link
                          to={`/chapter/${item.slug}/${chapterId}`}
                          key={chapterId}
                        >
                          <button className="px-3 py-2 bg-[#10b982] rounded-lg hover:scale-[1.09] transition-all">
                            <i className="fa-solid fa-eye"></i> Đọc ngay
                          </button>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-3xl font-semibold text-white">
                      Truyện đang gặp lỗi
                    </div>
                  )}
                  <Link to={`/truyen-tranh/${item.slug}`}>
                    <button className="px-3 py-2 bg-white text-black rounded-lg hover:scale-[1.09] transition-all">
                      <i className="fa-solid fa-circle-info"></i> Chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-white">Không có dữ liệu</p>
      )}
      <div className="flex absolute bottom-5 right-5 gap-x-2 z-50">
        <button
          onClick={showPrevBanner}
          className={`px-4 rounded-md py-2 transform ${
            light
              ? "bg-[#3f3f3f] hover:bg-[#272727]"
              : "bg-[#10b881] hover:bg-[#dbf5ec]"
          } text-white hover:bg-opacity-75 flex items-center justify-center`}
        >
          <i className="fa-solid fa-angle-left text-xl"></i>
        </button>
        <button
          onClick={showNextBanner}
          className={`px-4 rounded-md py-2 transform ${
            light
              ? "bg-[#3f3f3f] hover:bg-[#272727]"
              : "bg-[#10b881] hover:bg-[#dbf5ec]"
          } text-white hover:bg-opacity-75 flex items-center justify-center`}
        >
          <i className="fa-solid fa-angle-right text-xl"></i>
        </button>
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
        {banner.items.map((_, index) => (
          <div
            key={index}
            className={`w-10 h-3 rounded-md cursor-pointer ${
              index === visibleBannerIndex ? "bg-[#10b981]" : "bg-[#ffffff50]"
            }`}
            onClick={() => setVisibleBannerIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
