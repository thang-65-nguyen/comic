import { useLightMode } from "../../components/LightDart";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AppSlide from "../slide";
import LayoutSearch from "./Layout";

const LayOutSearchs = () => {
  const { light } = useLightMode();
  return (
    <div className={`${light ? "bg-[#18191a]" : "bg-white"} h-auto w-auto`}>
      <Header />
      <div className="flex gap-[32px] w-[1124px] mx-auto pb-10">
        <div className="flex-shrink-0">
          <AppSlide />
        </div>
        <div className="flex-1 mb-[2rem] mt-5">
          <LayoutSearch />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayOutSearchs;
