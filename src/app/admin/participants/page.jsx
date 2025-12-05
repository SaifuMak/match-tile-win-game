
"use client";
import Navbar from "@/app/componets/admin/Navbar";
import Sidebar from "@/app/componets/admin/Sidebar";
import { getParticipants, getAllParticipants } from "@/app/actions/admin";
import ParticipantsTable from "@/app/componets/admin/ParticipantsTable";
import ParticipantsPagination from "@/app/componets/admin/ParticipantsPagination";
import { getPageNumber, getTotalPagesCount } from "@/app/utils/PaginationHelpers";
import Pagination from "@/app/componets/Pagination";
import LoaderIcon from "@/app/componets/LoaderIcon";
import SearchComponent from "@/app/componets/admin/SearchComponent";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { exportToExcel } from "@/app/utils/ExportToExcel";
import { updatePrizeClaimStatus } from "@/app/actions/admin";


import { useState, useEffect } from "react";
import { toast } from "sonner";
import VerifyModal from "@/app/componets/admin/VerifyModal";

export default function ParticipantsPage() {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const [participants, setParticipants] = useState([]);
    const [query, setQuery] = useState("");

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const [isRequesting, setIsRequesting] = useState(false)

    const [giftPrizeStatus, setGiftPrizeStatus] = useState({ participant: null, status: false })
    const [giftClaimModal, setGiftClaimModal] = useState(false)

    const handleGiftPrizeStatusChange = (participant, status) => {
        setGiftPrizeStatus({ participant, status });
        setGiftClaimModal(true);
    }

    const handleUnclaimPrize = () => {
        setGiftClaimModal(false);
        setGiftPrizeStatus({ participant: null, status: false });
    }

    const handleVerifyPrizeClaim = async (participant) => {
        // Call API to verify prize claim
        setIsRequesting(true);
        const response = await updatePrizeClaimStatus(participant.id);
        if (response.success) {
            toast.success(response.data.message || "Prize claim status updated successfully.");
            handleUnclaimPrize();
            fetchParticipants(currentPage, query)
            setIsRequesting(false);
        }
        else {
            toast.error("Failed to verify prize claim. Please try again.");
            setIsRequesting(false);
        }
    }

    const fetchParticipants = async (page = 1, query = "") => {
        setIsLoading(true);
        const response = await getParticipants(page, query);
        if (response.success) {
            console.log(response)

            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)
            setCurrentPage(page)
            const totalPages = getTotalPagesCount(response.data.count, 5)
            setTotalPages(totalPages)
            setParticipants(response);
            setIsLoading(false);

        }
        else {
            toast.error("Failed to fetch participants. Please try again.");
            setIsLoading(false);
        }
    };

    const onSearch = (query) => {
        fetchParticipants(1, query)
    }

    const handleExport = (data) => {

        const formattedData = data.map((item) => ({
            "Name": item.name || "",
            "Email": item.email || "",
            "Phone": item.phone || "",
            "City": item.city || "",
            "Has Played": item.has_played ? "Yes" : "No",
            "Reward Won": item.reward ?? "",
            "Has Won": item.has_won ? "Yes" : "No",
            "Played At": item.played_at || "",
            "Time Taken (secs)": item.time_taken || "",
            "Retailer": item.retailer || "",
            "Amount Spent": item.amount_spent || "",
            "Invoice URL": item.invoice_public_url || item.invoice || "",
        }));

        exportToExcel(formattedData, "Participants");
    };


    const getAllParticipantsAndExport = async () => {
        setIsLoading(true);
        const response = await getAllParticipants();
        if (response.success) {
            handleExport(response.data);
        } else {
            toast.error("Failed to fetch all participants for export. Please try again.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchParticipants();
    }, []);


    return (

        <div className="min-h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />
                {/* main content */}

                <div className="bg-slate-50 relative mx-5 p-10 rounded-2xl w-full min-h-[97vh]">
                    <div className=" flex justify-between items-center ">
                        <h1 className="text-3xl font-bold">Participants</h1>
                        <button onClick={getAllParticipantsAndExport} className=" cursor-pointer  bg-black/90 text-white text-sm  rounded-md px-4 py-1.5 font-medium  mx-10">Export Data</button>

                        <div className="flex-1 max-w-2xl ml-auto">
                            <SearchComponent onSearch={onSearch} query={query} setQuery={setQuery} />
                        </div>
                    </div>

                    {isLoading ? (
                        // Show Loader
                        <div className="flex justify-center items-center min-h-[50vh]">
                            <LoaderIcon className="text-2xl text-primary-blue animate-spin" />
                        </div>
                    ) : participants.success ? (
                        <>
                            <ParticipantsTable data={participants.data} handleGiftPrizeStatusChange={handleGiftPrizeStatusChange} />

                            {participants.data?.results.length > 0 && (
                                <Pagination
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                                    function_to_call={fetchParticipants}
                                    currentPage={currentPage}
                                    TotalPages={totalPages}
                                    queryParameter={query}
                                    buttonColor="bg-slate-500"
                                />
                            )}
                        </>
                    ) : (
                        <p className="text-red-500 mt-5">Failed to load participants</p>
                    )}
                </div>
                <VerifyModal
                    open={giftClaimModal}
                    onClose={() => setGiftClaimModal(false)}
                    participant={giftPrizeStatus.participant}
                    onVerify={handleVerifyPrizeClaim}
                    onUnclaim={handleUnclaimPrize}
                    isRequesting={isRequesting}
                />

            </div>
        </div>

    );
}