import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';

import {MatchPageNav} from "../components/match/MatchPageNav";
import {FieldBlock} from "../components/match/FieldBlock";
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

import imgField from "../assets/field.svg"


function MatchLineups() {

    const {id} = useParams()
    const match = findObjectByKeyValue(matches, "id", Number(id));
    const teamOne = findObjectByKeyValue(leagueTeams, "id", match.team_1_id);
    const teamTwo = findObjectByKeyValue(leagueTeams, "id", match.team_2_id);

    const formationOne = findObjectByKeyValue(field_positions, "id", match.team_1_formation_id);
    const formationTwo = findObjectByKeyValue(field_positions, "id", match.team_2_formation_id);

    const teamPlayersOne = PlayersTeamOne;
    const teamPlayersTwo = PlayersTeamTwo;


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

                <div className="lineup-grid">

                    <div className="lineup-block">
                        <div className="field-block">
                            <FieldBlock formationInfo={formationOne} teamPlayers={teamPlayersOne} color={teamOne.color}/>

                            <div className="match-info">
                                <div className="info-block">
                                    <h4>
                                        MANAGER
                                    </h4>
                                    <Link to={`#`}>
                                        username
                                    </Link>
                                </div>
                                <div className="info-block">
                                    <h4>
                                        FORM
                                    </h4>
                                    <div className="info">
                                        {formationOne.title}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <ListPlayers  formationInfo={formationOne} teamPlayers={teamPlayersOne}/>
                    </div>

                    <div className="lineup-block">
                        <div className="field-block">
                            <FieldBlock formationInfo={formationTwo} teamPlayers={teamPlayersTwo} color={teamTwo.color}/>

                            <div className="match-info">
                                <div className="info-block">
                                    <h4>
                                        MANAGER
                                    </h4>
                                    <Link to={`#`}>
                                        username
                                    </Link>
                                </div>
                                <div className="info-block">
                                    <h4>
                                        FORM
                                    </h4>
                                    <div className="info">
                                        {formationTwo.title}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <ListPlayers  formationInfo={formationTwo} teamPlayers={teamPlayersTwo}/>
                    </div>


                </div>

                <div className="back-link">
                    <Link to={`/league/apes_united/fixtures`} className="read-more-btn">
                        <span className="ico icon-arrow-left" />

                        BACK TO FIXTURES

                    </Link>

                </div>

            </div>
        </div>
    )
}

export {MatchLineups}
