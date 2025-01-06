import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";


function TransferBlock({transfers}) {

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

    const offerItems = transfers.map(function (item) {

        const timeDif = timeDelta(Date.now(), item.time)

        return (
            <li key={item.id} className="teams-list-row">
                <div className="col title">
                    <div className="image">
                        {item.image ? <img src={item.image} alt="" /> : ''}
                    </div>

                    <Link to={'#'}>
                        {item.title}
                    </Link>
                </div>

                <div className="col">
                    {item.offer}
                </div>
                <div className="col">
                    {timeDif.days? `${timeDif.days}d ` : ''}{timeDif.hours? `${timeDif.hours}h ` : timeDif.minutes? `${timeDif.minutes}min ` : ''} {timeDif.minutes? 'ago' : 'time elapsed'}
                </div>
            </li>
        )
    });

    const timer = Date.now() + 1202510254;
    const [countdown, setCountdown] = React.useState(timer);

    React.useEffect(() => {
        // Если обратный отсчет достиг 0, остановить таймер
        if (countdown <= 0) return;

        const timerId = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1000);
        }, 1000); // Обновлять каждую секунду

        // Очистка таймера при размонтировании компонента или обновлении countdown
        return () => clearInterval(timerId);
    }, [countdown]);

    const tDays = timeDelta(countdown, Date.now()).days;
    const tHours = timeDelta(countdown, Date.now()).hours;
    const tMin = timeDelta(countdown, Date.now()).minutes;
    const tSec = timeDelta(countdown, 0).seconds;

    return (

        <div className="stats-block">
            <div className="title-block">
                <h4>
                    Stats
                </h4>

                <div className="timer">
                    Bidding time remaining: {tDays ? `${tDays}d` : ''} {tHours ? `${tHours}h` : ''} {tMin ? `${tMin}m` : ''} {tSec ? `${tSec}s` : ''}
                </div>

            </div>

            <div className="transfers-block">
                <div className="teams-list-row header-row">
                    <div className="info-col">
                        Team name
                    </div>
                    <div className="info-col">
                        Transfer offer
                    </div>
                    <div className="info-col">
                        Time of offer
                    </div>
                </div>

                {offerItems}

            </div>

        </div>
    )
}

export {TransferBlock}
