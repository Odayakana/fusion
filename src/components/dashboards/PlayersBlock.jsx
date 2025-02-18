import React, {useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom'
import { findObjectByKeyValue } from '../utils.js';
import { TeamDropdown } from '../common/Dropdown';
import { PlayersSlider } from '../dashboards/PlayersSlider';

import players_data from "/src/json-data/players.json"


function PlayersBlock({props}) {

    const user_teams_ids = props[0]
    const leagues_teams = props[1]

    const players = players_data;

    const playerTeams = leagues_teams.filter(team => user_teams_ids.includes(team.id));

    const defTeamId = findObjectByKeyValue(leagues_teams, "id", user_teams_ids[0]).id;


    const [activeTeamId, setActiveTeamId] = React.useState(defTeamId);

    const currentLeague = findObjectByKeyValue(leagues_teams, "id", activeTeamId);

    const handleActiveLeague = (id) => {
        setActiveTeamId(id)
    }

    function filterPlayersByTeam(players, teamId) {
        return players.filter(player => player.team_id === teamId);
    }

    const currentPlayers = filterPlayersByTeam(players, activeTeamId).sort((a, b) => b.rating - a.rating).slice(0, 5);


    return (
      <div className="info-block ">
          <div className="title-header-block">
              <h4>
                  MY TOP PLAYERS
              </h4>
              <Link to={`/team-pitch/${activeTeamId}`}>
                  Open team
              </Link>
          </div>

          <TeamDropdown props={playerTeams} activeItemId={defTeamId} setId={handleActiveLeague}/>

          <PlayersSlider props={currentPlayers} />


      </div>
  )
}

export {PlayersBlock}
