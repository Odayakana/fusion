import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";
import playersInfo from "../../json-data/players.json";
import playersCountInfo from "../../json-data/players-count.json";


function JoinBlock({props, callPopup}) {

    const joinItems = props.map(function (item, index) {

        const buttonClass = (status) => {
            let value;  // Используем let, так как value будет инициализирован в зависимости от case
            switch (status) {
                case 'challange':
                    value = {
                        'class' : 'default',
                        'text' : 'CHALLENGE'
                    };
                    break;
                case 'denied':
                    value = {
                        'class' : 'default denied',
                        'text' : 'DECLINED'
                    };
                    break;
                case 'waiting':
                    value = {
                        'class' : 'waiting',
                        'text' : 'waiting'
                    };
                    break;
                case 'ready':
                    value = {
                        'class' : 'ready',
                        'text' : 'GO TO GAME'
                    };
                    break;
                default:
                    value = playersCountInfo;
            }
            return value; // Возвращаем значение, которое мы хотим присвоить константе
        };

        return (
            <div key={item.id} className="info-row">
                <div className="league-list-row challenges-row">
                    <div className="col">
                        {index + 1}
                    </div>
                    <div className="col title">
                        <div className="image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <Link to={`/dashboard`}>
                            {item.title}
                        </Link>

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
                    <div className="col league-link-col">
                        <Link to={`/dashboard`} className="ico icon-tip league-link" />
                    </div>

                </div>
                <div className="col">
                    <button type="button" className={`submit-btn ${buttonClass(item.status).class}`}
                            onClick = {() =>  {if (buttonClass(item.status).class === 'default') callPopup()}}
                    >
                        {buttonClass(item.status).text}
                    </button>

                    {/*<Link to={`/league/${item.slug}/table`} className="submit-btn">*/}
                    {/*    {item.freeJoin ? 'JOIN' : 'ASK TO JOIN'}*/}
                    {/*</Link>*/}
                </div>

            </div>
        )
    });


    return (

        <div className="leagues-container">

            <div className="header-row challenges-row league-list-row">
                <div className="info-col">
                    Player name
                </div>
                <div className="info-col">
                    Games played
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
            </div>

            {joinItems}

        </div>
    )
}

export {JoinBlock}
