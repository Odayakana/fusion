import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";


function JoinBlock({props}) {

    const joinItems = props.map(function (item, index) {

        return (
            <div key={item.id} className="info-row">
                <div className="league-list-row">
                    <div className="col">
                        {index + 1}
                    </div>
                    <div className="col title">
                        <div className="image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <Link to={`/league/${item.slug}/table`}>
                            {item.title}
                        </Link>

                    </div>
                    <div className="col">
                        {item.availableSlots}
                    </div>
                    <div className="col">
                        {item.seasonsPlayed}
                    </div>
                    <div className="col league-link-col">
                        <Link to={`/league/${item.slug}/table`} className="ico icon-tip league-link" />
                    </div>

                </div>
                <div className="col">
                    <Link to={`/league/${item.slug}/table`} className="submit-btn">
                        {item.freeJoin ? 'JOIN' : 'ASK TO JOIN'}
                    </Link>
                </div>

            </div>
        )
    });


    return (

        <div className="leagues-container">

            <div className="header-row league-list-row">
                <div className="info-col">
                    League name
                </div>
                <div className="info-col">
                    Available slots
                </div>
                <div className="info-col">
                    Seasons played
                </div>
            </div>

            {joinItems}

        </div>
    )
}

export {JoinBlock}
