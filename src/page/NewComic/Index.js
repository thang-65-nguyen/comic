import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLightMode } from "../../components/LightDart";

const ListNewComic = () => {
  const [seoData, setSeoData] = useState({ items: [] });
  const { light } = useLightMode();
  const [currentPage, setCurrentPage] = useState(parseInt(0) || 1);
  const navigate = useNavigate();
  const [totalNewComic, setTotalNewComic] = useState(0);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(
          `https://otruyenapi.com/v1/api/danh-sach/truyen-moi`
        );
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (!data.data || !data.data.seoOnPage) {
          throw new Error("Dữ liệu không hợp lệ từ API");
        }
        const { seoOnPage, items } = data.data;
        const { pagination } = data.data.params;
        setTotalNewComic(pagination.totalItems);
        setSeoData({ seoOnPage, items });
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, [currentPage]); // Thêm currentPage vào dependency array

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/new-comic/trang-${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalNewComic / itemsPerPage);
    const pagesToShow = 10;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = startPage + pagesToShow - 1;

    endPage = Math.min(endPage, totalPages);

    startPage = Math.max(1, endPage - pagesToShow + 1);

    const paginationItems = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`border border-[#d9d9d9] text-[#060004] rounded-md w-10 h-10 flex justify-center font-semibold items-center cursor-pointer ${
            currentPage === i ? "bg-[#cccccc]" : "bg-white"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <>
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
              <div className="relative">
                <Link to={`/truyen-tranh/${item.slug}`}>
                  <img
                    src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                    className="w-[200px] h-[258.667px] object-cover rounded-md"
                    alt={item.name}
                  />
                </Link>
              </div>
              <h2 className="mt-2 line-clamp-2">
                <Link
                  to={`/truyen-tranh/${item.slug}`}
                  className="font-semibold"
                >
                  {item.name}
                </Link>
              </h2>
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
      <div className="flex justify-center pt-5 pb-16">
        <ul className="flex justify-center gap-2">
          {currentPage > 1 && (
            <>
              <li
                className="border border-[#d9d9d9] bg-white text-[#060004] rounded-md w-10 h-10 justify-center text-[12px] flex items-center cursor-pointer"
                onClick={() => handlePageChange(1)}
              >
                <i className="fa-solid fa-angles-left"></i>
              </li>
              <li
                className="border border-[#d9d9d9] bg-white text-[#060004] rounded-md w-10 h-10 justify-center text-[12px] flex items-center cursor-pointer"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </li>
            </>
          )}
          {renderPagination()}
          {currentPage < Math.ceil(totalNewComic / itemsPerPage) && (
            <>
              <li
                className="border border-[#d9d9d9] bg-white text-[#060004] cursor-pointer rounded-md w-10 h-10 justify-center text-[12px] flex items-center"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                className="border border-[#d9d9d9] bg-white text-[#060004] cursor-pointer rounded-md w-10 h-10 justify-center text-[12px] flex items-center"
                onClick={() =>
                  handlePageChange(Math.ceil(totalNewComic / itemsPerPage))
                }
              >
                <i className="fa-solid fa-angles-right"></i>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default ListNewComic;
