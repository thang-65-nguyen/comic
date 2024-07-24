import React from "react";
import { useLightMode } from "../../../components/LightDart";

const ButtonCategoryDescribe = (props) => {
  const { light } = useLightMode();
  return (
    <button
      className={` bg-[#10b982] hover:text-white text-sm px-2 py-1 rounded-lg shadow-md text-white`}
    >
      {props.children}
    </button>
  );
};

export default ButtonCategoryDescribe;
