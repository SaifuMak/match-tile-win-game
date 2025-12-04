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
        <div className=" flex flex-col bg-primary-blue min-h-screen  ">

            <div className=" flex justify-center  ">
                <Footer />
            </div>
            <div className="  text-center min-h-[80vh] flex flex-col items-center lg:justify-center max-lg:mt-12 px-5">

                {localWinStatus && localRewards ? (
                    <>
                        <h1 className="text-[#F9F523] text-2xl 2xl:text-[40px] font-bold">CONGRATS, YOU WON {localRewards && localRewards > 0 && <span className="">A ${localRewards}  Gift Card!</span>}</h1>
                        {/* {localRewards && localRewards > 0 && <p className="text-[#F9F523] 2xl:text-4xl text-2xl lg:text-3xl font-bold mt-2 2xl:mt-6 ">${localRewards} Gift Card</p>} */}

                        <p className="2xl:text-[36px] lg:max-w-7/12 lg:text-3xl text-lg text-white  lg:font-semibold mt-7">Collect your prize from our Kiosk located opposite Target, between 11am–2pm daily.</p>
                    </>

                ) : (
                    localPlayerId ? (
                        <>
                            <h1 className="text-[#F9F523] text-4xl xl:text-5xl 2xl:text-6xl font-bold">TIME OVER!</h1>
                            <p className="2xl:text-5xl text-2xl lg:text-3xl text-white font-bold mt-5 lg:mt-7 2xl:mt-10 ">But you have won a prize.</p>
                            {/* <p className=" 2xl:text-[30px] lg:max-w-7/12 lg:text-3xl text-lg text-white  lg:font-semibold mt-4">Please collect at Customer Service Desk.</p> */}
                        <p className="2xl:text-[36px] lg:max-w-7/12 lg:text-3xl text-lg text-white  lg:font-semibold mt-7">Collect your prize from our Kiosk located opposite Target, between 11am–2pm daily.</p>

                        </>
                    ) : (
                        <>

                        </>)

                )}
                <Link href="/" className=" px-4 lg:px-6 py-1 cursor-pointer max-lg:text-sm bg-white font-medium text-primary-blue rounded mt-3 2xl:mt-6">Back to Home</Link>

            </div>

        </div>
    );
}