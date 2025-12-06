'use client';
import Navbar from "@/app/componets/admin/Navbar";
import Sidebar from "@/app/componets/admin/Sidebar";
import { useEffect, useState } from "react";
import { getAllRewards, getPrizeDistributionStats } from "@/app/actions/admin";
import PrizeSnapshotCard from "@/app/componets/admin/PrizeSnapShot";
import LoaderIcon from "@/app/componets/LoaderIcon";

export default function GiftsPage() {
    const [vouchers, setVouchers] = useState([])
    const [consolationPrize, setConsolationPrize] = useState(null)
    const [prizeSnapshot, setPrizeSnapshot] = useState(null);
    const [isPrizeHistoryFetching, setIsPrizeHistoryFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    const fetchRewards = async () => {
        // Fetch rewards data from API
        const response = await getAllRewards();
        if (response.success) {
            const rewardsData = response.data;
            setVouchers(rewardsData.vouchers || []);
            setConsolationPrize(rewardsData.consolation || null);
        } else {
            console.error("Failed to fetch rewards:", response.error);
        }
        setIsLoading(false);
    }

    const fetchPrizeDistributionStats = async () => {
        // Fetch prize distribution stats from API
        const response = await getPrizeDistributionStats();
        if (response.success) {
            // Handle the prize distribution stats data
            setPrizeSnapshot(response.data);
        } else {
            console.error("Failed to fetch prize distribution stats:", response.error);
        }
        setIsPrizeHistoryFetching(false);
    }

    useEffect(() => {
        fetchRewards();
        fetchPrizeDistributionStats();
    }, []);

    return (
        <div className=" min-h-screen  w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />
                {/* main content */}

                <div className=" bg-slate-50 mx-5 p-10 rounded-2xl w-full ">
                    <h1 className=" text-3xl font-bold">Rewards</h1>

                    <div className="w-full flex flex-col mt-16">
                        <h2 className="text-2xl font-semibold mb-5">Gift Cards</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-10 max-w-10/12 mt-2">

                            {isLoading ? (

                                <LoaderIcon className="text-xl text-primary-blue animate-spin" />
                            ) : vouchers.length > 0 ? (

                                vouchers.map((voucher) => (
                                    <div
                                        key={voucher.id}
                                        className="px-8 py-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200"
                                    >
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                            {voucher.name}
                                        </h3>

                                        <div className="text-gray-700 space-y-1 text-sm mt-4">
                                            <p className="flex justify-between">
                                                <span className="font-medium">Value:</span>
                                                <span>${voucher.amount}</span>
                                            </p>

                                            <p className="flex justify-between">
                                                <span className="font-medium">Total Quantity:</span>
                                                <span>{voucher.quantity_limit}</span>
                                            </p>

                                            <p
                                                className={`flex justify-between font-medium ${voucher.quantity === 0 ? "text-red-600" : "text-green-600"
                                                    }`}
                                            >
                                                <span>Remaining:</span>
                                                <span>{voucher.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                <p className="text-gray-500">No vouchers available.</p>
                            )}

                        </div>
                    </div>



                    <div className=" w-full  flex flex-col mt-16  ">
                        <h2 className=" text-2xl font-semibold mb-5">Consolation Prizes</h2>
                        <div className=" max-w-[300px] mt-2">
                            {isLoading ? (
                                <LoaderIcon className=' text-xl text-primary-blue animate-spin' />
                            ) : 
                            consolationPrize ? (
                                <div
                                    className="px-8 py-6 bg-white  rounded-xl shadow-sm hover:shadow-md transition duration-200"
                                >
                                    <h3 className="text-2xl font-bold  text-slate-800 mb-2">Bags</h3>
                                    <div className="text-gray-700 space-y-1 text-sm mt-4">

                                        <p className="flex justify-between">
                                            <span className="font-medium">Total Quantity:</span>
                                            <span>1000</span>
                                        </p>

                                        <p className={`flex justify-between font-medium ${consolationPrize.quantity <= 100 ? "text-red-600" : "text-green-600"}`}>
                                            <span className="font-medium">Remaining:</span>
                                            <span >{consolationPrize.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className=" text-gray-500">No consolation prize available.</p>
                            )}
                        </div>

                    </div>

                    <div className=" w-full  flex flex-col mt-16  ">
                        <h2 className=" text-2xl font-semibold mb-5">Weekly Reward History</h2>
                        {isPrizeHistoryFetching ? (
                            <LoaderIcon className=' text-xl text-primary-blue animate-spin' />
                        ) : prizeSnapshot && prizeSnapshot.length > 0 ? null : (
                            <p className=" text-gray-500">No prize history available.</p>
                        )}
                        <PrizeSnapshotCard data={prizeSnapshot} />
                    </div>

                </div>

            </div>
        </div>
    );
}