import React from "react";
import { useLightMode } from "../../components/LightDart";
import { Link } from "react-router-dom";
const DoiMatKhau = () => {
    const {light} = useLightMode();

    return (
        <div className={`${light ? "bg-black" : "bg-[#ebebeb]"}`}>
            <div className="py-5 h-auto mx-auto w-[1140px]">
                <div className={`${light ? "bg-[#242526]" : "bg-white"} ${light ? "text-white" : "text-black"} rounded-sm mt-4`} style={{boxShadow:"0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%)",}}>
                    <div className="flex p-5">
                        <div className="w-[22.223%]">
                            <div className="bg-[#f2f2f2] text-black flex ps-8 py-3">
                                <ul className="block leading-9 cursor-pointer">
                                    <li>
                                        <Link to="/quan-ly-tai-khoan">
                                            <i className="fa-solid fa-circle-user me-2"></i>
                                            <span>Quản lý tài khoản</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/doi-mat-khau">
                                            <i className="fa-solid fa-key me-2"></i> 
                                            <span>Đổi mật khẩu</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-[77.778%] ps-[40px] pe-[50px]">
                            <h3 className="text-xl mt-2">Đổi mật khẩu</h3>
                            <div className="mt-2">
                                <label className="block">Mật khẩu hiện tại</label>
                                <input
                                    type="text"
                                    className="text-black w-full outline-none mt-2 rounded-md py-2 ps-2 border border-[#dbdbdb]" style={{boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)"}}
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block">Mật khẩu mới</label>
                                <input
                                    type="text"
                                    className="text-black w-full outline-none mt-2 rounded-md py-2 ps-2 border border-[#dbdbdb]" style={{boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)"}}
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block">Xác nhận mật khẩu</label>
                                <input
                                    type="text"
                                    className="text-black w-full outline-none mt-2 rounded-md py-2 ps-2 border border-[#dbdbdb]" style={{boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)"}}
                                />
                            </div>
                            <div className="mt-2 flex justify-center">
                                <button className="bg-[#ff3860] text-white px-3 py-1 rounded-sm">Đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoiMatKhau;
