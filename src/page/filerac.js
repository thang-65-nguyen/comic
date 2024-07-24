import React from "react";

const filerac = () => {
    // const handleCommentSubmit = async (e) => {
    //     e.preventDefault();
    //     if (newComment.trim() === "" || !user) {
    //       return;
    //     }
    //     const commentData = {
    //       comicSlug: slug,
    //       userId: user.id,
    //       username: user.username,
    //       content: newComment,
    //       createdAt: new Date().toISOString(),
    //       likes: 0,
    //     };
    //     try {
    //       const docRef = await addDoc(collection(db, "comments"), commentData);
    //       setComments([...comments, { id: docRef.id, ...commentData }]);
    //       setNewComment("");
    //     } catch (error) {
    //       console.error("Error adding comment: ", error);
    //       setError("Error adding comment");
    //     }
    //   };
    //   const handleLikeComment = async (commentId) => {
    //     if (!user) {
    //       toast.error("Người dùng phải đăng nhập để thích một bình luận!!");
    //       return;
    //     }
    //     const likedComments =
    //       JSON.parse(localStorage.getItem("liked_comments")) || [];
    //     if (likedComments.includes(commentId)) {
    //       toast.warning("Bạn đã nhấn Thích bình luận này rồi!");
    //       return;
    //     }
    //     try {
    //       const commentRef = doc(db, "comments", commentId);
    //       await runTransaction(db, async (transaction) => {
    //         const commentDoc = await transaction.get(commentRef);
    //         if (!commentDoc.exists()) {
    //           throw new Error("Comment does not exist!");
    //         }
    //         const commentData = commentDoc.data();
    //         let newLikes = commentData.likes + 1;
    //         transaction.update(commentRef, { likes: newLikes });
    //         localStorage.setItem(
    //           "liked_comments",
    //           JSON.stringify([...likedComments, commentId])
    //         );
    //         setComments((prevComments) =>
    //           prevComments.map((comment) =>
    //             comment.id === commentId ? { ...comment, likes: newLikes } : comment
    //           )
    //         );
    //       });
    //     } catch {
    //       toast.error("Lỗi thích bình luận: Bình luận không tồn tại!");
    //     }
    //   };
    //   const handleDeleteComment = async (commentId) => {
    //     try {
    //       await deleteDoc(doc(db, "comments", commentId));
    //       setComments(comments.filter((comment) => comment.id !== commentId));
    //     } catch (error) {
    //       console.error("Error deleting comment: ", error);
    //     }
    //   };
    
    //   const handleReply = (commentId) => {
    //     setReplyingTo(commentId);
    //   };
    //   const handleCancelReply = () => {
    //     setReplyingTo(null);
    //   };
    //   const handleReplySubmit = async (e, parentId) => {
    //     e.preventDefault();
    //     if (newComment.trim() === "" || !user) {
    //       return;
    //     }
    //     const replyData = {
    //       comicSlug: slug,
    //       userId: user.id,
    //       username: user.username,
    //       content: newComment,
    //       createdAt: new Date().toISOString(),
    //       parentId: parentId,
    //       likes: 0,
    //     };
    //     try {
    //       const docRef = await addDoc(collection(db, "comments"), replyData);
    //       const newReply = { id: docRef.id, ...replyData };
    //       const updatedComments = comments.map((comment) =>
    //         comment.id === parentId
    //           ? { ...comment, replies: [...(comment.replies || []), newReply] }
    //           : comment
    //       );
    //       setComments(updatedComments);
    //       setNewComment("");
    //       setReplyingTo(null);
    //       localStorage.setItem(`reply_padding_${parentId}`, "40px");
    //     } catch (error) {
    //       console.error("Error adding reply: ", error);
    //       setError("Error adding reply");
    //     }
    //   };
    // const convertStatusToVietnamese = (status) => {
    //     switch (status) {
    //       case "ongoing":
    //         return "Đang Cập Nhật";
    //       case "completed":
    //         return "Đã Hoàn Thành";
    //       default:
    //         return status;
    //     }
    //   };
    //   const convertTimestampToDate = (timestamp) => {
    //     const date = new Date(timestamp);
    //     const day = date.getDate();
    //     const month = date.getMonth() + 1;
    //     const year = date.getFullYear();
    //     return `${day}/${month}/${year}`;
    //   };
  return (
    <div>
      {/* List Comic */}
      {/* <div className="p-3 mt-3">
            <div>
              <i
                className={`fa-solid fa-database me-2 ${
                  light ? "text-white" : "text-[#f18121]"
                }`}
              ></i>
              <span
                className={`${
                  light ? "text-white" : "text-orange-400"
                } text-lg`}
              >
                Danh sách chương
              </span>
            </div>

            <div
              className="border border-white overflow-auto max-h-[500px] py-5 px-5 w-full min-h-[300px] mt-2 rounded-md"
              style={{
                boxShadow:
                  "0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%)",
              }}
            >
              {chapters.map((chapter, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: `/chapter/${chapter.chapterApiData}`,
                    state: {
                      chapterApiData: chapter.chapterApiData,
                      comicSlug: slug,
                    },
                  }}
                  onClick={() => handleChapterClick(chapter.chapterApiData)}
                >
                  <ListComicDescribe
                    chap={chapter.chapterName}
                    day={convertTimestampToDate(
                      comicData.seoOnPage.updated_time
                    )}
                    style={{
                      color: readChapters.includes(chapter.chapterApiData)
                        ? "orange"
                        : "inherit",
                    }}
                  />
                </Link>
              ))}
            </div>
          </div> */}
      {/* Chat Message */}
      {/* <div className="mt-4 p-3">
            {comments && (
              <div>
                <i className="me-3 text-orange-400 text-[22px] bi bi-chat-fill"></i>
                <span className="text-[22px] text-orange-400">
                  Bình Luận ({comments.length})
                </span>
              </div>
            )}
            {user ? (
              <form
                onSubmit={
                  replyingTo !== null
                    ? (e) => handleReplySubmit(e, replyingTo)
                    : handleCommentSubmit
                }
                className="mt-5"
              >
                <textarea
                  className={`text-black mt-3 px-2 py-1 outline-none rounded-sm ${
                    light ? "" : "border-[#dedede] border"
                  }`}
                  placeholder="hãy bình luận có văn hóa để khỏi bị khóa tài khoản"
                  style={{ resize: "none" }}
                  cols={147}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                >
                  {replyingTo !== null ? "Trả lời" : "Gửi bình luận"}
                </button>
                {replyingTo !== null && (
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 ms-2 mt-2 rounded"
                    onClick={handleCancelReply}
                  >
                    Hủy
                  </button>
                )}
              </form>
            ) : (
              <p className="mt-5">
                Vui lòng{" "}
                <Link to="/login" className="text-blue-500">
                  đăng nhập
                </Link>{" "}
                để bình luận.
              </p>
            )}
            {comments.map((comment) => (
              <>
                <div className="mt-4 flex items-center" key={comment.id}>
                  <div className="w-[46px]">
                    <img
                      src={require("../../assets/img/avatar.jpg")}
                      className="max-w-full mx-3 rounded-[46px] h-auto bg-[#fff] object-cover"
                      alt=""
                    />
                  </div>
                  <div
                    className={`${
                      light ? "bg-[#423e3e]" : "bg-[#ebebeb]"
                    } w-full ms-5 h-full rounded-md px-3 py-2 relative`}
                  >
                    <p
                      style={{
                        backgroundImage: `url(${require("../../assets/img/backgroundMessages.jpg")})`,
                        backgroundSize: "auto",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundPosition: "center",
                      }}
                    >
                      {comment.username}
                    </p>
                    <div className="my-1 w-full h-[1px] bg-[#f3ab6e]" />
                    <p>{comment.content}</p>
                  </div>
                </div>
                <div className="w-full h-full flex items-center gap-5 ms-16 mt-2 cursor-pointer">
                  <div
                    className="text-[#3f94d5]"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                    <span className="ms-2">{comment.likes}</span>
                  </div>
                  <div
                    className="text-[#3f94d5]"
                    onClick={() => handleReply(comment.id)}
                  >
                    <i className="bi bi-chat-fill"></i>
                    <span className="ms-2">Trả lời</span>
                  </div>
                  {user && comment.userId === user.id && (
                    <div
                      className="text-[#3f94d5]"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      <span className="ms-2">Xóa</span>
                    </div>
                  )}
                  <p className="text-[#c1c1c1]">
                    {formatDistanceToNow(parseISO(comment.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </p>
                </div>
                {comment.replies &&
                  comment.replies.map((reply) => (
                    <>
                      <div
                        className="mt-4 flex items-center"
                        key={reply.id}
                        style={{
                          paddingLeft:
                            localStorage.getItem(
                              `reply_padding_${comment.id}`
                            ) || "40px",
                        }}
                      >
                        <div className="w-[46px]">
                          <img
                            src={require("../../assets/img/avatar.jpg")}
                            className="max-w-full mx-3 rounded-[46px] h-auto bg-[#fff] object-cover"
                            alt=""
                          />
                        </div>
                        <div
                          className={`${
                            light ? "bg-[#423e3e]" : "bg-[#ebebeb]"
                          } w-full ms-5 h-full rounded-md px-3 py-2 relative`}
                        >
                          <p
                            style={{
                              backgroundImage: `url(${require("../../assets/img/backgroundMessages.jpg")})`,
                              backgroundSize: "auto",
                              color: "transparent",
                              WebkitBackgroundClip: "text",
                              backgroundPosition: "center",
                            }}
                          >
                            {reply.username}
                          </p>
                          <div className="my-1 w-full h-[1px] bg-[#f3ab6e]" />
                          <p>{reply.content}</p>
                        </div>
                      </div>
                      <div className="w-full h-full flex items-center gap-5 ms-16 mt-2 cursor-pointer">
                        <div
                          className="text-[#3f94d5]"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <i className="bi bi-hand-thumbs-up-fill"></i>
                          <span className="ms-2">{comment.likes}</span>
                        </div>
                        <div
                          className="text-[#3f94d5]"
                          onClick={() => handleReply(comment.id)}
                        >
                          <i className="bi bi-chat-fill"></i>
                          <span className="ms-2">Trả lời</span>
                        </div>
                        {user && comment.userId === user.id && (
                          <div
                            className="text-[#3f94d5]"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                            <span className="ms-2">Xóa</span>
                          </div>
                        )}
                        <p className="text-[#c1c1c1]">
                          {formatDistanceToNow(parseISO(comment.createdAt), {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </p>
                      </div>
                    </>
                  ))}
              </>
            ))}
          </div> */}
    </div>
  );
};

