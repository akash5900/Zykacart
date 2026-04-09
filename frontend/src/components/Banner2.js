import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Banner2() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const fetchBanner = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/banner/position/middle",
    );
    setBanners(res.data[0]);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleBannerClick = () => {
    navigate("/#products-section");
  };

  if (!banners) return null;

  return (
    <div className="w-full h-[450px] bg-[#53321E] border flex items-end justify-around text-amber-500 text-xl">
      <img src={banners.image} alt="" className="h-[420px] w-[680px]" />

      <div className="flex flex-col items-start gap-[40px] text-2xl pb-[65px]">
        <h1 className="text-8xl text-[#D6B36A]">{banners.title}</h1>

        <p className="text-[#D6B36A]">{banners.subtitle}</p>

        <button
          onClick={handleBannerClick}
          className="border border-[#D6B36A] bg-[#4B2A17] p-[10px] px-[20px] text-[#D6B36A] rounded-[10px]"
        >
          {banners.buttonText}
        </button>
      </div>
    </div>
  );
}

export default Banner2;
