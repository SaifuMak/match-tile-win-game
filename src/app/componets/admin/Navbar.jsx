'use client'
import { LuLoaderCircle } from "react-icons/lu";
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from 'sonner';
import { SIDEBAR_ITEMS } from "@/app/constants/admin";
import AXIOS_INSTANCE from "../../../../lib/axios";
import { FaPowerOff } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {

    const pathname = usePathname()
    const router = useRouter()
    // const [itemName, setItemName] = useState('');
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [isChangePasswordModal, setIsChangePasswordModal] = useState(false)
    const [loading, setloading] = useState(false)


    // useEffect(() => {
    //     const item = SIDEBAR_ITEMS.find(item => item.path === pathname)
    //     if (item) setItemName(item.name)
    // }, [pathname])


    const handleLogout = async () => {
        setloading(true)
        try {
            const response = await AXIOS_INSTANCE.post(`logout/`, {});
            toast.success('Logged out successfully')
            router.replace("/login");

        } catch (error) {
            toast.error(error?.response?.data?.error)

        } finally {
            setloading(false)
        }

    }


    return (
        <>
            <div className=" min-h-4 my-4 px-10   flex justify-end ">
                <div onClick={handleLogout} className=" flex-center cursor-pointer px-3 py-1.5  hover:ring ring-slate-300  rounded-md space-x-2 hover:bg-slate-50">
                    {loading ? (
                        <div className=" ">
                            <LuLoaderCircle className="  size-6 object-contain animate-spin" />
                        </div>

                    ) : (
                        <LuLogOut className=" font-light size-6 object-contain" />
                    )}
                    <p className=" font-semibold">Logout</p>
                </div>

            </div>
        </>
    )
}

export default Navbar