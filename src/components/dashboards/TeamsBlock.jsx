import React, {useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom'
import { findObjectByKeyValue } from '../utils.js';
import { TeamDropdown } from '../common/Dropdown';
import formationsData from "../../json-data/field-positions.json";
import leagues from "../../json-data/leagues.json";
import leagues_teams from "../../json-data/leagues-managed.json";


function TeamsBlock({props}) {

    const user_teams_ids = props[0]
    const leagues_teams = props[1]
    const leagues = props[2]

    const defLeagueId = findObjectByKeyValue(leagues_teams, "id", user_teams_ids[0]).league_id;


    const [activeLeagueId, setActiveLeagueId] = React.useState(defLeagueId);

    const currentLeague = findObjectByKeyValue(leagues, "id", activeLeagueId);

    const handleActiveLeague = (id) => {
        setActiveLeagueId(id)
    }

    const LeagueTeams = ({ league_id }) => {
        // Фильтруем команды по league_id
        const filteredTeams = leagues_teams.filter(team => team.league_id === league_id);

        // Сортируем команды по points в порядке убывания
        const sortedTeams = filteredTeams.sort((a, b) => b.points - a.points);

        // Добавляем поле position
        const teamsWithPosition = sortedTeams.map((team, index) => ({
            ...team,
            position: index + 1
        }));

        // Находим команды из user_teams_ids
        const userTeams = teamsWithPosition.filter(team => user_teams_ids.includes(team.id));


        // Берем топ-5 команд, но заменяем их на команды из userTeams, если они не входят в топ-5
        const topTeams = teamsWithPosition.slice(0, 5);
        // const finalTeams = [...new Set([...topTeams, ...userTeams])].slice(0, 5);
        // console.log(finalTeams);

        const arr_top_length = topTeams.length;

        const arr_result = [...new Set([...topTeams, ...userTeams].map(JSON.stringify))].map(JSON.parse);

        while (arr_result.length > arr_top_length) {
            for (let i = arr_result.length - 1; i >= 0; i--) {
                if (!userTeams.some(team => JSON.stringify(team) === JSON.stringify(arr_result[i]))) {
                    arr_result.splice(i, 1);
                    break;
                }
            }
        }

        return (
            <div className="league-teams-container">
                <div className="header">
                    <div className="title">
                        Team name
                    </div>
                    <div className="points">
                        Points
                    </div>
                </div>
                {arr_result.map((team, index) => (
                    <div key={index} className="row-container">
                        <Link to={`/team-pitch/${team.id}`} className={user_teams_ids.includes(team.id) ? 'active' : ''}>
                            <div className="title-block">
                                <div className="num">
                                    {team.position}.
                                </div>
                                <img src={team.image} alt="team.title"/>
                                <h5>
                                    {team.title}
                                </h5>
                            </div>
                            <div className="points">
                                {team.points}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };

    return (
      <div className="info-block ">
          <div className="title-header-block">
              <h4>
                  MY STANDINGS
              </h4>
              <Link to={`/league/${currentLeague.slug}/table`}>
                  Open league
              </Link>
          </div>

          <TeamDropdown props={leagues} activeItemId={defLeagueId} setId={handleActiveLeague}/>

          <LeagueTeams league_id={activeLeagueId} />

      </div>
  )
}

export {TeamsBlock}
