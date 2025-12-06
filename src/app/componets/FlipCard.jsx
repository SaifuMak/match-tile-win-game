"use client";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

const FlipCard = forwardRef(({ img, handleCardClick }, ref) => {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const flipTo = (showBack) => {
    setFlipped(showBack);
    gsap.to(cardRef?.current, {
      rotateY: showBack ? 180 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };


  const handleRevealCard = () => {
    if (flipped) return; // prevent clicking if already flipped
    handleCardClick();
    flipTo(!flipped);
  };

  const fadeInOut = () => {
    gsap.to(cardRef?.current, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.inOut",

    });
  };


  // expose methods to parent
  useImperativeHandle(ref, () => ({
    reveal() {
      flipTo(true);
    },
    hide() {
      flipTo(false);
    },
    fadeInOut() {
      fadeInOut();
    }
  }));



  return (
    <div className=" 2xl:size-[180px] lg:size-[150px] sm:size-[120px] size-[100px] perspective-1000">
      <div ref={cardRef} onClick={handleRevealCard} className="relative  w-full h-full transform-style-3d">

        {/* FRONT */}
        <div className="absolute inset-0 cursor-pointer bg-white backface-hidden"></div>

        {/* BACK */}
        <div className="absolute  inset-0 rotateY-180 backface-hidden">
          {/* <p className=" hidden">{img}</p> */}
          <img src={img} className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
});

// FIX ESLINT ♦ Add displayName
FlipCard.displayName = "FlipCard";

export default FlipCard;
