import React, { useEffect, useState } from "react";
import { useLightMode } from "../../components/LightDart";
import ButtonCategoryDescribe from "./components/button";
import IfComic from "./components/ifDescribe";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const LayoutDescribeComic = () => {
  const { light } = useLightMode();
  const { slug } = useParams();
  const [comicData, setComicData] = useState({ seoOnPage: {}, item: {} });
  const [chapters, setChapters] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [categoryData, setCategoryData] = useState({ items: [] });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      // Check localStorage
      const savedStories =
        JSON.parse(localStorage.getItem("savedStories")) || [];
      const isStorySaved = savedStories.includes(slug);

      // Check Firestore
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const isFirestoreSaved = querySnapshot.docs.some(
          (doc) => doc.data().slug === slug
        );

        setIsSaved(isStorySaved || isFirestoreSaved);
      } catch (error) {
        console.error("Error checking save status: ", error);
      }
    };

    checkSavedStatus();
  }, [slug]);

  const handleSave = async () => {
    try {
      // Save to Firestore
      await addDoc(collection(db, "stories"), { slug });

      // Update localStorage
      const savedStories =
        JSON.parse(localStorage.getItem("savedStories")) || [];
      if (!savedStories.includes(slug)) {
        savedStories.push(slug);
        localStorage.setItem("savedStories", JSON.stringify(savedStories));
      }

      setIsSaved(true);
      toast.success("Lưu truyện thành công");
    } catch (error) {
      console.error("Error saving story: ", error);
      alert("Failed to save story: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete from Firestore
      const querySnapshot = await getDocs(collection(db, "stories"));
      const storyToDelete = querySnapshot.docs.find(
        (doc) => doc.data().slug === slug
      );
      if (storyToDelete) {
        await deleteDoc(doc(db, "stories", storyToDelete.id));
      }

      // Update localStorage
      const savedStories =
        JSON.parse(localStorage.getItem("savedStories")) || [];
      const updatedStories = savedStories.filter(
        (storySlug) => storySlug !== slug
      );
      localStorage.setItem("savedStories", JSON.stringify(updatedStories));

      setIsSaved(false);
      toast.success("Xóa truyện thành công");
    } catch (error) {
      console.error("Error deleting story: ", error);
      alert("Failed to delete story: " + error.message);
    }
  };
  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Fetch comic data based on slug
  useEffect(() => {
    const fetchComicData = async () => {
      try {
        const response = await fetch(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
        );
        if (!response.ok) {
          throw new Error("Không thể kết nối đến API");
        }
        const data = await response.json();
        const { seoOnPage, item } = data.data;
        const cleanedContent = item.content.replace(/<\/?p>/g, "");
        setComicData({ seoOnPage, item: { ...item, content: cleanedContent } });
        const chapters = item.chapters.flatMap((chapter) =>
          chapter.server_data.map((data) => ({
            chapterName: data.chapter_name,
            chapterApiData: data.chapter_api_data.split("/").pop(),
          }))
        );
        const sortedChapters =
          sortOrder === "asc" ? chapters : chapters.reverse();
        setChapters(sortedChapters);
        if (item.category.length > 0) {
          fetchCategoryData(item.category[0].slug);
          setSelectedCategory(item.category[0].slug);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.log(error);
      }
    };
    fetchComicData();
  }, [slug, sortOrder]);

  const fetchCategoryData = async (selectedCategory) => {
    try {
      const response = await fetch(
        `https://otruyenapi.com/v1/api/the-loai/${selectedCategory}?page=1`
      );

      if (!response.ok) {
        throw new Error("Không thể kết nối đến API");
      }
      const data = await response.json();
      const items = data.data;
      setCategoryData(items);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categorySlug) => {
    if (categorySlug !== selectedCategory) {
      setSelectedCategory(categorySlug);
      fetchCategoryData(categorySlug);
    }
  };

  if (!comicData.item || !comicData.item.category || !comicData.item.chapters) {
    return <p>Đang tải...</p>;
  }

  const timeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} tháng ${month}, ${year}`;
  };

  return (
    <div className={`${light ? "bg-[#282828]" : "bg-[#ebebeb]"} rounded-lg`}>
      <div
        className={`${light ? "bg-[#494949]" : "bg-[#dbf5ec]"}  ${
          light ? "text-white" : "text-black"
        } rounded-lg`}
      >
        <div className="flex gap-x-10 pt-5 pb-5 px-5">
          <img
            src={`https://img.otruyenapi.com/uploads/comics/${comicData.item.thumb_url}`}
            className="rounded-lg w-[200px] h-[300px]"
            style={{ boxShadow: "0 0 8px 0 #757575" }}
            alt=""
          />
          <div>
            <p className="text-[28px] font-bold">{comicData.item.name}</p>
            <div className="flex gap-x-2 mt-2">
              {!isSaved ? (
                <button
                  className="bg-[#10b982] px-3 py-2 rounded-[5px] text-white hover:scale-[1.05] transition-all"
                  onClick={handleSave}
                >
                  <i className="fa-solid fa-bookmark me-2"></i>
                  <span className="font-bold">Lưu truyện</span>
                </button>
              ) : (
                <button
                  className="bg-[#e74c3c] px-3 py-2 rounded-[5px] text-white hover:scale-[1.05] transition-all"
                  onClick={handleDelete}
                >
                  <i className="fa-solid fa-trash me-2"></i>
                  <span className="font-bold">Xóa truyện</span>
                </button>
              )}
              <button className="bg-[#209cee] px-3 py-2 rounded-[5px] text-white hover:scale-[1.05] transition-all">
                <i className="fa-regular fa-eye me-2"></i>
                <span className="font-bold">Đọc tiếp</span>
              </button>
            </div>
            <IfComic
              status="Tác Giả:"
              name={
                comicData.item.author === ""
                  ? "Đang cập nhật"
                  : comicData.item.author
              }
            ></IfComic>
            <IfComic
              status="Ngày cập nhật:"
              name={timeAgo(comicData.item.updatedAt)}
            ></IfComic>
            <div className="flex items-center mt-3 gap-2 flex-wrap">
              <span className="text-[#10b982] text-lg font-bold me-2">
                Thể loại:
              </span>
              {comicData.item.category.map((item, index) => (
                <Link
                  to="/"
                  key={index}
                  className=" hover:scale-[1.09] transition-all"
                >
                  <ButtonCategoryDescribe>{item.name}</ButtonCategoryDescribe>
                </Link>
              ))}
            </div>
            <div className="my-3">
              <p className="text-[#10b982] font-bold text-lg">Nội dung:</p>
              <p className="mt-2">{comicData.item.content}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex gap-2 pt-10 justify-between  bg-transparent items-center ${
          light ? "text-white" : "text-black bg-white"
        }`}
      >
        <div
          className={`flex gap-x-2  bg-transparent items-center ${
            light ? "text-white" : "text-black bg-white"
          }`}
        >
          <i className="fa-regular fa-rectangle-list text-2xl"></i>
          <span className="text-2xl">Danh sách chương</span>
        </div>
        <div
          className="w-10 h-10 bg-[#10b982] rounded-md flex justify-center items-center text-white hover:scale-[1.05] transition-all cursor-pointer"
          onClick={handleSortChange}
        >
          <i
            className={`${
              sortOrder === "asc"
                ? "fa-solid fa-arrow-up-1-9 text-xl"
                : "fa-solid fa-arrow-down-1-9 text-xl"
            }`}
          ></i>
        </div>
      </div>
      <div
        className={`text-[#10b982] py-5 font-semibold ${
          light ? "bg-transparent" : "bg-white"
        }`}
      >
        Gợi ý: Bạn có thể cuộn con lăn chuột để chọn chương
      </div>
      <div
        className={`relative  ${
          light ? "text-white bg-transparent" : "text-black bg-white z-0"
        }`}
      >
        <i className="fa fa-search absolute left-3 top-[50%] translate-y-[-50%]"></i>
        <input
          type="text"
          placeholder="Nhập số chương cần tìm..."
          className="w-full outline-none py-2 px-10 rounded-md bg-transparent border-2 border-[#cccccc]"
        />
      </div>
      <div
        className={`pt-5 flex gap-5 ${
          light ? "text-white bg-transparent" : "text-black bg-white"
        } `}
      >
        <div className="font-medium">Chú thích:</div>
        <div className="bg-[#10b982] w-10 h-5 rounded-md"></div>
        <div>Chưa đọc</div>
        <div className="bg-[#178e68] w-10 h-5 rounded-md"></div>
        <div>Đã đọc</div>
      </div>
      <div
        className={`grid grid-cols-5 gap-x-4 gap-y-3 px-1 pt-3 ${
          light ? "bg-transparent" : "bg-white"
        }  ${!showAll ? "max-h-[360px] overflow-hidden" : ""}`}
      >
        {chapters.map((chapter, index) => (
          <Link
            key={index}
            to={{
              pathname: `/chapter/${slug}/${chapter.chapterApiData}`,
              state: {
                chapterApiData: chapter.chapterApiData,
                comicSlug: slug,
              },
            }}
            className="bg-[#10b982] text-center rounded-[8px] py-[4px] px-[12px] text-white hover:scale-[1.05] transition-all block"
          >
            {chapter.chapterName}
          </Link>
        ))}
      </div>
      {chapters.length * 40 > 360 && (
        <button
          className={`text-[#10b982] ${
            light ? "bg-transparent" : "bg-white"
          } text-lg font-semibold py-1 px-4 rounded w-full flex justify-center items-center gap-x-2`}
          onClick={handleToggleShowAll}
        >
          <span>
            {showAll ? (
              <div className="flex gap-x-2 items-center">
                <span>Thu gọn</span>
                <i className="fa-solid fa-chevron-up"></i>
              </div>
            ) : (
              <div>
                <span>Xem thêm</span>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            )}
          </span>
        </button>
      )}
      <div
        className={`text-3xl pt-10 text-center font-bold ${
          light ? "bg-transparent text-white" : "bg-white text-black"
        }`}
      >
        <i className="fa-solid fa-wand-magic-sparkles"></i> Gợi ý dành cho bạn
      </div>
      <div
        className={`pt-5 pb-10 flex gap-x-2 justify-center flex-wrap ${
          light ? "bg-transparent" : "bg-white"
        }`}
      >
        {comicData.item.category.map((item) => (
          <button
            className="text-white px-2 py-1 bg-[#3360a4] rounded-md"
            key={item.id}
            onClick={() => handleCategorySelect(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div
        className={`flex justify-between items-center ${
          light
            ? "bg-[#494949] border-[#5c5c5c] text-white rounded-md"
            : "bg-[#dbf5ec] border-[#10b982] text-[#10b982] rounded-md"
        } border-2  px-2 py-2 text-xl font-bold`}
      >
        {categoryData && (
          <div className="flex items-center gap-x-2">
            <i className="fa-solid fa-book-open"></i>
            <p>{categoryData.titlePage}</p>
          </div>
        )}
        <div className="flex items-center gap-x-2">
          Xem thêm <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div
        className={`grid grid-cols-8 gap-y-7 gap-x-5 pt-5 ${
          light ? "text-white bg-transparent" : "text-black bg-white"
        }`}
      >
        {categoryData.items ? (
          categoryData.items.map((item, index) => (
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
              <h2 className="mt-2">
                <Link
                  to={`/truyen-tranh/${item.slug}`}
                  className="font-semibold line-clamp-3"
                >
                  {item.name}
                </Link>
              </h2>
            </div>
          ))
        ) : (
          <p>Không có danh mục nào được tìm thấy.</p>
        )}
      </div>
    </div>
  );
};

export default LayoutDescribeComic;
