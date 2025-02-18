import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';
import {JoinBlock} from "../components/challenges/JoinBlock";
import {Popup} from "../components/common/Popup.jsx";


import teams_info from "../json-data/league-teams-challenges.json"


function Challenges() {

    const teams = teams_info;
    const [popOpen, setPopOpen] = React.useState(false);

    const closePopup = () => {
        setPopOpen(false);
    }

    const callPopup = () => {
        if (findObjectByKeyValue(teams, 'status', 'waiting')) {
            setPopOpen(true);
        }
    }

    const JoinPopup = ({popOpen, closePopup}) => {
        return (
            <Popup popOpen={popOpen} close={closePopup}>
                <h3>
                    CHALLENGE PENDING
                </h3>

                <div className="offer-description">
                    You’ve already challenged a player. You cannot challenge another player until your current challenge is accepted or declined.
                </div>

                <div className="buttons-block">
                    <button
                        type="submit"
                        className="submit-btn trans-btn f-white"
                        onClick={() => {closePopup()}}
                    >
                        CLOSE
                    </button>
                </div>

            </Popup>
        )
    }


    return (
        <div className="page-league join-page">
            <div className="wrapper">

                <div className="title-block">
                    <h1>CHOOSE OPONENT</h1>

                </div>

                <JoinBlock props={teams} callPopup={callPopup}/>
            </div>

            <JoinPopup  closePopup={closePopup} popOpen={popOpen} />

        </div>
    )
}

export {Challenges}
