import { Link, useLocation } from "react-router-dom";
import { useLightMode } from "../../components/LightDart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LayoutSearch = () => {
  const { light } = useLightMode();
  const [searchResults, setSearchResults] = useState({ items: [], params: [] });
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(parseInt(0) || 1);
  const itemsPerPage = 24;
  const [totalSearch, setTotalSearch] = useState(0);
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const keyword = query.get("keyword");

    if (keyword) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `https://otruyenapi.com/v1/api/tim-kiem?keyword=${keyword}`
          );
          if (!response.ok) {
            toast.error("Không thể kết nối đến API");
          }
          const data = await response.json();
          if (!data.data || !data.data.items) {
            toast.error("Dữ liệu không hợp lệ từ API");
          }
          const { items, params } = data.data;
          const { pagination } = data.data.params;
          setTotalSearch(pagination.totalItems);
          setSearchResults({ items, params });
        } catch (error) {
          toast.error("Lỗi");
        }
      };
      fetchSearchResults();
    }
  }, [location.search, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.items.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(searchResults.items.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const renderPagination = () => {
    const totalPages = Math.ceil(totalSearch / itemsPerPage);
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
    <div className="pt-5 pb-10">
      <div
        className={`${
          light
            ? "bg-[#494949] border-2 border-[#636363]"
            : "bg-[#dbf5ec] border-2 border-[#1ab382]"
        } rounded-lg py-2 font-bold`}
      >
        <h1
          className={`text-2xl px-3 ${light ? "text-white" : "text-[#1ab382]"}`}
        >
          Tìm kiếm được {totalSearch} truyện phù hợp cho từ khoá ''
          {searchResults.params.keyword}''
        </h1>
      </div>
      <div
        className={`grid grid-cols-8 gap-y-10 gap-x-5 mt-5 ${
          light ? "text-white" : "text-black"
        }`}
      >
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.slug}
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
          <div
            className={`w-full mt-3 ${
              light ? "bg-[#242526]" : "bg-white"
            } py-4 rounded-md ps-5`}
          >
            <p className="text-[#4a4a4a] text-sm">
              Xin lỗi, không tìm thấy kết quả nào!!
            </p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-[50%] border border-[#e2e2e2] ${
                currentPage === index + 1
                  ? "bg-[#f18121] text-white"
                  : "bg-transparent text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
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
          {currentPage < Math.ceil(totalSearch / itemsPerPage) && (
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
                  handlePageChange(Math.ceil(totalSearch / itemsPerPage))
                }
              >
                <i className="fa-solid fa-angles-right"></i>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LayoutSearch;
