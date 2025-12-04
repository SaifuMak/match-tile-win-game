
"use client";
import Navbar from "@/app/componets/admin/Navbar";
import Sidebar from "@/app/componets/admin/Sidebar";
import { getWinners } from "@/app/actions/admin";
import ParticipantsTable from "@/app/componets/admin/ParticipantsTable";
import ParticipantsPagination from "@/app/componets/admin/ParticipantsPagination";
import { getPageNumber, getTotalPagesCount } from "@/app/utils/PaginationHelpers";
import Pagination from "@/app/componets/Pagination";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import LoaderIcon from "@/app/componets/LoaderIcon";

export default function WinnersPage() {

    const [participants, setParticipants] = useState([]);
    const [query, setQuery] = useState("");

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const fetchWinners = async (page = 1, query = "") => {
        setIsLoading(true);
        const response = await getWinners(page, query);
        if (response.success) {

            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)
            setCurrentPage(page)
            const totalPages = getTotalPagesCount(response.data.count, 5)
            setTotalPages(totalPages)
            setParticipants(response);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            toast.error("Failed to fetch winners. Please try again.");
        }
    };

    useEffect(() => {
        fetchWinners();
    }, []);


    return (

        <div className="min-h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />
                {/* main content */}

                <div className=" bg-slate-50 mx-5 p-10 rounded-2xl w-full h-full min-h-[97vh] ">
                    <h1 className=" text-3xl font-bold">Winners</h1>

                    {isLoading ? (
                        // Show Loader
                        <div className="flex justify-center items-center min-h-[50vh]">
                            <LoaderIcon className="text-2xl text-primary-blue animate-spin" />
                        </div>
                    ) : participants.success ? (
                        <>
                            <ParticipantsTable data={participants.data} />

                            {participants.data?.results.length > 0 && (
                                <Pagination
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                                    function_to_call={fetchWinners}
                                    currentPage={currentPage}
                                    TotalPages={totalPages}
                                    queryParameter={query}
                                    buttonColor="bg-slate-500"
                                />
                            )}
                        </>
                    ) : (
                        <p className="text-red-500 mt-5">Failed to load Winners</p>
                    )}
                </div>


            </div>
        </div>

    );
}