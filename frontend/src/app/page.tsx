"use client";
import Image from "next/image";
import NewsDisplay from "@/components/ui/NewsDisplay";
import React, { useState } from "react";
import Filter from "@/components/ui/background";


const images = ['/city.jpg', '/redcity.jpg', '/purple.jpg'];


export default function Home() {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentState, setCurrentState] = useState<number>(0);

  const changeState = (x: number) => {
    setCurrentState(x);
  }
  return (
    <div className="relative w-screen h-screen">
    <div
      className=" absolute inset-0 brightness-50 m-0 p-0 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url("${images[currentState]}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
      
    > 
    {/* <Filter state={currentState} /> */}
    </div>
      <div className="z-10 relative">
        

        <NewsDisplay section="world" buttonText="Fetch World News" onChangeState={changeState} />
        <NewsDisplay section="tech" buttonText="Fetch Tech News" onChangeState={changeState} />
        <NewsDisplay section="environment" buttonText="Fetch Environment News" onChangeState={changeState} />
      </div>

    </div>
  );
}