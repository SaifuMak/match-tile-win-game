'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { SIDEBAR_ITEMS } from '@/app/constants/admin';
import { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const handleTabSelection = (path) => {
        router.push(path)
    }
    const [isOpen, setIsOpen] = useState(true);

    
    return (
        <div className="flex flex-col  h-screen">

            <div className="w-full h-20 mt-1  flex items-center justify-end px-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className=" bg-slate-50 cursor-pointer text-black px-2 text-xl py-1 rounded"
                >
                    {isOpen ? <IoIosArrowForward className=' rotate-180' /> : <IoIosArrowForward />}
                </button>
            </div>

            <div
                className={`${isOpen ? "w-[250px] px-4" : "w-[55px] px-2"
                    } transition-all duration-700 ease-in-out text-black rounded-tr-4xl min-h-screen bg-brand-blue`}
            >
                <div className="space-y-6 mt-10">
                    {SIDEBAR_ITEMS?.map((item, index) => (
                        <div
                            onClick={() => handleTabSelection(item.path)}
                            key={index}
                            className={`transition-all duration-300 ease-in-out  h-10  cursor-pointer flex  items-center ${pathname === item.path
                                ? "bg-slate-50 rounded-sm  pl-3"
                                : " pl-3"
                                }`}
                        >
                            <item.icon className={` size-5 object-contain mr-3  ${pathname === item.path ? "text-black" : "text-black"}`} />
                            {isOpen && <span className=' text-nowrap'>{item.name}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar