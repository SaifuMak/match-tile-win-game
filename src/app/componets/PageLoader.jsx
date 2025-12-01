import React from 'react'
import LoaderIcon from './LoaderIcon';

function PageLoader() {
  return (
    <div className=" fixed inset-0 w-full h-full  bg-primary-blue flex items-center justify-center">
      <LoaderIcon className = 'text-3xl text-white animate-spin' />
    </div>
  )
}

export default PageLoader