import React from 'react'

function PrizeSnapShot({ data }) {
    return (
        <div className="rounded-xl w-full grid grid-cols-2 xl:grid-cols-3 gap-6">
            {data && Object.values(data)?.map((record, ind) => (
                <div key={ind} className="my-4 bg-white p-6 rounded-xl">

                    {/* Week Title */}
                    <h2 className="font-semibold text-lg mb-3">
                       {record.title}
                    </h2>

                    {/* Rewards Header */}
                    <div className="w-full flex mb-2 font-semibold justify-between">
                        <p>Reward</p>
                        <p>Claimed</p>
                    </div>

                    {/* Loop through rewards */}
                    <ul className="space-y-1">
                        {Object.entries(record.rewards).map(([reward, count], rewardIndex) => (
                            <li key={rewardIndex} className="w-full flex justify-between">
                                <span>${reward} Gift Card</span>
                                <span>{count}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Consolation */}
                    <div className="w-full mt-2 flex justify-between pt-2">
                        <span>Consolation Prize</span>
                        <span>{record.consolation}</span>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default PrizeSnapShot