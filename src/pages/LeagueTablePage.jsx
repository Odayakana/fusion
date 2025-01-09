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
                    <div className="ctrl-block">
                        <button type="button" className="submit-btn">
                            Begin season
                        </button>
                    </div>

                    <h1>{cLeague.title}</h1>

                    <div className="ctrl-block flex-block">
                        <Link to={"/join-league"} className="read-more-btn">
                            Switch league
                            <span className="ico icon-arrow-right" />
                        </Link>
                        <Link to={"/league-settings"}>
                            <span className="ico-btn icon-gear" />
                        </Link>
                    </div>
                </div>

                <TeamsBlock teams={leagueTeams} />

            </div>




        </div>
    )
}

export {LeagueTablePage}
