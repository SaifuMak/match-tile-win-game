import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { GoGift } from "react-icons/go";

export const SIDEBAR_ITEMS = [
    { icon: MdOutlineSpaceDashboard, name: "Dashboard", path: "/admin/dashboard" },
    { icon: FaRegUser, name: "Participants", path: "/admin/participants" },
    { icon: GoTrophy, name: "Winners", path: "/admin/winners" },
    { icon: GoGift, name: "Rewards", path: "/admin/rewards" },

   
];