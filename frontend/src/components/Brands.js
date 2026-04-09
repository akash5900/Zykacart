import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Brands() {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    const res = await axios.get("http://localhost:3000/api/brand/all");
    setBrands(res.data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <div className="px-3 md:px-10 lg:px-[60px] md:py-2">
      <div className=" flex items-center justify-between m-3 md:mt-6 md:mb-8 ">
        <h1 className=" text-lg md:text-3xl text-pink-600">Original Brands</h1>
      </div>

      <div className="flex gap-4 md:gap-[55px] overflow-x-auto scrollbar-hide scroll-smooth ">
        {brands.map((brand) => (
          <BrandItem
            key={brand._id}
            id={brand._id}
            img={brand.image}
            title={brand.name}
          />
        ))}
      </div>
    </div>
  );
}

function BrandItem({ img, title, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="h-[180px] md:h-[300px] cursor-pointer"
      onClick={() => navigate("/brand/" + id)}
    >
      <div className=" rounded-xl overflow-hidden border border-black ">
        <div className=" w-[120px] h-[120px] md:w-[200px] md:h-[230px] bg-blue-100 flex items-center justify-center p-[10px] ">
          <img src={img} alt={title} className="h-[130px] md:h-[260px] object-contain" />
        </div>

        <div className="bg-blue-600 text-white text-center py-2 text-xs md:text-lg cursor-pointer">
          {title}
        </div>
      </div>
    </div>
  );
}
export default Brands;
