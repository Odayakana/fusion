import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {findObjectByKeyValue} from "/src/components/utils.js"

import user_image from '/src/assets/profile.png'

import leagues_teams from "/src/json-data/leagues-managed.json"
import leagues from "/src/json-data/leagues.json"
import {TeamsBlock} from "../components/dashboards/TeamsBlock";
import {PlayersBlock} from "../components/dashboards/PlayersBlock";



function DashboardUser() {

    const user_teams_ids = [2, 17, 6, 13]

    const Teams = user_teams_ids.map((teamId, index) => {

        const team = findObjectByKeyValue(leagues_teams, "id", teamId)
        if (!team) return null;

        return (
            <Link key={index} to={`/team-pitch/${team.id}`}>
                <img src={team.image} alt={team.title}/>
            </Link>
        )
    });

    const getPosition = (team) => {
        const teamsInLeague = leagues_teams.filter(t => t.league_id === team.league_id);
        const sortedTeams = teamsInLeague.sort((a, b) => b.points - a.points);
        return sortedTeams.findIndex(t => t.id === team.id) + 1;
    };

    const TeamsRow = user_teams_ids.map(teamId => {
        const team = leagues_teams.find(t => t.id === teamId);
        if (!team) return null;
        const league = findObjectByKeyValue(leagues, "id", team.league_id)
        if (!league) return null;

        const position = getPosition(team);

        return (
            <div key={team.id} className="row-container">
                <Link to={`/league/${league.slug}/table`} className="info-row">
                    <div className="title-block">
                        <img src={league.image} alt=""/>
                        {league.title}
                    </div>
                    <div className="position">
                        {position}
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <div className="page-login dashboard-page">

            <div className="wrapper">

                <div className="dashboard-user-grid">

                    <div className="col">
                        <div className="info-block user-info-block">
                            <div className="user-info-row">
                                <div className="user-info">
                                    <div className="image-block">
                                        <img src={user_image} alt="JONNYBILLIONS"/>
                                    </div>

                                    <div className="info-col">
                                        <h1>
                                            JONNYBILLIONS
                                        </h1>
                                        <div className="info">
                                            Filip Mujkic
                                        </div>
                                        <div className="info">
                                            Serbia
                                        </div>
                                    </div>

                                </div>

                                <div className="ctrls-col">
                                    <button type="button" className="submit-btn trans-btn f-white">
                                        SETTINGS
                                    </button>

                                    <div className="rank-block">
                                        <div className="rank">
                                            150
                                        </div>
                                        OVERALL RANK
                                    </div>
                                </div>

                            </div>

                            <div className="teams-row">
                                <div className="teams-block">
                                    <h4>
                                        TEAMS MANAGED
                                    </h4>

                                    <div className="teams-container">
                                        {Teams}
                                    </div>

                                </div>

                                <div className="leagues-block">
                                    <h4>
                                        LEAGUES
                                    </h4>

                                    <div className="leagues-table">
                                        <div className="info-row head-row">
                                            <div className="name">
                                                Name
                                            </div>
                                            <div className="position">
                                                Pos
                                            </div>

                                        </div>
                                        {TeamsRow}

                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className="next-tiles">
                            <div className="tile">
                                <Link to={`/challenges`} style={{backgroundImage : "url('/src/assets/tile_3.jpg')"}}>
                                    <span className="h-block" style={{backgroundImage : "url('/src/assets/tile_3_h.jpg')"}} />
                                    <h2>
                                        QUICK PLAY
                                    </h2>
                                    <span className="descr">
                                        CHALLENGE OTHER PLAYERS FOR A QUICK 1 V 1 GAME
                                    </span>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="col">
                        <div className="next-tiles">
                            <div className="tile">
                                <Link to={`/create-league`} style={{backgroundImage : "url('/src/assets/tile_1.jpg')"}}>
                                    <span className="h-block" style={{backgroundImage : "url('/src/assets/tile_1_h.jpg')"}} />
                                    <h2>
                                        CREATE LEAGUE
                                    </h2>
                                    <span className="descr">
                                        Create your own league and invite your friends to play
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="next-tiles">
                            <div className="tile">
                                <Link to={`/join-league`} style={{backgroundImage : "url('/src/assets/tile_2.jpg')"}}>
                                    <span className="h-block" style={{backgroundImage : "url('/src/assets/tile_2_h.jpg')"}} />
                                    <h2>
                                        JOIN LEAGUE
                                    </h2>
                                    <span className="descr">
                                        YOU WILL BE RANDOMLY SORTED INTO A LEAGUE WITH FREE SLOTS
                                    </span>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="col">
                        <TeamsBlock props={[user_teams_ids, leagues_teams, leagues]} />
                        <PlayersBlock props={[user_teams_ids, leagues_teams]} />
                    </div>

                </div>


            </div>

        </div>
    )
}

export {DashboardUser}
