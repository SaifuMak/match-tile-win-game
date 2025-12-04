import React from 'react'

function Footer() {
    return (
        <div className=" flex max-sm:flex-col max-sm:mt-10 mt-5  max-sm:space-y-4 justify-center  sm:justify-between w-10/12  items-center">

            {/* Left Image - BE UNITED AT CHRISTMAS */}
            <img
                src="/images/BE-logo.png"
                alt="Be United At Christmas"
                className="xl:h-16 lg:h-10 h-6 w-auto md:object-cover "
            />

            {/* Right Image - BRIMBANK SHOPPING CENTRE */}
            <img
                src="/images/brimbank-logo.jpg"
                alt="Brimbank Shopping Centre Logo"
                className="xl:h-24 lg:h-16 h-12 w-auto md:object-cover "
            />

        </div>

    )
}

export default Footer