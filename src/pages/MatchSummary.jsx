import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';

import {MatchPageNav} from "../components/match/MatchPageNav";
import {MatchTeamsPageNav} from "../components/match/MatchTeamsPageNav";
import {PlayersList} from "../components/match/PlayersList";
import {SubstitutionsList} from "../components/match/SubstitutionsList";
import {CommetariesBlock} from "../components/match/CommetariesBlock";
import {ListPlayers} from "../components/match/ListPlayers";


import {PlayerChart} from "../components/player-page/PlayerChart";
import {TransferBlock} from "../components/player-page/TransferBlock";
import {TeamDropdown} from "../components/common/Dropdown.jsx";
import {Popup} from "../components/common/Popup";

import matches from "../json-data/matches.json"
import leagueTeams from "../json-data/league-teams.json"
import PlayersTeamOne from "../json-data/match_players_1.json"
import PlayersTeamTwo from "../json-data/match_players_2.json"
import field_positions from "../json-data/field-positions.json"
import tacticData from "../json-data/tactic.json"
import commentaries from "../json-data/commentaries.json"

import imgField from "../assets/field.svg"
import formationsData from "../json-data/field-positions.json";


function MatchSummary() {

    const {id} = useParams()
    const {teamId} = useParams()
    const match = findObjectByKeyValue(matches, "id", Number(id));
    const teamOne = findObjectByKeyValue(leagueTeams, "id", match.team_1_id);
    const teamTwo = findObjectByKeyValue(leagueTeams, "id", match.team_2_id);


    const players = (Number(teamId) === Number(teamOne.id)) ? PlayersTeamOne : PlayersTeamTwo;

    return (
        <div className="page-match">
            <div className="wrapper">
                <div className="title-block">
                    <h1 className="teams-title">
                    <span className="team">
                        <span className="image">
                            <img src={teamOne.image} alt={teamOne.title} />
                        </span>
                        <span className="full-name">
                            {teamOne.title}
                        </span>
                        <span className="short-name">
                            {teamOne.shortTitle}
                        </span>
                    </span>
                        <span className="score">
                        {match.team_1_score} - {match.team_2_score}
                    </span>
                        <span className="team">
                        <span className="image">
                            <img src={teamTwo.image} alt={teamTwo.title} />
                        </span>
                        <span className="full-name">
                            {teamTwo.title}
                        </span>
                        <span className="short-name">
                            {teamTwo.shortTitle}
                        </span>
                    </span>
                    </h1>
                </div>

                <div className="match-date">
                    {match.date}
                </div>

                <MatchPageNav id={id} teamOneId={teamOne.id} />

                <div className="summary-block">

                    <h2>
                        PLAYER STATISTICS
                    </h2>

                    <div className="summary-nav">
                        <MatchTeamsPageNav  id={id} teamOneId={teamOne.id} teamTwoId={teamTwo.id} />
                    </div>

                    <PlayersList players={players} />

                </div>

            </div>


        </div>
    )
}

export {MatchSummary}
