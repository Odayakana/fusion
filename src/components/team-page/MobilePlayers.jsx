import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { findObjectByKeyValue } from '../utils.js';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './itemTypes.js';

import playerIco from "../../../src/assets/player.svg"

function MobilePlayers ({props, activePlayers, removePlayer, touchPlayer, touchedPlayer, updatePlayerInfo}) {

    let roleGroups = [
        {
            title: "goalkeepers",
            players: []
        },
        {
            title: "defenders",
            players: []
        },
        {
            title: "midfielders",
            players: []
        },
        {
            title: "forwards",
            players: []
        }
    ]

    props.forEach(function (player, index) {
        if (findObjectByKeyValue(roleGroups, 'title', player.role)) {
            findObjectByKeyValue(roleGroups, 'title', player.role).players.push(player);
        }
    })

    function listPlayers({players}) {

        if (!players || players.length === 0) {
            return '';
        }



        return (
            players.map(function (player) {


                const handleClickButton = (event, id) => {
                    event.stopPropagation();
                    removePlayer(id)
                }

                const playerInfo = findObjectByKeyValue(activePlayers, 'player_id', player.id);
                const activeClass = playerInfo? " active " : ""

                const touchedClass = touchedPlayer && touchedPlayer.id === player.id ? " touched " : ""

                React.useEffect(() => {
                    // close dropdown if click outside
                    function close(e) {
                        touchPlayer(null);
                    }
                    // add or remove event listener
                    if (touchedPlayer) {
                        window.addEventListener("click", close);
                    }
                    // cleanup
                    return function removeListener() {
                        window.removeEventListener("click", close);
                    }


                }, [touchedPlayer]);


                const handleTouch = (event, obj) => {

                    event.stopPropagation();

                    touchPlayer(obj);

                };

                return (
                    <div key={player.id}
                         className={"player-place-item " + activeClass + touchedClass}
                         onClick={(event) => {handleTouch(event, player)}}
                    >
                        <div className="icon">
                            <img src={playerIco} alt="player icon"/>
                        </div>
                        <div className="descr-block">
                            <button type="button" className="pp-clear-btn" onClick={(event) => {event.stopPropagation(); removePlayer(player.id);  }}/>
                            <div className="name name_field">
                                {player.name}
                            </div>
                            <div className="position">
                                <div className="score_val score_field">
                                    {player.rating}
                                </div>
                                <div className="pos_val">
                                    {playerInfo ? playerInfo.title : player.currentPosition}
                                </div>
                            </div>

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



    // console.log(roleGroups);

    return (
        <div className="mobile-players-container">
            <div className="mobile-players-list">
                {roleGroups.map((group, index) => (
                    listPlayers(group)
                ))}
            </div>

            { props.length < 22 ? CountAlert() : ''}

        </div>
  )
}

export {MobilePlayers}
