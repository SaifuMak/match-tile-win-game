

function Pagination({ prevPage, nextPage, function_to_call, currentPage, TotalPages, queryParameter = null, buttonColor, innerClass = 'flex justify-between w-7/12' }) {
    return (
        <div className="flex justify-end  lg:px-8 my-8 space-x-4 text-sm text-dark-28  ">
            <div className={`${innerClass}`}>
                <div className="space-x-8 ">
                    <button onClick={() => function_to_call(prevPage, queryParameter)} disabled={prevPage < 1} className={`px-6 py-1.5  rounded-sm  text-white font-medium  ${prevPage > 0 ? ` ${buttonColor} cursor-pointer` : `${buttonColor} opacity-50 `} bg-custom-dark-orange `}>prev</button>

                    <button onClick={() => function_to_call(nextPage, queryParameter)} disabled={nextPage == null} className={`px-6 py-1.5 rounded-sm text-white font-medium  ${nextPage ? `${buttonColor} cursor-pointer` : `${buttonColor} opacity-50`} `}>next</button>
                </div>
                <p className="flex items-center justify-center ">page <span className="flex items-center justify-center shrink-0  max-sm:px-1.5 lg:px-2 mx-1  bg-slate-100">{currentPage} </span>  of {TotalPages}</p>
            </div>
        </div>
    )
}

export default Pagination