import React, { useEffect, useState } from "react";
import { useLightMode } from "../../components/LightDart";
import { Link, useParams, useNavigate } from "react-router-dom";

const Index = () => {
  const { light } = useLightMode();
  const [seoData, setSeoData] = useState({ items: [] });
  const [error, setError] = useState(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(
          `https://otruyenapi.com/v1/api/danh-sach/truyen-moi/?sort_field=updatedAt&page=${currentPage}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (!data.data || !data.data.seoOnPage) {
          throw new Error("Dữ liệu không hợp lệ từ API");
        }
        const { seoOnPage, items } = data.data;
        setSeoData({ seoOnPage, items });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchApiData();
  }, [currentPage]); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/truyen-moi-cap-nhat/trang-${newPage}`);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };
  const filteredItems = seoData.items.filter((item) => {
    if (statusFilter === "all") {
      return true; // Hiển thị tất cả khi filter là "all"
    } else if (statusFilter === "ongoing") {
      return item.status === "ongoing";
    } else if (statusFilter === "complete") {
      return item.status === "complete";
    }
    return false;
  });
  const timeAgo = (updatedAt) => {
    const updatedAtDate = new Date(updatedAt);
    const now = new Date();
    const diffTime = Math.abs(now - updatedAtDate);
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} phút trước`;
    } else if (diffMinutes < 60 * 24) {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} giờ trước`;
    } else {
      const diffDays = Math.floor(diffMinutes / (60 * 24));
      return `${diffDays} ngày trước`;
    }
  };

  const renderPagination = () => {
    const pagesToShow = 5; // Number of pages to show
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = startPage + pagesToShow - 1;

    // Ensure endPage does not exceed total pages (temporary set to 924)
    endPage = Math.min(endPage, 924);

    // Ensure startPage is correctly rounded
    startPage = Math.max(1, endPage - pagesToShow + 1);

    const paginationItems = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`rounded-[50%] border border-[#e2e2e2] text-white px-4 block py-2 cursor-pointer ${
            currentPage === i ? "bg-[#f18121]" : ""
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
    <div className={`${light ? "bg-black" : "bg-[#ebebeb]"}`}>
      <div className="pt-5 h-auto mx-auto w-[1140px]">
        <h3 className="mt-4 text-xl text-[#56ccf2]">
          <i className="fa-solid fa-font-awesome"></i> Truyện Mới Cập Nhật
        </h3>
        <div
          className={`${light ? "bg-[#242526]" : "bg-white"} ${
            light ? "text-white" : "text-black"
          } rounded-md mt-4`}
          style={{
            boxShadow:
              "0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%)",
          }}
        >
          <div className="flex gap-3 items-center pt-7 px-5">
            <p className="text-[#d4d4d4] w-[8%]">Trình trạng</p>
            <button
              className={`px-4 py-2 rounded-md border border-[#e2e2e2] ${
                statusFilter === "all" ? "bg-[#f18121] text-white" : ""
              }`}
              onClick={() => handleStatusFilter("all")}
            >
              Tất cả
            </button>
            <button
              className={`px-4 py-2 rounded-md border border-[#e2e2e2] ${
                statusFilter === "ongoing" ? "bg-[#f18121] text-white" : ""
              }`}
              onClick={() => handleStatusFilter("ongoing")}
            >
              Đang tiến hành
            </button>
            <button
              className={`px-4 py-2 rounded-md border border-[#e2e2e2] ${
                statusFilter === "complete" ? "bg-[#f18121] text-white" : ""
              }`}
              onClick={() => handleStatusFilter("complete")}
            >
              Hoàn thành
            </button>
          </div>
          <div className="flex gap-3 items-center pt-2 pb-5 px-5">
            <p className="text-[#d4d4d4] w-[8%]">Quốc gia</p>
            <button className="px-4 py-2 rounded-md border border-[#e2e2e2]">
              Trung Quốc
            </button>
            <button className="px-4 py-2 rounded-md border border-[#e2e2e2]">
              Việt Nam
            </button>
            <button className="px-4 py-2 rounded-md border border-[#e2e2e2]">
              Hàn Quốc
            </button>
            <button className="px-4 py-2 rounded-md border border-[#e2e2e2]">
              Nhật Bản
            </button>
            <button className="px-4 py-2 rounded-md border border-[#e2e2e2]">
              Mỹ
            </button>
          </div>
        </div>
        {/* List Truyen moi */}
        <div
          className={`grid grid-cols-6 gap-y-10 gap-x-5 mt-5 px-3 ${
            light ? "text-white" : "text-black"
          }`}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._slug}>
                <div className="relative">
                  <Link to={`/truyen-tranh/${item.slug}`}>
                    <img
                      src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                      className="w-[200px] h-[200px] object-cover rounded-md"
                      alt={item.name}
                    />
                    <div className="flex absolute gap-1 top-2 left-2">
                      <span className="bg-[#56ccf2] text-[13px] py-1 px-2 rounded-md">
                        {timeAgo(item.updatedAt)}
                      </span>
                      <span className="bg-[#ff2853] text-[13px] py-1 px-2 rounded-md">
                        Hot
                      </span>
                    </div>
                  </Link>
                </div>
                <h2 className="mt-2 text-center text-ellipsis whitespace-nowrap overflow-hidden">
                  <Link to="">{item.name}</Link>
                </h2>
                <ul className="chapter-list">
                  {item.chaptersLatest && item.chaptersLatest.length > 0 ? (
                    item.chaptersLatest.map((chapter) => (
                      <li
                        key={chapter.chapter_api_data}
                        className="text-center"
                      >
                        <a href={chapter.chapter_api_data}>
                          Chương {chapter.chapter_name}
                        </a>
                      </li>
                    ))
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
        {/* Pagination */}
        <div className="flex justify-center pt-5 pb-16">
        <ul className="flex justify-center gap-2">
            {currentPage > 1 && (
                <>
                    <li className='rounded-[50%] border border-[#e2e2e2] text-white px-4 py-2 text-[12px] flex items-center' onClick={() => handlePageChange(1)} style={{ backgroundColor: currentPage === 1 ? '#f18121' : '' }}><i className="fa-solid fa-angles-left"></i></li>
                    <li className='rounded-[50%] border border-[#e2e2e2] text-white px-4 py-2 text-[12px] flex items-center' onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}><i className="fa-solid fa-chevron-left"></i></li>
                </>
            )}
            {renderPagination()}
            {currentPage < 924 && (
                <>
                    <li
                        className="rounded-[50%] border border-[#e2e2e2] text-white px-4 py-2 text-[12px] flex items-center"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                    <i className="fa-solid fa-chevron-right"></i>
                    </li>
                    <li
                        className="rounded-[50%] border border-[#e2e2e2] text-white px-4 py-2 text-[12px] flex items-center"
                        onClick={() => handlePageChange(Math.max(currentPage + 1, 5))}
                    >
                    <i className="fa-solid fa-angles-right"></i>
                    </li>
                </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
