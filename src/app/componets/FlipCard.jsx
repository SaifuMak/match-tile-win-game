"use client";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

const FlipCard = forwardRef(({ img }, ref) => {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const flipTo = (showBack) => {
    setFlipped(showBack);
    gsap.to(cardRef.current, {
      rotateY: showBack ? 180 : 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

//   const handleFlip = () => {
//     const next = !flipped;
//     setFlipped(next);
//     gsap.to(cardRef.current, {
//       rotateY: next ? 180 : 0,
//       duration: 0.8,
//       ease: "power2.inOut",
//     });
//   };

const handleRevealCard = () => {
    if (!flipped) {
      flipTo(true);
    }
  };

  // expose methods to parent
  useImperativeHandle(ref, () => ({
    reveal() {
      flipTo(true);
    },
    hide() {
      flipTo(false);
    }
  }));

  return (
    <div className="w-[180px] h-[180px] perspective-1000">
      <div ref={cardRef}  onClick={handleRevealCard} className="relative  w-full h-full transform-style-3d">

        {/* FRONT */}
        <div className="absolute inset-0 cursor-pointer bg-white backface-hidden"></div>

        {/* BACK */}
        <div className="absolute  inset-0 rotateY-180 backface-hidden">
          <img src={img} className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
});

export default FlipCard;
