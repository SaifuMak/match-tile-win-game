'use client';

import Link from "next/link";
import { usePlayerStore } from "../store/usePlayerStore";

export default function GameOverPage() {

    const resetPlayer = usePlayerStore((state) => state.resetPlayer);
    resetPlayer();
    return (
        <div>
            <div className=" bg-primary-blue min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl font-bold">Game Over</h1>
                <p className="text-white text-xl mt-4 text-center">
                    You have failed to complete the game in time. <br />
                    <span className=" text-[15px]">You did not score any points this round.</span>
                </p>

                <Link href="/" className=" px-6 py-1 cursor-pointer bg-white font-medium text-primary-blue rounded mt-6">Try Again</Link>
            </div>
        </div>
    );
}