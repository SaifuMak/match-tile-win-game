"use client";
import { registerUser } from "../actions/auth";
import { useState, useRef } from "react";
import LoaderIcon from "./LoaderIcon";
import { toast } from "sonner";
import { usePlayerStore } from "../store/usePlayerStore";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
    const inputClass =
        "w-full p-3 xl:p-2 xl:mb-5 mb-2 bg-white caret-primary-blue text-primary-blue font-medium text-[15px] xl:text-lg outline-none";
    const labelClass = "text-white text-[15px] font-medium xl:text-xl block mb-2 text-center";

    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const setPlayerId = usePlayerStore((state) => state.setPlayerId);
    const setPoints = usePlayerStore((state) => state.setPoints);
    const resetPlayer = usePlayerStore((state) => state.resetPlayer);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please upload your invoice file.");
            return;
        }
        const formData = new FormData(e.currentTarget);
        if (formData.get("spendAmount") < 20) {
            toast.error("Spend amount must be at least 20 dollars.");
            return;
        }
        setIsLoading(true);
        toast.dismiss();

        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.get("fullName"));
        formDataToSend.append("email", formData.get("email"));
        formDataToSend.append("phone", formData.get("phone"));
        formDataToSend.append("city", formData.get("city"));
        formDataToSend.append("retailer", formData.get("retailer"));
        formDataToSend.append("amount_spent", formData.get("spendAmount"));
        formDataToSend.append("invoice", selectedFile);

        const result = await registerUser(formDataToSend);
        setIsLoading(false);

        if (result.success) {
            setPlayerId(result.data.user_id);
            setPoints(0);

            toast.success("Registration successful! please start the game.");
            e.target.reset();
            fileInputRef.current.value = null;
            setSelectedFile(null);

            router.push('/play-game');
        } else {
            resetPlayer();
            toast.error(`Registration failed: ${result.error}`);
        }
    };


    return (
        <div className="flex justify-center  items-center max-lg:mb-10 ">
            <form className="lg:w-[500px]  w-full   text-center mt-12" onSubmit={handleSubmit}>

                <label className={labelClass}>Full Name:</label>
                <input type="text" name="fullName" className={inputClass} required />

                <label className={labelClass}>Email Address:</label>
                <input type="email" name="email" className={inputClass} required />

                <label className={labelClass}>Phone Number:</label>
                <input type="tel" name="phone" className={inputClass} required />

                <label className={labelClass}>Suburb/City:</label>
                <input type="text" name="city" className={inputClass} required />

                <label className={labelClass}>Retailer:</label>
                <input type="text" name="retailer" className={inputClass} required />

                <label className={labelClass}>Spend Amount:</label>
                <input type="number" name="spendAmount" className={inputClass} required onInput={(e) => {
                    // Remove anything that is not a digit
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }} />

                <label className={labelClass}>
                    Upload your Invoice <span className="text-xs  font-normal">(PDF/DOC/DOCX)</span>
                </label>
                <div className="flex items-center w-full  bg-white p-3 xl:p-2 xl:mb-5 mb-2  ">
                    <input
                        type="file"
                        ref={fileInputRef}
                        id="invoice-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="hidden"
                    />
                    <label
                        htmlFor="invoice-upload"
                        className="px-3 lg:py-1 py-0.5 max-lg:text-sm text-nowrap  bg-primary-blue text-white rounded cursor-pointer font-medium"
                    >
                        Choose File
                    </label>
                    <p className="ml-3 text-primary-blue text-sm max-lg:text-xs max-w-[190px] truncate">
                        {selectedFile ? selectedFile.name : "No file chosen"}
                    </p>

                </div>


                <button type="submit" className=" mt-10 lg:mt-12 xl:w-[190px] flex-center mx-auto w-[170px] xl:h-[45px] h-[40px] cursor-pointer  bg-white text-primary-blue xl:text-xl font-semibold rounded-md hover:bg-gray-200 transition">
                    {isLoading ? <LoaderIcon /> : "START"}
                </button>
            </form>
        </div>
    );
}
