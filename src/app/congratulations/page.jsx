'use client';

import Link from "next/link";
import { usePlayerStore } from "../store/usePlayerStore";
import PageLoader from "../componets/PageLoader";
import Footer from "../componets/Footer";
import { useEffect, useState } from "react";

export default function Congratulations() {

    const resetPlayer = usePlayerStore((state) => state.resetPlayer);

    const [hydrated, setHydrated] = useState(false);
    const [localWinStatus, setLocalWinStatus] = useState(null);
    const [localRewards, setLocalRewards] = useState(null);
    const [localPlayerId, setLocalPlayerId] = useState(null);
    
    const storeWinStatus = usePlayerStore(state => state.winStatus);
    const storeRewards = usePlayerStore(state => state.rewards);
    const storeplayerId = usePlayerStore(state => state.playerId);

    useEffect(() => {
        // Take snapshot values
        setLocalWinStatus(storeWinStatus);
        setLocalRewards(storeRewards);
        setLocalPlayerId(storeplayerId);

        setTimeout(() => {
            resetPlayer();
        }, 1000);

        setHydrated(true);
    }, []);

    if (!hydrated) return <PageLoader />;

    return (
        <div className=" flex flex-col bg-primary-blue min-h-screen justify-between ">
            <div className="  text-center min-h-[80vh] flex flex-col items-center justify-center px-5">
        
                {localWinStatus && !localRewards ? (
                    <>
                        <h1 className="text-[#F9F523] text-3xl 2xl:text-[40px] font-bold">CONGRATS, YOU WON!</h1>
                        <p className="2xl:text-[40px] lg:text-3xl text-xl text-white font-bold mt-7">We will get in touch with you regarding the prize details.</p>
                    </>

                ) : (
                    localPlayerId ? (
                        <>
                            <h1 className="text-[#F9F523] text-4xl xl:text-5xl 2xl:text-6xl font-bold">TIME OVER!</h1>
                            <p className="2xl:text-4xl text-2xl lg:text-3xl text-white font-bold mt-5 lg:mt-7 2xl:mt-20 ">But you have won a Consolation Prize!</p>
                            {localRewards && localRewards > 0 && <p className="text-[#F9F523] 2xl:text-4xl text-2xl lg:text-3xl font-bold mt-2 2xl:mt-6 ">${localRewards} Gift Card</p>}
                            <p className=" text-white lg:text-lg 2xl:text-xl mt-6 lg:mt-10 2xl:mt-12">We will get in touch with you regarding the prize details.</p>
                        </>
                    ) : (
                        <>

                        </>)

                )}
                <Link href="/" className=" px-4 lg:px-6 py-1 cursor-pointer max-lg:text-sm bg-white font-medium text-primary-blue rounded mt-3 2xl:mt-6">Back to Home</Link>


            </div>



            <div className=" flex justify-center ">
                <Footer />
            </div>
        </div>
    );
}