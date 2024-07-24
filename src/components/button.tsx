import React from "react";

const Button = (props: any) => {
  return (
    <button className="bg-[#10b881] pt-2 pb-[11px] px-5 text-white rounded-md">
      {props.children}
    </button>
  );
};

export default Button;
