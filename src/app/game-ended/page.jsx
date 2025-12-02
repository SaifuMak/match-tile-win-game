
import Link from "next/link";

export default function GameEndedPage() {

    return (
        <div>
            <div className="bg-primary-blue text-center px-5 min-h-screen flex flex-col items-center justify-center ">
                <h1 className="text-white text-2xl lg:text-4xl font-bold">Something Went Wrong</h1>

                <p className="text-white lg:text-xl mt-4 text-center">
                    An error occurred while processing your result. <br />
                    <span className="text-[15px]">Please play the game again.</span>
                </p>

                <Link
                    href="/play-game"
                    className="px-6 py-1 cursor-pointer bg-white font-medium text-primary-blue rounded mt-6"
                >
                    Play Again
                </Link>
            </div>
        </div>

    );
}