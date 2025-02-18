import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";
import {Popup} from "../common/Popup.jsx";
import notifications from "../../json-data/notifications.json";


function PersonalMenu({showPersonal, setShowPersonal}) {


    const personal = React.useRef(null);

    React.useEffect(() => {
        // close dropdown if click outside
        function close(e) {
            if (!personal.current.contains(e.target)) {
                setShowPersonal(false);
            }
        }
        // add or remove event listener
        if (setShowPersonal) {
            window.addEventListener("click", close);
        }
        // cleanup
        return function removeListener() {
            window.removeEventListener("click", close);
        }
    }, [showPersonal]);


    return (
        <ul ref={personal} className={`profile-nav ${showPersonal ? 'active' : ''}`}>
            <li>
                <Link to="/dashboard-user">Dashboard</Link>
            </li>
            <li>
                <Link to="/settings-personal">Settings</Link>
            </li>
            <li>
                <Link to="#">Log out</Link>
            </li>
        </ul>
)

}

export {PersonalMenu}
