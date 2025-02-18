import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';

import {PlayerStats} from "../components/player-page/PlayerStats";
import {PlayerChart} from "../components/player-page/PlayerChart";
import {TransferBlock} from "../components/player-page/TransferBlock";
import {TeamDropdown} from "../components/common/Dropdown.jsx";
import {Popup} from "../components/common/Popup";

import playersData from "../json-data/players.json"
import playerStats from "../json-data/player-stats.json"
import seasons from "../json-data/seasons.json"
import transfers from "../json-data/transfers.json"

import flagImage from "../../src/assets/flag.png"
import formationsData from "../json-data/field-positions.json";

function PlayerPage() {

    const {slug} = useParams()

    const cPlayer = findObjectByKeyValue(playersData, 'slug', slug);
    const stats = playerStats;

    const [popOpen, setPopOpen] = React.useState(false);

    const closePopup = () => {
        setPopOpen(false);
    }

    const [newOffer, setNewOffer] = React.useState([]);

    const NewOfferPopup = ({newOffer, popOpen, closePopup}) => {
        if (!newOffer.length) {

            const [newOfferVal, setNewOfferVal] = React.useState(500);

            console.log(newOfferVal);

            function changeValue (num) {
                if (newOfferVal + num <= 0) {
                    setNewOfferVal(prevValue => 0);
                } else {
                    setNewOfferVal(prevValue => prevValue + num);
                }

            }

            function checkOffer (val) {
                console.log(val);
            }
            function sendOffer (val) {
                console.log(val);
                setNewOffer([{'offer' : val}])

            }

            return (
                <Popup popOpen={popOpen} close={closePopup}>
                    <h3>
                        MAKE OFFER
                    </h3>

                    <div className="form-block">
                        <h4>
                            ENTER AMOUNT
                        </h4>

                        <div className="offer-grid">

                            <div className="col">
                                <button type="button" className="offer-btn dec_btn icon-minus"
                                        onClick={() => {changeValue(-50)}}
                                />
                                <input type="text" value={`${newOfferVal}k`} onChange={() => {checkOffer(newOfferVal)}}/>
                                <button type="button" className="offer-btn inc_btn icon-plus"
                                        onClick={() => {changeValue(50)}}
                                />
                            </div>

                            <div className="col">
                                <button type="submit" className="submit-btn submit_offer_btn"
                                        onClick={() => {sendOffer(newOfferVal)}}
                                >
                                    SUBMIT
                                </button>
                            </div>

                        </div>

                    </div>

                </Popup>
            )
        } else {
            return (
                <Popup popOpen={popOpen} close={closePopup}>
                    <h3>
                        MAKE OFFER
                    </h3>

                    <div className="offer-description">
                        Several users have made offers for this player. You will be notified of the transfer’s status
                        within 1 hour.
                    </div>

                    <div className="thin-block">
                        <button
                            type="submit"
                            className="submit-btn submit_offer_btn"
                            onClick={() => {closePopup()}}
                        >
                            CLOSE
                        </button>
                    </div>

                </Popup>
            )
        }
    }


    return (
        <div className="page-player">

            <div className="wrapper">
                <div className="top-block">
                    <div className="breadcrumbs">
                        <Link to={`/`}>League</Link>
                        / <Link to={`/`}>MY TEAM</Link>
                        / <span>{cPlayer.name}</span>
                    </div>

                    <Link to={-1} className="back-link">
                        <span className="ico icon-back" />
                        BACK
                    </Link>
                </div>


                <div className="player-info-grid">
                    <div className="player-info-block">
                        <div className="title-block">
                            <div className="flag">
                                <img src={flagImage} alt="flag"/>
                            </div>
                            <h1>
                                {cPlayer.name}
                            </h1>
                            <div className={`rating rang-${Math.floor(cPlayer.rating / 2)}`}>
                                {cPlayer.rating}
                            </div>

                            <div className="btn-holder">
                                <button
                                    type="button"
                                    className="b-button offer_btn"
                                    onClick={() => {setPopOpen(true)}}

                                >
                                    MAKE OFFER
                                </button>
                            </div>

                        </div>

                        <div className="info-block">
                            <div className="info">
                                Age: <span>37</span>
                            </div>
                            <div className="info">
                                Nationality: <span>Spanish</span>
                            </div>
                            <div className="info">
                                Position: <span>CB</span>
                            </div>
                            <div className="info">
                                Value: <span>10m</span>
                            </div>
                            <div className="info">
                                Team: <Link to={`/`}>Team name</Link>
                            </div>
                        </div>

                    </div>

                    <div className="attributes-block">
                        <h4>
                            Attributes
                        </h4>

                        <PlayerStats props={stats}/>
                    </div>

                    <div className="chart-block">
                        <h4>
                            Radar
                        </h4>

                        <div className="chart">
                            <PlayerChart props={stats} />
                        </div>


                    </div>

                    <div className="stats-block">
                        <div className="title-block">
                            <h4>
                                Stats
                            </h4>

                            <TeamDropdown props={seasons} />

                        </div>

                        <div className="stats-row">
                            <div className="col">
                                <h5 className="title">
                                    Games
                                </h5>
                                <div className="value">
                                    {cPlayer.games}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Goals
                                </h5>
                                <div className="value">
                                    {cPlayer.goals}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Assists
                                </h5>
                                <div className="value">
                                    {cPlayer.assists}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Key Tackles
                                </h5>
                                <div className="value">
                                    {cPlayer.keyTackles}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Key Passes
                                </h5>
                                <div className="value">
                                    {cPlayer.keyPasses}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Key Shots
                                </h5>
                                <div className="value">
                                    {cPlayer.keyShots}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Yellow
                                </h5>
                                <div className="value">
                                    {cPlayer.yellow}
                                </div>
                            </div>
                            <div className="col">
                                <h5 className="title">
                                    Red
                                </h5>
                                <div className="value">
                                    {cPlayer.red}
                                </div>
                            </div>
                            <div className="col fitness">
                                <h5 className="title">
                                    Fitness
                                </h5>
                                <div className="value">
                                    <div className="points">
                                        {cPlayer.fitness}
                                        {/*<span className={`ico ${cPlayer.pointsChange ? cPlayer.pointsChange : 'semi'}`} />*/}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <TransferBlock transfers={transfers} />

                </div>


            </div>

            <NewOfferPopup newOffer={newOffer} popOpen={popOpen} closePopup={closePopup}/>

        </div>
    )
}

export {PlayerPage}
