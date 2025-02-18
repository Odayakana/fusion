import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';
import {JoinBlock} from "../components/league/JoinBlock";


import leagues from "../json-data/leagues.json"


function LeagueJoinPage() {

    const {slug} = useParams()
    const cLeague = findObjectByKeyValue(leagues, 'slug', slug);


    return (
        <div className="page-league join-page">
            <div className="wrapper">

                <div className="title-block">
                    <h1>JOIN LEAGUE</h1>

                </div>

                <JoinBlock props={leagues} />
            </div>




        </div>
    )
}

export {LeagueJoinPage}
