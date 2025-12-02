'use client';

import Link from "next/link";
import { usePlayerStore } from "../store/usePlayerStore";

export default function GameOverPage() {

    const resetPlayer = usePlayerStore((state) => state.resetPlayer);
    resetPlayer();
    return (
        <div>
            <div className=" bg-primary-blue min-h-screen px-5 flex flex-col items-center justify-center">
                <h1 className="text-white  text-3xl xl:text-4xl font-bold">Game Over</h1>
                <p className="text-white lg:text-xl mt-2 xl:mt-4 text-center">
                    You have failed to complete the game in time. <br />
                    <span className=" text-[15px]">You did not score any points this round.</span>
                </p>

                <Link href="/" className=" px-4 max-lg:text-sm lg:px-6 py-1 cursor-pointer bg-white font-medium text-primary-blue rounded mt-4 xl:mt-6">Back to Home</Link>
            </div>
        </div>
    );
}