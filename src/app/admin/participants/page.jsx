import Navbar from "@/app/componets/admin/Navbar";
import Sidebar from "@/app/componets/admin/Sidebar";
import { getParticipants } from "@/app/actions/admin";
import ParticipantsTable from "@/app/componets/admin/ParticipantsTable";
import ParticipantsPagination from "@/app/componets/admin/ParticipantsPagination";

export default async function ParticipantsPage() {

    const participants = await getParticipants();

    console.log('Participants data:', participants);

    return (

        <div className="h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />
                {/* main content */}


                <div className=" bg-slate-50 mx-5 p-10 rounded-2xl w-full h-full ">
                    <h1 className=" text-3xl font-bold">Participants</h1>
                    {participants.success ? (
                        <>
                            <ParticipantsTable data={participants.data} />
                            <ParticipantsPagination data={participants.data} getParticipants={getParticipants} />
                        </>
                    ) : (
                        <p className=" text-red-500 mt-5 ">Failed to load participants</p>
                    )}
                </div>
            </div>
        </div>

    );
}