import { collection, getDocs, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useLightMode } from "../../components/LightDart";

const IndexHistory = () => {
  const [stories, setStories] = useState([]);
  const [archives, setArchives] = useState([]);
  const { light } = useLightMode();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "history"));
        const storiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories: ", error);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const responses = await Promise.all(
          stories.map((story) =>
            fetch(
              `https://otruyenapi.com/v1/api/truyen-tranh/${story.comicSlug}`
            )
          )
        );

        const comicsData = await Promise.all(
          responses.map((response) => {
            if (!response.ok) {
              throw new Error("Không thể kết nối đến API");
            }
            return response.json();
          })
        );

        const cleanedData = comicsData.map((data) => {
          const { seoOnPage, item } = data.data;
          const cleanedContent = item.content.replace(/<\/?p>/g, "");
          return { seoOnPage, item: { ...item, content: cleanedContent } };
        });

        setArchives(cleanedData);
      } catch (error) {
        console.error("Error fetching comic data: ", error);
      }
    };

    if (stories.length > 0) {
      fetchComicsData();
    }
  }, [stories]);

  const handleDeleteAll = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "history"));
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      setStories([]);
      setArchives([]);
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  return (
    <>
      <div
        className={`flex justify-between items-center font-semibold ${
          light ? "text-white" : "text-black"
        }`}
      >
        {archives.length === 0 ? (
          <span className="text-2xl">
            <i className="fa-solid fa-clock-rotate-left"></i> Lịch sử xem trống!
          </span>
        ) : (
          <>
            <span className="text-2xl">
              <i className="fa-solid fa-clock-rotate-left"></i> Lịch sử đã xem (
              {archives.length})
            </span>
            <div
              className="bg-red-500 px-4 py-2 rounded-md text-white cursor-pointer"
              onClick={handleDeleteAll}
            >
              Xóa tất cả
            </div>
          </>
        )}
      </div>
      {archives.length > 0 && (
        <div
          className={`grid grid-cols-8 gap-y-10 gap-x-5 mt-5 ${
            light ? "text-white" : "text-black"
          }`}
        >
          {archives.map((archive, index) => (
            <div
              key={index}
              className="transition-transform duration-500 ease-in-out hover:-translate-y-2 hover:text-[#10b881]"
            >
              <div className="relative">
                <img
                  src={`https://img.otruyenapi.com/uploads/comics/${archive.item.thumb_url}`}
                  alt={archive.item.name}
                  className="w-[200px] h-[258.667px] object-cover rounded-md"
                />
                <Link
                  to={`/truyen-tranh/${archive.item.slug}`}
                  className="font-semibold"
                >
                  <span className="mt-2 line-clamp-2">{archive.item.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default IndexHistory;
