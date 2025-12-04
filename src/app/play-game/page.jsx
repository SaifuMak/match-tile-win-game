"use client";
import { use, useEffect, useRef, useState } from "react";
import FlipCard from "../componets/FlipCard";
import Header from "../componets/Header";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "../store/usePlayerStore";
import PageLoader from "../componets/PageLoader";
import { handleGiftCards } from "../actions/rewards";
import { toast } from "sonner";
import Brimbank from "../componets/Brimbank";

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
    const setRewards = usePlayerStore((state) => state.setRewards);
    const setWinStatus = usePlayerStore((state) => state.setWinStatus);

    const { playerId, points } = usePlayerStore();

    const shuffle = (array) => {
        let m = array.length, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [array[m], array[i]] = [array[i], array[m]];
        }
        return array;
    };

    const cardRefs = useRef([]);
    const [time, setTime] = useState(11);
    const [hasViewingTimeEnded, sethasViewingTimeEnded] = useState(false);

    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [lockBoard, setLockBoard] = useState(false);  // disable clicking temporarily
    const [cardsArr, setCardsArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const playTimeRef = useRef(0);
    const rewardTriggered = useRef(false);

    
    const [matchingState, setMatchingState] = useState(null)

    useEffect(() => {
        // check if playerId exists
        if (!playerId) {
            toast.dismiss();

            toast.success("Please register to play the game!");
            router.replace('/registration');
            return;
        }
        setIsLoading(false);

        const shuffled = shuffle([...originalCards]);
        setCardsArr(shuffled);
    }, [playerId]);


    const handleReward = async (has_won = false) => {
        if (rewardTriggered.current) return;
        setIsLoading(true);
        rewardTriggered.current = true;

        const data = {
            id: playerId,
            time: playTimeRef.current - 11, // exclude viewing time 
            points: points,
            has_won: has_won,
        }

        const response = await handleGiftCards(data);
        rewardTriggered.current = false;

        if (response.success) {
            console.log("Reward response: ", response.data?.reward);
            setRewards(response.data?.reward || null);
            response.data?.win_status ? setWinStatus(true) : setWinStatus(false);
            router.replace('/congratulations');

        } else {
            setPoints(0);
            setRewards(0);
            setWinStatus(false);
            // toast.error(response.error || "An error occurred while processing rewards.");
            router.replace('/game-ended');
        }
        setTimeout(() => {
            setIsLoading(false);

        }, 800);
    }

    // time is exceeded and no points
    const handleGameTimeOut = () => {
        setIsLoading(true);
        setTimeout(() => {
            router.replace('/game-over');
        }, 1000);
    }

    const handleGameOver = () => {
        if (rewardTriggered.current) return;
        const currentPoints = usePlayerStore.getState().points;
        console.log(" these points are: ", currentPoints);
        currentPoints >= 1 ? handleReward() : handleGameTimeOut()
    };


    const handleCardClick = (index) => {
        if (lockBoard || selectedCards.includes(index) || matchedCards.includes(index) || !hasViewingTimeEnded) return;

        cardRefs?.current[index]?.reveal();
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
                cardRefs?.current[firstIndex]?.fadeInOut();
                cardRefs?.current[secondIndex]?.fadeInOut();
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
                setMatchingState(null);
                setLockBoard(false);
            }, 600);

        } else {
            setMatchingState("no-match");
            setTimeout(() => {
                cardRefs?.current[firstIndex]?.hide();
                cardRefs?.current[secondIndex]?.hide();
                setMatchingState(null);
                setLockBoard(false);
            }, 600);
        }

        setSelectedCards([]);
    };

    // this handles winning condition where all cards are matched
    useEffect(() => {
        if (matchedCards.length === cardsArr.length && cardsArr.length > 0) {
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
                if (playTimeRef.current === 51) {
                    handleGameOver();

                }
                if (prev === 1) {
                    // when timer finishes → flip all back + restart timer
                    cardRefs.current.forEach((card) => card.hide());
                    sethasViewingTimeEnded(true);
                    return 40;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [cardsArr]);



    return (
        <div className="bg-primary-blue flex flex-col items-center min-h-screen">
            <Header />

            <main className="  flex flex-col items-center gap-1 lg:gap-6 lg:-mt-10  max-lg:mb-0  lg:min-h-[90vh] min-h-[70vh] w-full">
                <h1 className={`2xl:text-4xl text-2xl lg:text-3xl transition-all duration-500 mt-5 font-bold ${matchingState === 'match' ? 'text-green-500' : matchingState === 'no-match' ? 'text-red-500' : 'text-white'}`} >{!hasViewingTimeEnded ? ` Start memorising now!` :
                    matchingState === 'match' ? `ITS A MATCH!` : matchingState === 'no-match' ? `NOT A MATCH!` : `PICK CARDS NOW `}</h1>
                <h2 className="text-white lg:mt-3 text-xl lg:text-3xl 2xl:text-4xl font-bold">
                    {hasViewingTimeEnded ? `You have ${time} seconds...` : `${time} seconds remaining...`}
                </h2>

                <div className={`grid grid-cols-3  lg:grid-cols-4 mt-5 lg:mt-8 2xl:mt-12 gap-2 ${(hasViewingTimeEnded && !lockBoard) ? "pointer-events-auto" : "pointer-events-none"}`}>
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
            <Brimbank/>
            {isLoading && <PageLoader />}
        </div>
    );
}
