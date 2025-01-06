import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';
import {LeaguePageNav} from "../components/league/LeaguePageNav";
import {TeamsBlock} from "../components/league/TeamsBlock";


import leagues from "../json-data/leagues.json"
import leagueTeams from "../json-data/league-teams.json"


function LeagueTablePage() {

    const {slug} = useParams()
    const cLeague = findObjectByKeyValue(leagues, 'slug', slug);


    return (
        <div className="page-league">
            <div className="wrapper">
                <LeaguePageNav slug={slug} />

                <div className="title-block">
                    <h1>{cLeague.title}</h1>

                    <Link to={"/join-league"} className="read-more-btn">
                        Switch league

                        <span className="ico icon-arrow-right" />
                    </Link>
                </div>

                <TeamsBlock teams={leagueTeams} />

            </div>




        </div>
    )
}

export {LeagueTablePage}
