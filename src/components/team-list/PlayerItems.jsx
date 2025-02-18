import React from "react";
import { findObjectByKeyValue } from '../utils.js';
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {Link} from "react-router-dom";

function PlayerItems({props, moveItem}) {



    const SortDropdown = (props, curIndex,closeDrop) => {

        const sortItems = props.map(function (item, index) {

            if (curIndex === index) {
                return ''
            }
            const activeClass = item.placed ? " active " : ""

            return (

                <div key={'sort_' + index}
                     className={"sort_row_btn" + activeClass}

                     onClick={(event) => {event.stopPropagation(); moveItem(index, curIndex); closeDrop()}}
                >
                    <div className="col r-pos-col">
                        {item.currentPosition}
                    </div>
                    <div className="col">
                        {item.name}
                    </div>
                </div>

            )
        })


        return (
            <div className="sort-drop">
                <div className="sort_drop">
                    <div className="descr">Click on one of the players on the teamsheet to replace with selected player</div>
                    {sortItems}
                </div>
            </div>

        )

    }


    const PlayerItem = (props) => {


        if (!props || props.length === 0) {
            return '';
        }

        return (
            props.map(function (player, index) {

                const [open, setOpen] = React.useState(false);
                const dropdownRef = React.useRef(null);

                React.useEffect(() => {
                    // close dropdown if click outside
                    function close(e) {
                        if (!dropdownRef.current.contains(e.target)) {
                            setOpen(false);
                        }
                    }
                    // add or remove event listener
                    if (open) {
                        window.addEventListener("click", close);
                    }
                    // cleanup
                    return function removeListener() {
                        window.removeEventListener("click", close);
                    }
                }, [open]);

                const activeClass = player.placed ? " active " : ""
                const activeDrop = open ? " active " : ""

                function closeDrop () {
                    setOpen(!open);
                }

                return (
                    <div key={index}
                         className={"player-list-row" + activeClass}
                    >

                        <div ref={dropdownRef} className={"info-col m-info-col p_list_sort_btn" + activeDrop}
                             onClick={(event) => {event.stopPropagation(); setOpen(true)}}

                        >
                            <div className="info-col pos-col">
                                {player.currentPosition}
                            </div>
                            <div className="info-col ico-col">
                                <div className="ico icon-arrow-bottom" />
                            </div>
                            <div className="info-col name-col">
                                {player.name}
                            </div>
                            <div className="info-col">

                                <div className="rating">
                                    {player.fitness}
                                    {/*{player.rating}*/}
                                    {/*{player.ratingDelta > 0 ? <span className="r-inc">+{player.ratingDelta}</span> : null}*/}
                                    {/*{player.ratingDelta < 0 ? <span className="r-dec">{player.ratingDelta}</span> : null}*/}
                                </div>
                            </div>

                            {open ? SortDropdown(props, index, closeDrop) : null}

                        </div>
                        <div className="info-col">
                            {player.position}
                        </div>

                        <div className="info-col">
                            <div className="points">
                                {player.points}

                                <span className={`ico ${player.pointsChange ? player.pointsChange : 'semi'}`} />

                            </div>

                        </div>
                        <div className="info-col">
                            {player.games}
                        </div>
                        <div className="info-col">
                            {player.goals}
                        </div>
                        <div className="info-col">
                            {player.assists}
                        </div>
                        <div className="info-col">
                            {player.yellow}
                        </div>
                        <div className="info-col">
                            {player.red}
                        </div>
                        <div className="link-col">
                            <Link to={`/player/${player.slug}`} className="ico icon-tip" />
                        </div>


                    </div>
                )
            })
        );

    }

    const CountAlert = () => {

        return (
            <div className="count-alert">
                <div className="tip">
                    Your squad must have a minimum of 22 players
                </div>

                <Link to={`/transfers`} className="settings-submit-btn">
                    TO TRANSFERS
                </Link>

            </div>
        )
    }



    return (

        <div className="players-list-container">

            {PlayerItem(props)}

            { props.length < 22 ? CountAlert() : ''}

        </div>

    )
}

export {PlayerItems}
