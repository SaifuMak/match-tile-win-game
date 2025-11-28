"use client";
import { useEffect, useRef, useState } from "react";
import FlipCard from "../componets/FlipCard";
import Footer from "../componets/Footer";

export default function Home() {

    const [cardsArr] = useState(() =>
        [
            '/images/cards/female-doll.png',
            '/images/cards/male-doll.png',
            '/images/cards/dog.png',
            '/images/cards/earth.png',
            '/images/cards/santaclaus.png',
            '/images/cards/tree.png',
            '/images/cards/female-doll.png',
            '/images/cards/male-doll.png',
            '/images/cards/dog.png',
            '/images/cards/earth.png',
            '/images/cards/santaclaus.png',
            '/images/cards/tree.png',

        ].sort(() => Math.random() - 0.5)
    );


    const cardRefs = useRef([]);
    const [time, setTime] = useState(15);
    const [hasViewingTimeEnded, sethasViewingTimeEnded] = useState(false);

    // start countdown + reveal cards
    useEffect(() => {
        cardRefs.current.forEach((card) => card.reveal());

        const timer = setInterval(() => {
            setTime(prev => {
                if (prev === 1) {
                    // when timer finishes → flip all back + restart timer
                    cardRefs.current.forEach((card) => card.hide());
                    sethasViewingTimeEnded(true);
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-primary-blue flex flex-col items-center min-h-screen">
        <main className="  flex flex-col items-center gap-6 py-8">
            <h1 className=" text-4xl mt-5 font-bold text-white">{hasViewingTimeEnded ? `PICK CARDS NOW ` : `Start memorizing now!`}</h1>
            <h2 className="text-white mt-3 text-4xl font-bold">
                {hasViewingTimeEnded ? `You have ${time} seconds...` : `${time} seconds remaining...`}
            </h2>

            <div className={`grid grid-cols-4 mt-12 gap-2 ${hasViewingTimeEnded ? "pointer-events-auto" : "pointer-events-none"}`}>
                {cardsArr.map((img, i) => (
                    <FlipCard
                        key={i}
                        img={img}
                        ref={(el) => cardRefs.current[i] = el}
                    />
                ))}
            </div>
        </main>
        <Footer/>
        </div>
    );
}
