import React from 'react'
import { LuLoaderCircle } from "react-icons/lu";

function LoaderIcon({className = ' text-xl text-primary-blue animate-spin'}) {
    return (
        <LuLoaderCircle className={className} />
    )
}

export default LoaderIcon