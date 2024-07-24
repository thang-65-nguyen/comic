// import React, { useEffect, useState } from "react";
// import { useLightMode } from "../../components/LightDart";
// import "./style.css"
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchData, selectData } from "../../admin/firebase/User";
// const Index = () => {
//     const { light } = useLightMode();
//     const [fileName, setFileName] = useState("Chọn hình");
//     const [user, setUser] = useState({ username: "", email: "" });
//     const dispatch = useDispatch();
//     const users = useSelector(selectData);

//     const handleFileChange = (event) => {

//     const file = event.target.files[0];

//     if (file) {
//         setFileName(file.name);
//     } else {
//         setFileName("Chọn hình");
//     }
//     };
//     useEffect(() => {
//         const storedUser = localStorage.getItem("users");
//         const isLoggedIn = localStorage.getItem("isLoggedIn");
    
//         if (storedUser && isLoggedIn === "true") {
//             const userData = JSON.parse(storedUser);
//             setUser({ username: userData.username, email: userData.email });
//         } else {
//             dispatch(fetchData());
//         }
//     }, [dispatch]);
    
//         useEffect(() => {
//             if (!user.username && users.length > 0) {
//                 const loggedUser = users[0];
//                 setUser({ username: loggedUser.username, email: loggedUser.email });
//                 localStorage.setItem("users", JSON.stringify(loggedUser));
//                 localStorage.setItem("isLoggedIn", "true");
//             }
//         }, [users, user.username,user.email]);
// return (
//     <div className={`${light ? "bg-black" : "bg-[#ebebeb]"}`}>
//         <div className="pb-5 h-auto mx-auto w-[1140px] pt-5">
//             <div className={`${light ? "bg-[#242526]" : "bg-white"} ${light ? "text-white" : "text-black"} rounded-sm`} style={{boxShadow:"0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%)",}}>
//                 <div className="flex p-5">
//                     <div className="w-[22.223%]">
//                     <div className="bg-[#f2f2f2] text-black flex ps-8 py-3">
//                         <ul className="block leading-9 cursor-pointer">
//                             <li>
//                                 <Link to="/quan-ly-tai-khoan">
//                                     <i className="fa-solid fa-circle-user me-2"></i>
//                                     <span>Quản lý tài khoản</span>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/doi-mat-khau">
//                                     <i className="fa-solid fa-key me-2"></i> 
//                                     <span>Đổi mật khẩu</span>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                     </div>
//                     <div className="w-[77.778%] ps-[40px] pe-[50px]">
//                         <div className="mt-5 flex justify-center">
//                             <img
//                                 src={require("../../assets/img/avatar_1708839584.jpg")}
//                                 alt=""
//                             />
//                         </div>
//                         <div className="relative w-[100px] justify-center mt-1 text-md flex mx-auto bg-[#ff3860] text-white">
//                             <input
//                                 type="file"
//                                 id="file"
//                                 className="absolute w-full h-full opacity-0 cursor-pointer text-center"
//                                 onChange={handleFileChange}
//                             />
//                             <label htmlFor="file" className="file-input-label">
//                                 {fileName}
//                             </label>
//                         </div>
//                         <div className="mt-3 mx-24">
//                             <div className="block w-full">
//                                 <div className="flex justify-between">
//                                     <p className="font-semibold text-sm">Trúc cơ</p>
//                                     <p className="font-semibold text-sm">Kim đan</p>
//                                 </div>
//                                 <div className="bg-[#e1e4e8] w-full h-[20px] rounded-xl">
//                                     <span className="w-[35%] rounded-xl text-sm animationPosition">35% (Trung kỳ)</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <h3 className="mt-4 text-xl">Thông tin Tài khoản</h3>
//                         <div className="mt-1">
//                             <label className="block">Điểm:</label>
//                             <input
//                                 type="text"
//                                 disabled
//                                 value={"1120"}
//                                 className="text-black w-full outline-none mt-2 rounded-md py-2 ps-2 border border-[#dbdbdb]" style={{boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)"}}
//                             />
//                         </div>
//                         <div className="mt-2">
//                             <label className="block">Email:</label>
//                             <input type="text" value={user.email} className="text-black w-full outline-none mt-2 rounded-md py-2 ps-2 border border-[#dbdbdb]" style={{boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)"}}/>
//                         </div>
//                         <h3 className="mt-2 text-xl">Thông tin cá nhân</h3>
//                         <div className="mt-2">
//                             <label className="block">Họ và tên:</label>
//                             <input type="text" value={user.username} className="text-black w-full outline-none mt-2 rounded-md py-2 ps-2 border border-[#dbdbdb]" style={{boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)"}}/>
//                         </div>
//                         <div className="flex gap-2 mt-2">
//                             <span>Giới tính</span>
//                             <div className="flex gap-2">
//                                 <input type="radio"/>
//                                 <span>Nam</span>
//                             </div>
//                             <div className="flex gap-2">
//                                 <input type="radio"/>
//                                 <span>Nữ</span>
//                             </div>
//                         </div>
//                         <div className="text-center mt-2">
//                             <button type="submit" className="bg-[#ff3860] text-white px-3 py-1 rounded-sm">Lưu</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Index;
import React from 'react';

const Index = () => {
    return (
        <div>
            
        </div>
    );
};

export default Index;