export default filerac;
// useEffect(() => {
//     const fetchComicData = async () => {
//       try {
//         const response = await fetch(
//           `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
//         );
//         console.log(response);
//         if (!response.ok) {
//           throw new Error("Không thể kết nối đến API");
//         }
//         const data = await response.json();
//         const { seoOnPage, item } = data.data;
//         const cleanedContent = item.content.replace(/<\/?p>/g, "");
//         setComicData({ seoOnPage, item: { ...item, content: cleanedContent } });
//         const chapters = item.chapters
//           .flatMap((chapter) =>
//             chapter.server_data.map((data) => ({
//               chapterName: data.chapter_name,
//               chapterApiData: data.chapter_api_data.split("/").pop(),
//             }))
//           )
//           .reverse();
//         setChapters(chapters);
//         let viewed = parseInt(localStorage.getItem(`comic_viewed_${slug}`), 10);
//         if (isNaN(viewed)) {
//           viewed = 0;
//           localStorage.setItem(`comic_viewed_${slug}`, viewed.toString());
//         }
//         setViewCount(viewed);
//         const liked =
//           localStorage.getItem(`comic_liked_${slug}`) === "true" ||
//           Cookies.get(`comic_liked_${slug}`) === "true";
//         setLiked(liked);
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchComicData();
//   }, [slug]); 
//   const handleFollow = async () => {
//     if (!user) {
//       toast.error("Người dùng phải đăng nhập để theo dõi truyện!");
//       return;
//     }

