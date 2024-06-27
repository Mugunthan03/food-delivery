import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Header = () => {
  // const [load,setLoad] = useState(false)

  // useEffect(()=>{
  //     const timeout = setTimeout(()=>{
  //         setLoad(true)
  //     },300)

  //     return ()=>clearTimeout(timeout)
  // })

  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
      setShowHeader(true);
  }, []);
  const headerStyle = {
    backgroundImage: `url(${assets.header_img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="mt-7">
      <div
        className="h-[40vw] lg:h-[34vw] rounded-xl relative"
        style={headerStyle}
      >
        <div
          className={`absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]
           transition-opacity duration-1000 ${showHeader ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="font-medium text-white  text-xl md:text-4xl lg:text-4xl xl:text-6xl">
            Order your favourite food here
          </h1>
          <p className="hidden lg:block text-base xl:text-xl  text-white">
            {" "}
            Get mouth-watering meals delivered fast with just a few clicks.
            Enjoy diverse cuisine and easy online payments for the ultimate
            convenient dining experience.
          </p>
          <button className=" border-none bg-white px-2 lg:px-3 xl:py-2 xl:text-lg py-1 font-medium text-sm md:text-base rounded-full">
            View Menu
          </button>
        </div>  
      </div>
    </div>
  );
};

export default Header;
