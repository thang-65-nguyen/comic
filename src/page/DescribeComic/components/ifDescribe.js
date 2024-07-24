import React from "react";

const IfComic = (props) => {
  return (
    <div className="flex mt-2 gap-x-5 text-lg items-center">
      <p className="text-[#10b982] font-bold">{props.status}</p>
      <p className="text-left">{props.name}</p>
    </div>
  );
};

export default IfComic;
