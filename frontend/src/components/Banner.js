import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/banner/position/home",
    );
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  const handleBannerClick = () => {
    // const link = banners[current].buttonLink;

    // if (link === "/products-section") {
    //   const section = document.getElementById("products-section");
    //   if (section) {
    //     section.scrollIntoView({ behavior: "smooth" });
    //   } else {
        navigate("/#products-section");
    //   }
    // } else {
    //   navigate(link);
    // }
  };

  if (banners.length === 0) return null;

  return (
    <div className="overflow-hidden flex md:flex-row justify-center items-center gap-4 md:gap-40 w-full h-[160px] md:h-[350px] bg-pink-400 px-4 md:px-16 py-6 md:py-10">
      <img
        src={banners[current].image}
        alt=""
        className="w-full max-w-[250px] md:max-w-[550px] h-auto object-contain"
      />

      <div className="flex flex-col items-center md:items-start gap-2 md:gap-4 text-center md:text-left">
        <h1 className="text-white font-bold text-sm md:text-4xl">
          {banners[current].title}
        </h1>

        <h1 className="text-white font-bold text-sm md:text-4xl">
          {banners[current].subtitle}
        </h1>

        <button
          onClick={handleBannerClick}
          className="border bg-white px-3 py-1 md:px-8 md:py-3 text-pink-950 text-sm md:text-xl rounded-lg"
        >
          {banners[current].buttonText}
        </button>
      </div>
    </div>
  );
}

export default Banner;
