'use client'

import { getPageNumber, getTotalPagesCount } from '@/app/utils/PaginationHelpers'
import { useState, useEffect } from 'react'
import Pagination from '../Pagination';


function ParticipantsPagination({ data, getParticipants }) {

    const [query, setQuery] = useState("");

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        // setCurrentPage(page)
        const nextpage = getPageNumber(data.next)
        const previous = getPageNumber(data.previous)
        setNextPage(nextpage)
        setPrevPage(previous)

        const totalPages = getTotalPagesCount(data.count, 5)
        setTotalPages(totalPages)
    }, [data]);


    return (
        <div className="">
            {data?.results.length > 0 && (<Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                function_to_call={getParticipants}
                currentPage={currentPage}
                TotalPages={totalPages}
                queryParameter={query}
                buttonColor='bg-slate-500'
            />)}
        </div>
    )
}

export default ParticipantsPagination