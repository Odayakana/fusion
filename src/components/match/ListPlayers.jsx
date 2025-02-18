import React, {useState, useEffect} from "react";
import { findObjectByKeyValue } from '../utils.js';


function ListPlayers({formationInfo, teamPlayers}) {

    let playerGroups = [
        {
            title: "FIRST TEAM",
            players: []
        },
        {
            title: "SUBSTITUTIONS",
            players: []
        },
    ]

    teamPlayers.forEach(function (player, index) {

        if (player.formationPlaceId !== null) {
            findObjectByKeyValue(playerGroups, 'title', 'FIRST TEAM').players.push(player);
        } else {
            findObjectByKeyValue(playerGroups, 'title', 'SUBSTITUTIONS').players.push(player);
        }
    })


    function listPlayers({players}) {

        if (!players || players.length === 0) {
            return '';
        }


        return (
            players.map(function (player) {

                const posId = player.formationPlaceId;

                const playerPos = posId !== null ? findObjectByKeyValue(formationInfo.positions, 'id', posId).position : player.position

                return (
                    <li key={player.id}>
                        <span className="pos">
                            {playerPos}
                        </span>
                        <span className="name">
                            {player.name}
                        </span>
                    </li>
                )
            })
        );

    }



    return (
      <div className="list-block">
          {playerGroups.map((group, index) => (
              <div key={index} className="list-container">
                  <h4>
                      {group.title}
                  </h4>

                  <ul className="players-list">
                      {listPlayers(group)}
                  </ul>
              </div>
          ))}
      </div>
  )
}

export {ListPlayers}
