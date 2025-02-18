import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";


function PlayersList({players}) {

    const Players = players.map(function (item) {

        return (
            <div key={item.id} className="row pos-col">
                <div className="col">
                    {item.position}
                </div>
                <div className="col">
                    {item.name}
                </div>
                <div className="col">
                    {item.rating}
                </div>
                <div className="col">
                    {item.rating}
                </div>
                <div className="col">
                    {item.saves}
                </div>
                <div className="col">
                    {item.keyTackles}
                </div>
                <div className="col">
                    {item.keyPasses}
                </div>
                <div className="col">
                    {item.assists}
                </div>
                <div className="col">
                    {item.shots}
                </div>
                <div className="col">
                    {item.goals}
                </div>
                <div className="col">
                    {}
                </div>
                <div className="col">
                    {}
                </div>
                <div className="col">
                    {}
                </div>
                <div className="col">
                    {}
                </div>
                <div className="col">
                    {item.fitness}
                </div>
            </div>
        )
    });


    return (

        <div className="summary-table">

            <div className="row head-row">
                <div className="col">
                    Pos
                </div>
                <div className="col">
                    Name
                </div>
                <div className="col">
                    Rating
                </div>
                <div className="col">
                    Min
                </div>
                <div className="col">
                    Saves
                </div>
                <div className="col">
                    Key tackles
                </div>
                <div className="col">
                    Key passes
                </div>
                <div className="col">
                    Assists
                </div>
                <div className="col">
                    Shots
                </div>
                <div className="col">
                    Goals
                </div>
                <div className="col">
                    AAb
                </div>
                <div className="col">
                    PAb
                </div>
                <div className="col">
                    DAb
                </div>
                <div className="col">
                    GAb
                </div>
                <div className="col">
                    Fitness
                </div>
            </div>

            {Players}

        </div>
    )
}

export {PlayersList}
