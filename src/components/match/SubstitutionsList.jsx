import React, {useState, useEffect} from "react";
import { findObjectByKeyValue } from '../utils.js';


function SubstitutionsList ({subPlayers}) {


    function ListPlayers({players}) {


        return (
            players.map((player, index) => (
                <li key={player.id}>
                    <span className="pos">
                        {player.position}
                    </span>
                        <span className="name">
                        {player.name}
                    </span>
                </li>
            ))
        )

    }


    if (!subPlayers || subPlayers.length === 0) {
        return '';
    }

    return (
      <ul className="players-list">
          <ListPlayers players={subPlayers} />
      </ul>
  )
}

export {SubstitutionsList}
