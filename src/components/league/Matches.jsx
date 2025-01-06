import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";


function MatchesBlock({matches,teams}) {

    const leagueMatches = matches.map(function (match) {

        const teamOne = findObjectByKeyValue(teams, 'id', match.team_1_id);
        const teamTwo = findObjectByKeyValue(teams, 'id', match.team_2_id);

        return (
            <div key={match.id} className="match-row">
                <div className="time">
                    {match.time}
                </div>
                <div className="teams-block">
                    <div className="team">
                        <div className="image">
                            <img src={teamOne.image} alt="" />
                        </div>
                        <Link to={`#`}>{teamOne.title}</Link>
                    </div>
                    -
                    <div className="team">
                        <div className="image">
                            <img src={teamTwo.image} alt="" />
                        </div>
                        <Link to={`#`}>{teamTwo.title}</Link>
                    </div>
                </div>

                <div className="link">
                    <Link to={`/match/${match.id}/lineups`} className="ico icon-tip" />
                </div>
            </div>
        )
    });


    return (

        <div className="matches-container">

            {leagueMatches}

        </div>
    )
}

export {MatchesBlock}
