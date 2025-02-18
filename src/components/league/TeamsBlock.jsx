import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";


function TeamsBlock({teams}) {

    const offerItems = teams.map(function (item) {


        return (
            <div key={item.id} className="league-list-row">
                <div className="col">
                    {item.id + 1}.
                </div>
                <div className="col title">
                    <div className="image">
                        {item.image ? <img src={item.image} alt={item.title} /> : ''}
                    </div>

                    <Link to={'#'}>{item.title}</Link>


                </div>
                <div className="col change">

                    <span className={`ico ${item.pointsChange ? item.pointsChange : 'semi'}`} />

                </div>
                <div className="col">
                    {item.points}

                </div>
                <div className="col">
                    {item.played}

                </div>
                <div className="col">
                    {item.wins}
                </div>
                <div className="col">
                    {item.draws}
                </div>
                <div className="col">
                    {item.loses}
                </div>
                <div className="col">
                    {item.for}
                </div>
                <div className="col">
                    {item.against}
                </div>
                <div className="col">
                    {item.cd}
                </div>
            </div>
        )
    });


    return (

        <div className="leagues-container">

            <div className="header-row league-list-row">
                <div className="info-col">
                    Team name
                </div>
                <div className="info-col">
                    Points
                </div>
                <div className="info-col">
                    Played
                </div>
                <div className="info-col">
                    Wins
                </div>
                <div className="info-col">
                    Draws
                </div>
                <div className="info-col">
                    Losses
                </div>
                <div className="info-col">
                    For
                </div>
                <div className="info-col">
                    Against
                </div>
                <div className="info-col">
                    GD
                </div>
            </div>

            {offerItems}

        </div>
    )
}

export {TeamsBlock}
