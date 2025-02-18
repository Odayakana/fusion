import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";
import {Popup} from "../common/Popup.jsx";
import notifications from "../../json-data/notifications.json";


function Notifications({showNotifictains, setShowNotifictains, notifications}) {

    function timeDelta (timeNew, time) {


        const diff = (timeNew - time) >= 0 ? (timeNew - time) : 0;
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const millisecondsInAnHour = 60 * 60 * 1000;
        const millisecondsInAMinute = 60 * 1000;
        const days = Math.floor(diff / millisecondsInADay);
        const hours = Math.floor((diff % millisecondsInADay) / millisecondsInAnHour);
        const minutes = Math.floor((diff % millisecondsInAnHour) / millisecondsInAMinute);
        const seconds = Math.floor((diff % millisecondsInAMinute) / 1000);

        return {
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
        }
    }

    const notifLeng = notifications.length;

    const NotifItem = notifications.map((item, index) => {
        const timeDif = timeDelta(Date.now(), item.time)

        return (
            <div key={index} className="notification">
                <div className="text">
                    {item.text}
                </div>
                <div className="time">
                    {timeDif.days? `${timeDif.days}d ` : ''}{timeDif.hours? `${timeDif.hours}h ` : timeDif.minutes? `${timeDif.minutes}min ` : ''} ago
                </div>
            </div>

        );
    });

    const notif = React.useRef(null);

    React.useEffect(() => {
        // close dropdown if click outside
        function close(e) {
            if (!notif.current.contains(e.target)) {
                setShowNotifictains(false);
            }
        }
        // add or remove event listener
        if (showNotifictains) {
            window.addEventListener("click", close);
        }
        // cleanup
        return function removeListener() {
            window.removeEventListener("click", close);
        }
    }, [showNotifictains]);


    return (
        <div ref={notif} className={`all-notifications-container ${showNotifictains ? 'active' : ''}`}>
            <div className="title-block">
                <h4>
                    NOTIFICATIONS
                </h4>
                <div className="count">
                    {notifLeng} new
                </div>
            </div>

            <div className="notifications-container">
                {NotifItem}
            </div>
        </div>
)

}

export {Notifications}
