"use client";
import { use, useEffect, useRef, useState } from "react";
import FlipCard from "../componets/FlipCard";
import Footer from "../componets/Footer";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "../store/usePlayerStore";
import PageLoader from "../componets/PageLoader";
import { handleGiftCards } from "../actions/rewards";
import { toast } from "sonner";

export default function PlayGame() {

    const originalCards = [
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
    ];

    const router = useRouter();
    const setPoints = usePlayerStore((state) => state.setPoints);
    const setPlayerTime = usePlayerStore((state) => state.setPlayerTime);
    const increasePoints = usePlayerStore((state) => state.increasePoints);
    const resetPlayer = usePlayerStore((state) => state.resetPlayer);

    const { playerTime, playerId, points } = usePlayerStore();

    const shuffle = (array) => {
        let m = array.length, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [array[m], array[i]] = [array[i], array[m]];
        }
        return array;
    };


    const cardRefs = useRef([]);
    const [time, setTime] = useState(5);
    const [hasViewingTimeEnded, sethasViewingTimeEnded] = useState(false);

    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [lockBoard, setLockBoard] = useState(false);  // disable clicking temporarily
    const [cardsArr, setCardsArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const playTimeRef = useRef(0);

    const [matchingState, setMatchingState] = useState(null)

    useEffect(() => {

        // check if playerId exists
        if (!playerId) {
            toast.success("Please register to play the game!");
            router.replace('/registration');
            return;
        }
        setIsLoading(false);
        
        const shuffled = shuffle([...originalCards]);
        setCardsArr(shuffled);
    }, [playerId]);

    const handleReward = async (has_won = false) => {
        const data = {
            id: playerId,
            time: playerTime,
            points: points,
            has_won: has_won,
        }
        await handleGiftCards(data);
    }

    // time is exceeded and no points
    const handleGameOver = () => {
        router.replace('/game-over');
    }


    const handleCardClick = (index) => {
        if (lockBoard || selectedCards.includes(index) || matchedCards.includes(index) || !hasViewingTimeEnded) return;

        cardRefs.current[index].reveal();
        const newSelectedCards = [...selectedCards, index];
        setSelectedCards(newSelectedCards);

        if (newSelectedCards.length === 2) {
            setLockBoard(true);
            setTimeout(() => {
                checkMatch(newSelectedCards)
            }, 200);
        }
    };


    const checkMatch = ([firstIndex, secondIndex]) => {

        if (cardsArr[firstIndex] === cardsArr[secondIndex]) {
            setMatchingState("match");

            // increase points by 1
            increasePoints();
            setTimeout(() => {
                cardRefs.current[firstIndex]?.fadeInOut();
                cardRefs.current[secondIndex]?.fadeInOut();
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
                setMatchingState(null);
                setLockBoard(false);
            }, 600);

        } else {
            setMatchingState("no-match");
            setTimeout(() => {
                cardRefs.current[firstIndex]?.hide();
                cardRefs.current[secondIndex]?.hide();
                setMatchingState(null);
                setLockBoard(false);
            }, 600);
        }

        setSelectedCards([]);
    };

    useEffect(() => {
        if (matchedCards.length === cardsArr.length && cardsArr.length > 0) {
            // router.replace('/congratulations');
            handleReward(true);
        }
    }, [matchedCards, cardsArr]);


    // start countdown + reveal cards
    useEffect(() => {
        if (cardsArr.length === 0) return;
        cardRefs.current.forEach((card) => card.reveal());
        playTimeRef.current = 0;

        const timer = setInterval(() => {
            playTimeRef.current += 1;

            setTime(prev => {

                //  this is the total play time that includes the viewing time
                if ( playTimeRef.current === 15) {
                    points >= 1 ? handleReward() : handleGameOver()
                }
                if (prev === 1) {
                    // when timer finishes → flip all back + restart timer
                    cardRefs.current.forEach((card) => card.hide());
                    sethasViewingTimeEnded(true);
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [cardsArr]);



    return (
        <div className="bg-primary-blue flex flex-col items-center min-h-screen">
            <main className="  flex flex-col items-center gap-6 py-8 min-h-[90vh] w-full">
                <h1 className={`text-4xl transition-all duration-500 mt-5 font-bold ${matchingState === 'match' ? 'text-green-500' : matchingState === 'no-match' ? 'text-red-500' : 'text-white'}`} >{!hasViewingTimeEnded ? ` Start memorizing now!` :
                    matchingState === 'match' ? `ITS A MATCH!` : matchingState === 'no-match' ? `NOT A MATCH!` : `PICK CARDS NOW `}</h1>
                <h2 className="text-white mt-3 text-4xl font-bold">
                    {hasViewingTimeEnded ? `You have ${time} seconds...` : `${time} seconds remaining...`}
                </h2>
                <p className="">{points}</p>

                <div className={`grid grid-cols-4 mt-12 gap-2 ${(hasViewingTimeEnded && !lockBoard) ? "pointer-events-auto" : "pointer-events-none"}`}>
                    {cardsArr.map((img, i) => (
                        <FlipCard
                            key={i}
                            img={img}
                            ref={(el) => cardRefs.current[i] = el}
                            handleCardClick={() => handleCardClick(i)}
                        />
                    ))}
                </div>
            </main>
            <Footer />
            {isLoading && <PageLoader />}
        </div>
    );
}
