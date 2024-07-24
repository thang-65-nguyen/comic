import React from "react";
import { useLightMode } from "../LightDart";

const Footer = () => {
  const { light } = useLightMode();
  return (
    <>
      <div className={` ${light ? "bg-white" : "bg-orange-400"} h-2`}></div>
      <div className={`${light ? "bg-[#282828]" : "bg-white"} pt-3 pb-5`}>
        <div className="w-[1140px] mx-auto mt-5 ">
          <div
            className={`flex justify-between ${
              light ? "text-white" : "text-black"
            }`}
          >
            <div className="w-[50%]">
              <p>Email: 6conkien123@gmail.com</p>
              <p className="font-bold mt-1">Chính Sách Bảo Mật</p>
            </div>
            <div className="w-[50%]">
              <p className="text-sm">
                Mọi thông tin và hình ảnh trên website đều được sưu tầm trên
                Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ
                thông tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ
                chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay
                lập tức.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
