import Header from "./componets/Header";
import Banner from "./componets/Banner";
import Link from "next/link";
import Brimbank from "./componets/Brimbank";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden  bg-primary-blue flex flex-col lg:mt-5 pb-10 items-center justify-start">

      <Banner />
      <Header />

      <section className="max-w-3xl max-lg:px-6  max-lg:mt-10 text-white text-center">

        <h1 className="2xl:text-[40px] lg:text-3xl text-2xl font-bold">PLAY & WIN GIFT CARDS</h1>

        <h2 className="2xl:text-3xl lg:text-2xl text-xl font-semibold  mt-7 2xl:mt-12">GAME RULES</h2>

        <div className=" mx-auto mt-6 2xl:mt-10 text-left text-[17px]  leading-0 ">

          <ul className="list-disc pl-6  text-white lg:font-medium leading-6">
            <li>You will see 12 cards on the screen (6 cards shown twice).</li>
            <li>All cards stay face-up for 10 seconds to help you memorise their positions.</li>
            <li>After 10 seconds, the cards flip face-down and the 40-second game timer starts.</li>
            <li>Tap a card to reveal it, then tap another card.</li>
            <li>If the two cards match, they disappear.</li>
            <li>If they don’t match, they flip back down.</li>
            <li>Keep matching pairs until all 6 pairs are cleared.</li>
            <li>If you finish matching all cards within 40  seconds, you win the game.</li>
          </ul>

        </div>

        <Link href="/registration" className="2xl:mt-10 mt-7 px-8 2xl:py-2 inline-block cursor-pointer py-1.5 bg-white text-primary-blue xl:text-xl font-semibold rounded-md hover:bg-gray-200 transition">
          PLAY GAME
        </Link>

        <Brimbank />

      </section>

    </main>
  );
}