//     const followData = {
//       comicSlug: slug,
//       userId: user.id,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       // Check if the user already follows the comic
//       const q = query(
//         collection(db, "follows"),
//         where("comicSlug", "==", slug),
//         where("userId", "==", user.id)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         toast.warning("Bạn đã theo dõi truyện này rồi!");
//         return;
//       }

//       await addDoc(collection(db, "follows"), followData);
//       toast.success("Đã theo dõi truyện thành công!");
//       // Update UI or state to reflect the follow action if necessary
//     } catch (error) {
//       console.error("Error following comic: ", error);
//       setError("Error following comic");
//     }
//   }; useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("users"));
//     if (loggedInUser) {
//       setUser(loggedInUser);
//     }
//   }, []);
//   useEffect(() => {
//     // Check Follow
//     const checkFollowStatus = async () => {
//       if (!user) return;

//       const q = query(
//         collection(db, "follows"),
//         where("comicSlug", "==", slug),
//         where("userId", "==", user.id)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         setIsFollowing(true);
//       }
//     };

//     checkFollowStatus();
//   }, [slug, user]);
// useEffect(() => {
//     const incrementView = () => {
//       const hasViewed = localStorage.getItem(`comic_viewed_${slug}`);
//       if (!hasViewed || hasViewed === "0") {
//         const newViewCount = viewCount + 1;
//         setViewCount(newViewCount);
//         localStorage.setItem(`comic_viewed_${slug}`, newViewCount.toString());
//       }
//     };
//     incrementView();
//   }, [slug]);
// useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const q = query(
//           collection(db, "comments"),
//           where("comicSlug", "==", slug)
//         );
//         const querySnapshot = await getDocs(q);
//         const commentsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setComments(commentsData);
//       } catch (error) {
//         console.error("Error fetching comments: ", error);
//         setError("Error fetching comments");
//       }
//     };
//     fetchComments();
//   }, [slug]);
 // const handleChapterClick = (chapterApiData) => {
  //   setReadChapters((prev) => {
  //     const updatedChapters = [...prev, chapterApiData];
  //     localStorage.setItem(
  //       `comic_read_chapters_${slug}`,
  //       JSON.stringify(updatedChapters)
  //     );
  //     return updatedChapters;
  //   });
  // };