// import React from 'react'

// function PrizeSnapShot({ data}) {
//    return (
//         <div className=" rounded-xl  w-full  grid grid-cols-3  space-x-10  ">
            
//             {data?.map((record) => (
//                 <div key={record.id} className="my-4     bg-white p-6 rounded-xl  pb-4">

//                     <h2 className="font-bold text-lg mb-3">
//                        {record.recorded_at}
//                     </h2>

//                     <div className="w-full flex mb-2 font-semibold justify-between">
//                         <p>Name</p>
//                         <p>Claimed</p>
//                     </div>

//                     {/* Prize list */}
//                     <ul className="space-y-1">
//                         {record.snapshot.prizes.map((prize, index) => (
//                             <li key={index} className="w-full flex justify-between">
//                                 <span>{prize.name}</span>
//                                 <span>{prize.quantity_limit - prize.quantity}</span>
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Consolation */}
//                     <div className=" w-full mt-2 flex justify-between">
                        
//                         <span className="">Consolation Prize</span>
//                         <span className="">{1000 -record.snapshot.consolation.quantity}</span>
                          
//                         </div>
//                 </div>
//             ))}

//         </div>
//     );
// }

// export default PrizeSnapShot