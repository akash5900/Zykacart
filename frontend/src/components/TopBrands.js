import { useEffect, useRef } from "react";
import Bata from "../assests/Topbrands/Bata.png";
import Himalya from "../assests/Topbrands/Himalaya.png";
import Mamaearth from "../assests/Topbrands/Mamaearth.png";
import Mi from "../assests/Topbrands/Mi.png";
import Nivea from "../assests/Topbrands/Niveaa.png";
import Plum from "../assests/Topbrands/Plum.png";
import Wow from "../assests/Topbrands/Wow.png";
import ws from "../assests/Topbrands/ws.png";

const brands = [Bata, Himalya, Mamaearth, Mi, Nivea, Plum, Wow, ws];

function TopBrands() {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;

        // Reset at half width (important for circular smooth)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="bg-gray-200 overflow-x-auto scrollbar-hide overflow-y-hidden py-2"
    >
      <div className="flex  gap-3 md:gap-[20px]">
        {/* First set */}
        {brands.map((img, index) => (
          <TopBrandsItem key={index} img={img} />
        ))}

        {/* Duplicate set for smooth infinite */}
        {brands.map((img, index) => (
          <TopBrandsItem key={"dup-" + index} img={img} />
        ))}
      </div>
    </div>
  );
}

function TopBrandsItem({ img }) {
  return (
    <div className=" flex items-center p-2 md:p-[20px] flex-shrink-0">
      <div className=" w-[120px] h-[60px] md:w-[200px] md:h-[100px] rounded-lg flex items-center justify-center bg-white">
        <img src={img} alt="" className=" flex items-center object-contain " />
      </div>
    </div>
  );
}
export default TopBrands;
