import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";
import {Popup} from "../common/Popup.jsx";
import notifications from "../../json-data/notifications.json";


function NewNotifications({newNotifications}) {

    if (!newNotifications) {
        return ''
    }

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

    const NotifItem = newNotifications.map((item, index) => {
        const timeDif = timeDelta(Date.now(), item.time)

        const [open, setOpen] = React.useState(true);


        return (
            <div key={index} className={`notification ${open ? 'active' : ''}`}>
                <button type="button" className="n-close-btn icon-s-cross"
                        onClick={() => {
                            setOpen(false)
                        }}
                />
                <div className="notification-content">
                    <div className="text">
                        {item.text}
                    </div>
                    <div className="time">
                        {timeDif.days? `${timeDif.days}d ` : ''}{timeDif.hours? `${timeDif.hours}h ` : timeDif.minutes? `${timeDif.minutes}min ` : ''} ago
                    </div>
                </div>
            </div>

        );
    });


    return (
        <div className={`s-notifications-container active`}>

            {NotifItem}
        </div>
)

}

export {NewNotifications}
