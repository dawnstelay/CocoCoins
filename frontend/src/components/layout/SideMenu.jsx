import React from "react";
import { SIDE_MENU_DATA  } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const SideMenu = () => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return <div>SideMenu</div>
};

export default SideMenu;