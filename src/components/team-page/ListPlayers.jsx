import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { findObjectByKeyValue } from '../utils.js';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './itemTypes.js';

import playerIco from "../../../src/assets/player.svg"

function ListPlayers({props, activePlayers, removePlayer, touchPlayer, touchedPlayer, updatePlayerInfo}) {

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

                const [{isDragging}, drag] = useDrag(() => ({
                    type: ItemTypes.LIST_PLAYER,
                    item: {player_info: player},
                    // collect: monitor => ({
                    //     isDragging: !!monitor.isDragging(),
                    // })
                    // end: (item, monitor) => {
                    //     const dropResult = monitor.getDropResult();
                    //     if (item && dropResult) {
                    //         // setPlayerInfo(dropResult.name, item.playerId, player)
                    //         updatePlayerInfo(dropResult.name, player);
                    //
                    //     }
                    // },
                }))

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
                    <div ref={drag} key={player.id}
                         className={"player-list-item" + activeClass + touchedClass}
                         onClick={(event) => {handleTouch(event, player)}}
                    >
                        <div className="type">
                            {playerInfo ? playerInfo.title : player.currentPosition}
                        </div>

                        <div className="name">
                            <div className="name-val">
                                {player.name}
                            </div>
                            <button type="button" className="pp-clear-btn" aria-label="Clear player"  onClick={(event) => { handleClickButton(event, player.id) }}/>
                        </div>

                        <div className="score">
                            {player.rating}
                        </div>
                        <Link to={`/player/${player.slug}`} className="ico icon-tip" />
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
      <div className="players-list">
          <div className="players-list-frame-container">
              <div className="frame">
                  {roleGroups.map((group, index) => (
                      <div key={index} className="type-block">
                          <h4>
                              {group.title} ({group.players.length})
                          </h4>

                          <div className="p-t-list">
                              {listPlayers(group)}
                          </div>
                      </div>

                  ))}
              </div>

              { props.length < 22 ? CountAlert() : ''}

          </div>


      </div>
  )
}

export {ListPlayers}
