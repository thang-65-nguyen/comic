import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLightMode } from "../../components/LightDart";

const ChapterComic = () => {
  const { light } = useLightMode();
  const [chapterData, setChapterData] = useState(null);
  const [error, setError] = useState(null);
  const { chapterApiData, comicSlug } = useParams();
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();
  const [toolBox, setToolBox] = useState(false);
  const toolBoxRef = useRef(null);
  const HandleClickTBRef = (e) => {
    if (toolBoxRef.current && !toolBoxRef.current.contains(e.target)) {
      setToolBox(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", HandleClickTBRef);
    return () => {
      document.removeEventListener("mousedown", HandleClickTBRef);
    };
  }, []);
  const handleToolBox = () => {
    setToolBox((prev) => !prev);
  };
  const top = () => {
    window.scrollTo(0, 0);
  };
  const bottom = () => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  };
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const chapterId = chapterApiData.split("/").pop();
        const response = await fetch(
          `https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`
        );
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (data.data && data.data.item) {
          setChapterData(data.data.item);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchChaptersList = async () => {
      try {
        const response = await fetch(
          `https://otruyenapi.com/v1/api/truyen-tranh/${comicSlug}`
        );
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        if (data.data && data.data.item && data.data.item.chapters) {
          const serverData = data.data.item.chapters.flatMap((chapter) =>
            chapter.server_data.map((data) => ({
              chapterName: data.chapter_name,
              chapterApiData: data.chapter_api_data.split("/").pop(),
            }))
          );
          setChapters(serverData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    Promise.all([fetchChapterData(), fetchChaptersList()]);
  }, [chapterApiData, comicSlug]);

  const getNextChapter = () => {
    const currentIndex = chapters.findIndex(
      (chapter) => chapter.chapterApiData === chapterApiData
    );
    if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
      return chapters[currentIndex + 1].chapterApiData;
    }
    return null;
  };
  const handleChapterChange = (e) => {
    const selectedChapterApiData = e.target.value;
    navigate(`/chapter/${comicSlug}/${selectedChapterApiData}`);
    setToolBox(false); // Đóng hộp công cụ khi người dùng chọn chương
  };
  const getPreviousChapter = () => {
    const currentIndex = chapters.findIndex(
      (chapter) => chapter.chapterApiData === chapterApiData
    );
    if (currentIndex > 0) {
      return chapters[currentIndex - 1].chapterApiData;
    }
    return null;
  };

  const handleNextChapter = () => {
    const nextChapterApiData = getNextChapter();
    if (nextChapterApiData) {
      navigate(`/chapter/${comicSlug}/${nextChapterApiData}`);
    }
  };

  const handlePreviousChapter = () => {
    const previousChapterApiData = getPreviousChapter();
    if (previousChapterApiData) {
      navigate(`/chapter/${comicSlug}/${previousChapterApiData}`);
    }
  };

  const nextChapterExists = getNextChapter() !== null;
  const prevChapterExists = getPreviousChapter() !== null;

  if (error) {
    return <p>Có lỗi xảy ra: {error}</p>;
  }

  if (!chapterData) {
    return <p className="text-center">Đang tải dữ liệu chương...</p>;
  }

  return (
    <div className="pb-0 overflow-hidden w-full">
      <div
        className={`${light ? "bg-[#494949]" : "bg-[#dbf5ec]"} ${
          light ? "text-white" : "text-black"
        } rounded-md px-7 pb-8`}
      >
        <div className="pt-4">
          <p className="text-center">
            <span className="font-bold me-2 text-2xl">
              {chapterData.comic_name.replace(/\[.*?\]/g, "")} - Chapter{" "}
              {chapterData.chapter_name}
            </span>
          </p>
        </div>
        <div
          className={`${
            light ? "bg-[#d9edf7] text-[#31708f]" : "bg-[#10b881] text-white"
          }  py-3 my-3 rounded-lg`}
        >
          <p className="text-center font-bold">
            Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chương
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={handlePreviousChapter}
            disabled={!prevChapterExists}
            className={`flex gap-x-2 items-center px-3 py-2 rounded-tl-md rounded-bl-md text-white ${
              prevChapterExists
                ? "bg-[#10b881]"
                : "bg-[#7ad7b8] cursor-not-allowed"
            }`}
          >
            <i className="fa-solid fa-chevron-left"></i>
            Chương trước
          </button>

          <button
            onClick={handleNextChapter}
            disabled={!nextChapterExists}
            className={`flex gap-x-2 items-center px-3 py-2 rounded-tr-md rounded-br-md text-white ${
              nextChapterExists
                ? "bg-[#10b881]"
                : "bg-[#7ad7b8] cursor-not-allowed"
            }`}
          >
            Chương sau
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="flex mt-8 justify-center">
        <div className="block">
          {chapterData.chapter_image.map((image, index) => (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              key={index}
              src={`https://sv1.otruyencdn.com/${chapterData.chapter_path}/${image.image_file}`}
              className="w-[800px]"
              alt={`Chapter ${chapterData.chapter_name} Image ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <div
        className="fixed bottom-8 right-8 cursor-pointer"
        // onClick={handleToolBox}
      >
        {toolBox ? (
          <div className="bg-[#10b982] opacity-0 text-white px-4 py-2 rounded-md flex gap-x-2 items-center text-lg font-semibold">
            <i class="fa-solid fa-screwdriver-wrench"></i> Hộp công cụ
          </div>
        ) : (
          <div
            className="bg-[#10b982] text-white px-4 py-2 rounded-md flex gap-x-2 items-center text-lg font-semibold cursor-pointer"
            onClick={handleToolBox}
          >
            <i class="fa-solid fa-screwdriver-wrench"></i> Hộp công cụ
          </div>
        )}
        {toolBox && (
          <div
            className={`${
              light ? "bg-[rgba(204,204,204,.2)]" : "bg-[rgba(16,185,129,0.15)]"
            } rounded-md py-4 px-4`}
            ref={toolBoxRef}
          >
            <select
              className="bg-[#10b982] w-full px-8 py-2 mb-2 rounded-md text-white font-semibold text-center outline-none"
              onChange={handleChapterChange}
              value={chapterApiData}
            >
              {chapters.map((chapter) => (
                <option
                  key={chapter.chapterApiData}
                  value={chapter.chapterApiData}
                  className="bg-[#10b982] hover:bg-[#0e8e66] cursor-pointer px-8 py-2 mb-2 rounded-md text-white font-semibold text-center transition-all"
                >
                  Chương {chapter.chapterName}
                </option>
              ))}
            </select>
            <div
              onClick={handlePreviousChapter}
              disabled={!prevChapterExists}
              className={`${
                prevChapterExists
                  ? "bg-[#10b881] hover:scale-[1.05]"
                  : "bg-[#7ad7b8] cursor-not-allowed"
              } flex gap-x-2 items-center justify-center px-8 py-2 mb-2 rounded-md text-white font-semibold text-center transition-all`}
            >
              <i className="fa-solid fa-chevron-left"></i> Chương trước
            </div>
            <div
              onClick={handleNextChapter}
              disabled={!nextChapterExists}
              className={`${
                nextChapterExists
                  ? "bg-[#10b881] hover:scale-[1.05]"
                  : "bg-[#7ad7b8] cursor-not-allowed"
              } flex gap-x-2 items-center justify-center px-8 py-2 mb-2 rounded-md text-white font-semibold text-center transition-all`}
            >
              Chương sau <i className="fa-solid fa-chevron-right"></i>
            </div>
            <div className="bg-[#10b982] flex gap-x-2 items-center justify-center px-8 py-2 mb-2 rounded-md text-white font-semibold text-center hover:scale-[1.05] transition-all">
              <i className="fa-solid fa-comment-dots"></i> Bình luận
            </div>
            <div className="bg-[#10b982] flex gap-x-2 items-center justify-center px-8 py-2 mb-2 rounded-md text-white font-semibold text-center hover:scale-[1.05] transition-all">
              <i className="fa-solid fa-robot"></i> Tự động cuộn
            </div>
            <div
              className="bg-[#10b982] flex gap-x-2 items-center justify-center py-2 px-8 rounded-md text-white font-semibold mb-2 cursor-pointer hover:scale-[1.05] transition-all"
              onClick={top}
            >
              <i className="fa-solid fa-arrow-up"></i>
              Cuộn đầu trang
            </div>
            <div
              className="bg-[#10b982] flex gap-x-2 items-center px-8 py-2 justify-center rounded-md text-white font-semibold text-center cursor-pointer hover:scale-[1.05] transition-all"
              onClick={bottom}
            >
              <i className="fa-solid fa-arrow-down"></i> Cuộn cuối trang
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterComic;
