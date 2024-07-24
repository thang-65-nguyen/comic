import React from "react";
import { useLightMode } from "../../../components/LightDart";

const ListComicDescribe = (props) => {
  const {light}= useLightMode();
  return (
    <div className={`flex justify-between items-center ${light ? "border-b-white" : "border-b-[#f7f7f7]"}  border border-t-transparent border-l-transparent border-r-transparent py-2`}>
      <p>Chương {props.chap}</p>
      <p>{props.day}</p>
    </div>
  );
};

export default ListComicDescribe;
