import "./Categorybar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CategoryBar2() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/category/categorys",
      );
      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" py-4 md:py-10 bg-white px-3 md:px-15 overflow-x-auto md:container md:mx-auto whitespace-nowrap scrollbar-hide ">
      <div className=" flex gap-4 md:gap-9 ">
        {category.map((cat) => {
          return <CategoryItem key={cat._id} id={cat._id} img={cat.image} label={cat.name} />;
        })}
      </div>
    </div>
  );
}

function CategoryItem({ img, label, id }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/category/${id}`)} className="px-2 flex-shrink-0 flex flex-col items-center justify-center gap-2 ">
      <div className="bg-[#F3E3EC] rounded-t-full w-[70px] h-[70px] md:w-[130px] md:h-[130px] flex items-center justify-center">
        <img
          src={img}
          alt={label}
          className=" max-h-full object-contain cursor-pointer"
        />
      </div>
      <p className="mt-2 text-[11px] text-center md:text-sm font-medium hover:text-pink-600 cursor-pointer">
        {label}
      </p>
    </div>
  );
}

export default CategoryBar2;
