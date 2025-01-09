import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';
import {LeaguePageNav} from "../components/league/LeaguePageNav";
import {CalendarSlider} from "../components/league/Slider";
import {MatchesBlock} from "../components/league/Matches";


import leagues from "../json-data/leagues.json"
import leagueTeams from "../json-data/league-teams.json"
import matches from "../json-data/matches.json"


function LeagueFixturesPage() {

    const {slug} = useParams()
    const cLeague = findObjectByKeyValue(leagues, 'slug', slug);


    return (
        <div className="page-league">
            <div className="wrapper">
                <LeaguePageNav slug={slug} />

                <div className="title-block">
                    <h1>{cLeague.title}</h1>

                    <div className="ctrl-block">
                        <Link to={"/join-league"} className="read-more-btn">
                            Switch league

                            <span className="ico icon-arrow-right" />
                        </Link>
                    </div>
                </div>

                <CalendarSlider />


                <h4 className="match-day">
                    Matchday 10
                </h4>

                <MatchesBlock matches={matches} teams={leagueTeams} />

            </div>


        </div>
    )
}

export {LeagueFixturesPage}
