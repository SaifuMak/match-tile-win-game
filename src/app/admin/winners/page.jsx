import Navbar from "@/app/componets/admin/Navbar";
import Sidebar from "@/app/componets/admin/Sidebar";

export default function WinnersPage() {
    return (

        <div className="h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />
                {/* main content */}

                <div className=" bg-slate-50 mx-5 p-10 rounded-2xl w-full h-full ">
                    <h1 className=" text-3xl font-bold">Winners</h1>

                    <div className=" w-full h-full flex-center">
                        <p className=" text-2xl "> Welcome to the Winners Page</p>
                    </div>
                </div>


            </div>
        </div>

    );
}