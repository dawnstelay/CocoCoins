import { 
    LuLayoutDashboard,
    LuHandsCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Home",
        icon: LuLayoutDashboard,
        path: "/home",
    }, 

    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },

    {
        id: "03",
        label: "Expenses",
        icon: LuHandsCoins,
        path: "/expense"
    },

    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];