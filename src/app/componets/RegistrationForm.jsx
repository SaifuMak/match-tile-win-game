"use client";
import { registerUser } from "../actions/auth";
import { useState } from "react";
import LoaderIcon from "./LoaderIcon";
import { toast } from "sonner";
import { usePlayerStore } from "../store/usePlayerStore";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
    const inputClass =
        "w-full p-3 xl:p-4 xl:mb-8 mb-5 bg-white caret-primary-blue text-primary-blue font-medium text-[15px] xl:text-lg outline-none";
    const labelClass = "text-white text-[15px] font-medium xl:text-xl block mb-2 text-center";

    const [isLoading, setIsLoading] = useState(false);

    const setPlayerId = usePlayerStore((state) => state.setPlayerId);
    const setPoints = usePlayerStore((state) => state.setPoints);
    const resetPlayer = usePlayerStore((state) => state.resetPlayer);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        toast.dismiss();

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            city: formData.get("city"),
        };

        const result = await registerUser(data);
        setIsLoading(false);

        if (result.success) {
            setPlayerId(result.data.user_id);
            setPoints(0);

            toast.success("Registration successful! please start the game.");
            e.target.reset();
            router.push('/play-game');
        } else {
            resetPlayer();
            toast.error(`Registration failed: ${result.error}`);
        }
    };


    return (
        <div className="flex justify-center  items-center max-lg:mb-10 ">
            <form className="lg:w-[600px]  text-center mt-12" onSubmit={handleSubmit}>

                <label className={labelClass}>Full Name:</label>
                <input type="text" name="fullName" className={inputClass} required />

                <label className={labelClass}>Email Address:</label>
                <input type="email" name="email" className={inputClass} required />

                <label className={labelClass}>Phone Number:</label>
                <input type="tel" name="phone" className={inputClass} required />

                <label className={labelClass}>Suburb/City:</label>
                <input type="text" name="city" className={inputClass} required />


                <button type="submit" className=" mt-5 xl:w-[190px] flex-center mx-auto w-[170px] xl:h-[50px] h-[40px] cursor-pointer  bg-white text-primary-blue xl:text-xl font-semibold rounded-md hover:bg-gray-200 transition">
                    {isLoading ? <LoaderIcon /> : "START"}
                </button>
            </form>
        </div>
    );
}
