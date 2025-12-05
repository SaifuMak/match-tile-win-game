"use client";
import { FiCheck } from "react-icons/fi";

export default function ParticipantsTable({ data, handleGiftPrizeStatusChange,handleDeleteParticipant }) {
    if (!data || data?.results.length === 0) {
        return (
            <div className="p-6 mt-32 text-center text-gray-500 text-lg   rounded-xl ">
                No participants found
            </div>
        );
    }

    const tableRowStyle = "py-5 px-3 text-sm  2xl:text-[16px]";
    const tabelHeaderStyle = "px-4 py-5 font-semibold 2xl:text-lg text-gray-700 ";


    return (
        <div className="mt-8 overflow-auto border border-slate-400 rounded-xl  bg-white">
            <table className="w-full  text-left border-collapse">

                <thead className="  bg-white text-gray-700 font-medium">
                    <tr>
                        <th className={tabelHeaderStyle}>Name</th>
                        <th className={tabelHeaderStyle}>Email</th>
                        <th className={tabelHeaderStyle}>Phone</th>
                        <th className={tabelHeaderStyle}>City</th>
                        <th className={tabelHeaderStyle}>Won</th>

                        <th className={tabelHeaderStyle}>Reward</th>
                        <th className={tabelHeaderStyle}>Receipt</th>

                        <th className={tabelHeaderStyle}>Played On</th>
                        <th className={tabelHeaderStyle}>Reward Claimed</th>

                        <th className={tabelHeaderStyle}>Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {data?.results.map((p, index) => (
                        <tr key={index} className="border-t border-slate-400 hover:bg-gray-50 transition">
                            <td className={tableRowStyle}>{p.name}</td>
                            <td className={tableRowStyle}>{p.email}</td>
                            <td className={tableRowStyle}>{p.phone}</td>
                            <td className={tableRowStyle}>{p.city}</td>
                            <td className={tableRowStyle}>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-semibold ${p.has_won ? "bg-green-200 text-green-800" : "bg-red-200 text-red-700"
                                        }`}
                                >
                                    {p.has_won ? "Yes" : "No"}
                                </span>
                            </td>
                            <td className={tableRowStyle}>{p.reward ? `$${p.reward}` : "Consolation"}</td>

                            <td className={tableRowStyle}>
                                {p.invoice_public_url ? <a href={p.invoice_public_url} className="text-white ml-3 text-sm bg-slate-500 px-2 py-0.5 rounded-sm " target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
                            </td>
                            <td className={tableRowStyle}>{p.played_at}</td>
                            <td onClick={() => handleGiftPrizeStatusChange(p, !p.is_prize_claimed)} className={tableRowStyle}>
                                <span
                                    className={` mx-auto size-5 2xl:size-6 rounded-full  flex items-center cursor-pointer justify-center ${p.is_prize_claimed ? "bg-green-100 text-green-800" : " border border-slate-400 hover:bg-gray-100"
                                        }`}
                                >
                                    {p.is_prize_claimed && <FiCheck size={16} />}
                                </span>

                            </td>
                            <td className={tableRowStyle}>
                                <span onClick={() => handleDeleteParticipant(p)} className=" bg-red-100 mx-auto hover:bg-red-200 text-red-800 px-2 py-1 text-sm rounded cursor-pointer">Delete</span>
                                {/* Actions column content can be added here */}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}
