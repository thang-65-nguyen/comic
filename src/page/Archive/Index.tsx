import { useLightMode } from "../../components/LightDart";

import Footer from "../../components/footer";
import Header from "../../components/header";
import AppSlide from "../slide";
import IndexArchive from "./IndexArchive";

const LayOutArchive = () => {
  const { light } = useLightMode();

  return (
    <div className={`${light ? "bg-[#18191a]" : "bg-white"} h-auto w-auto`}>
      <Header />
      <div className="flex gap-[32px] w-[1124px] mx-auto pb-10">
        <div className="flex-shrink-0 z-10">
          <AppSlide />
        </div>
        <div className="flex-1 mb-[2rem] mt-5">
          <IndexArchive />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayOutArchive;
