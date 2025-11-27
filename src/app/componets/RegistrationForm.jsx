"use client";
import { registerUser } from "../actions/auth";

export default function RegistrationForm() {
    const inputClass =
        "w-full p-3 xl:p-4 xl:mb-8 mb-5 bg-white caret-primary-blue text-primary-blue font-medium text-[15px] xl:text-lg outline-none";
    const labelClass = "text-white text-[15px] font-medium xl:text-xl block mb-2 text-center";


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            city: formData.get("city"),
        };

        const result = await registerUser(data);

        if (result.success) {
            alert("Registration successful!");
            e.target.reset();
        } else {
            alert(`Registration failed: ${result.error}`);
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


                <button type="submit" className=" mt-5 xl:w-[190px] w-[170px] xl:h-[50px] h-[40px] cursor-pointer  bg-white text-primary-blue xl:text-xl font-semibold rounded-md hover:bg-gray-200 transition">
                    START
                </button>
            </form>
        </div>
    );
}
