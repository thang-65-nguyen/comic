import React, { useEffect, useState } from "react";
import { useLightMode } from "../../components/LightDart";
import { Link } from "react-router-dom";

const ListComicHome = ({ apiEndpoint, to }) => {
  const [seoData, setSeoData] = useState({ items: [] });

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (!data.data) {
          throw new Error("Dữ liệu không hợp lệ từ API");
        }
        const items = data.data;
        setSeoData(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, [apiEndpoint]);

  const { light } = useLightMode();

  return (
    <>
      <div
        className={`flex justify-between items-center ${
          light
            ? "bg-[#494949] border-[#5c5c5c] text-white"
            : "bg-[#dbf5ec] border-[#10b982] text-[#10b982]"
        } border-2  px-2 py-2 rounded-md text-xl font-bold`}
      >
        {seoData && (
          <div className="flex items-center gap-x-2">
            <i className="fa-solid fa-book-open"></i>
            <p>{seoData.titlePage}</p>
          </div>
        )}
        <Link
          to={to}
          className="block font-[600] transition-all hover:underline group lg:text-lg mobile:text-base whitespace-nowrap"
        >
          Xem thêm
          <i className="ml-[4px] group-hover:translate-x-[2px] transition-all fa-solid fa-angle-right"></i>
        </Link>
      </div>
      <div
        className={`grid grid-cols-8 gap-y-10 gap-x-5 mt-5 ${
          light ? "text-white" : "text-black"
        }`}
      >
        {seoData.items.length > 0 ? (
          seoData.items.map((item,index) => (
            <div
              key={index}
              className="transition-transform duration-500 ease-in-out hover:-translate-y-2"
            >
              <div className="relative z-0">
                <Link to={`/truyen-tranh/${item.slug}`}>
                  <img
                    src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                    className="w-[200px] h-[258.667px] object-cover rounded-md"
                    alt={item.name}
                  />
                </Link>
              </div>
              <Link to={`/truyen-tranh/${item.slug}`} className="font-semibold">
                <h2 className="mt-2 line-clamp-2">{item.name}</h2>
              </Link>
              <ul className="chapter-list">
                {item.chaptersLatest && item.chaptersLatest.length > 0 ? (
                  item.chaptersLatest.map((chapter) => {
                    const chapterId = chapter.chapter_api_data.split("/").pop();
                    return (
                      <li key={chapterId}>
                        <Link to={`/chapter/${item.slug}/${chapterId}`}>
                          Chương {chapter.chapter_name}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>Không có thông tin chapter.</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p>Không có dữ liệu truyện tranh.</p>
        )}
      </div>
    </>
  );
};

export default ListComicHome;
