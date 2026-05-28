function Features() {
  return (
    <div className="border bg-pink-50 p-2 md:p-4">
      <div className=" border p-2 md:p-2 flex md:flex-row items-center justify-center gap-2 md:gap-20 rounded bg-white">
        <div>
          <span className="text-[12px] md:text:lg">7 Days Easy Return</span>
        </div>
        <div className=" h-3 md:h-6 w-px bg-gray-300"></div>
        <div>
          <span className="text-[12px] md:text:md">Cash on Delivery</span>
        </div>
        <div className="h-3 md:h-6 w-px bg-gray-300"></div>
        <div>
          <span className="text-[12px] md:text:md">Lowest Prices</span>
        </div>
      </div>
    </div>
  );
}

export default Features;
