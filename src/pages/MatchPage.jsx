import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';

import {MatchPageNav} from "../components/match/MatchPageNav";
import {SubstitutionsList} from "../components/match/SubstitutionsList";
import {CommetariesBlock} from "../components/match/CommetariesBlock";
import {ListPlayers} from "../components/match/ListPlayers";


import {PlayerChart} from "../components/player-page/PlayerChart";
import {TransferBlock} from "../components/player-page/TransferBlock";
import {TeamDropdown} from "../components/common/Dropdown.jsx";
import {Popup} from "../components/common/Popup";

import matches from "../json-data/matches.json"
import leagueTeams from "../json-data/league-teams.json"
import PlayersTeamOne from "../json-data/match_players_1.json"
import PlayersTeamTwo from "../json-data/match_players_2.json"
import field_positions from "../json-data/field-positions.json"
import tacticData from "../json-data/tactic.json"
import commentaries from "../json-data/commentaries.json"

import imgField from "../assets/field.svg"
import formationsData from "../json-data/field-positions.json";


function MatchPage() {

    const {id} = useParams()
    const match = findObjectByKeyValue(matches, "id", Number(id));
    const teamOne = findObjectByKeyValue(leagueTeams, "id", match.team_1_id);
    const teamTwo = findObjectByKeyValue(leagueTeams, "id", match.team_2_id);

    const formationOne = findObjectByKeyValue(field_positions, "id", match.team_1_formation_id);

    const tactics = tacticData;
    const [activeTacticId, setActiveTacticId] = React.useState(teamOne.tacticId);
    const activeTactic = findObjectByKeyValue(tactics, "id", activeTacticId);

    const teamPlayersOne = PlayersTeamOne;

    function filterByNullField(arr, fieldName, empty) {
        if (empty) {
            return arr.filter(item => item[fieldName] === null);
        }
        return arr.filter(item => item[fieldName] !== null);

    }

    const [showFilters, setShowFilters] = React.useState(false);


    const [substitutionsPlayers, setSubstitutionsPlayers] = React.useState(filterByNullField(PlayersTeamOne, 'formationPlaceId', true));
    const [activePlayers, setActivePlayers] = React.useState(filterByNullField(PlayersTeamOne, 'formationPlaceId', false));


    const [subPopupActive, setSubPopupActive] = React.useState(false);

    function subPopClose () {
        setSubPopupActive(false);
    }

    const [tacPopupActive, setTacPopupActive] = React.useState(false);

    function tacPopClose () {
        setTacPopupActive(false);
    }

    function makeSub(activeId, subId) {

        const playerToChange = findObjectByKeyValue(teamPlayersOne, 'id', activeId);
        const subToChange = findObjectByKeyValue(teamPlayersOne, 'id', subId);

        setActivePlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === activeId ? subToChange : player
            )
        );
        setSubstitutionsPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === subId ? playerToChange : player
            )
        );

        subPopClose();
    }

    function changeTactic (id) {
        setActiveTacticId(id);
        tacPopClose();
    }

    const TacticPopup = ({popOpen, closePopup, tactics, activeTacticId, handleActiveTactic}) => {

        const [popTacId, setPopTacId] = React.useState(activeTacticId);

        const activeTactic = findObjectByKeyValue(tactics, "id", popTacId);

        function handleTacticId (id) {
            setPopTacId(id)
            // handleActiveTactic(id);
        }



        return (
            <div className={`popup substitution-popup ${popOpen ? 'active' : ''}`}>

                <div className="pop-content">
                    <button
                        type="button"
                        className="pop-close icon-s-cross"
                        onClick={() => {closePopup()}}
                    />

                    <h3>
                        CHANGE TACTIC
                    </h3>


                    <TeamDropdown props={tactics}  setId={handleTacticId} />

                    {activeTactic.properties ?
                        <div className="tactic-description">
                            <span className="good">Good against:</span>{activeTactic.properties.advantages} <br/>
                            <span className="bad">Bad against:</span>{activeTactic.properties.flaws}
                        </div>
                        : ''}

                    <div className="form-group submit-block">
                        <button
                            type="submit"
                            className="submit-btn"
                            onClick={() => {handleActiveTactic(popTacId)}}
                        >
                            CONFIRM
                        </button>
                    </div>

                </div>

            </div>
        )
    }


    const SubstitutionPopup = ({popOpen, closePopup, substitutionsPlayers, activePlayers, runSubstitution}) => {


        const [subPlayerId, setSubPlayerId] = React.useState(substitutionsPlayers[0].id);
        const [activePlayerId, setActivePlayerId] = React.useState(activePlayers[0].id);

        function renameNameToTitle(arr) {
            return arr.map(obj => {
                // создаём новый объект с изменённым полем
                const { name, ...rest } = obj; // деструктурируем объект
                return { title: name, ...rest }; // создаём новый объект с полем title
            });
        }
        function handleSubPlayerId (id) {
            setSubPlayerId(id);
        }

        function handleActivePlayerId (id) {
            setActivePlayerId(id);
        }

        const formActivePlayers = renameNameToTitle(activePlayers)
        const formSubstitutionsPlayers = renameNameToTitle(substitutionsPlayers)


        return (
            <div className={`popup substitution-popup ${popOpen ? 'active' : ''}`}>

                <div className="pop-content">
                    <button
                        type="button"
                        className="pop-close icon-s-cross"
                        onClick={() => {closePopup()}}
                    />

                    <h3>
                        MAKE A SUBSTITUTION
                    </h3>

                    <div className="subs-grid">
                        <div className="col">
                            <h4>
                                PLAYER
                            </h4>
                            <TeamDropdown props={formActivePlayers}  setId={handleActivePlayerId} />
                        </div>
                        <div className="col">
                            <h4>
                                REPLACE WITH
                            </h4>
                            <TeamDropdown props={formSubstitutionsPlayers}  setId={handleSubPlayerId} />
                        </div>

                    </div>

                    <div className="form-block">
                        <div className="form-group submit-block">
                            <button
                                type="submit"
                                className="submit-btn"
                                onClick={() => {runSubstitution(activePlayerId, subPlayerId)}}
                            >
                                MAKE SUBSTITUTION
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    return (
        <div className="page-match">
            <div className="wrapper">
                <div className="title-block">
                    <h1 className="teams-title">
                    <span className="team">
                        <span className="image">
                            <img src={teamOne.image} alt={teamOne.title} />
                        </span>
                        <span className="full-name">
                            {teamOne.title}
                        </span>
                        <span className="short-name">
                            {teamOne.shortTitle}
                        </span>
                    </span>
                        <span className="score">
                        {match.team_1_score} - {match.team_2_score}
                    </span>
                        <span className="team">
                        <span className="image">
                            <img src={teamTwo.image} alt={teamTwo.title} />
                        </span>
                        <span className="full-name">
                            {teamTwo.title}
                        </span>
                        <span className="short-name">
                            {teamTwo.shortTitle}
                        </span>
                    </span>
                    </h1>
                </div>

                <div className="match-date">
                    {match.date}
                </div>

                <MatchPageNav id={id} teamOneId={teamOne.id} />

                <div className="match-grid">

                    <div className={`ctrls-col ${showFilters ? 'active' : ''}`}>
                        <button type="button" className="filters-close-btn icon-s-cross"
                                onClick={() => {setShowFilters(false)}}
                        />

                        <div className="ctrls-frame">
                            <div className="ctrls-block">
                                <h4>
                                    4-4-2 {activeTactic.title}
                                </h4>

                                <button
                                    type="button"
                                    className="b-button tactic_btn"
                                    onClick={() => {setTacPopupActive(true)}}

                                >
                                    CHANGE TACTIC
                                </button>
                            </div>

                            <div className="ctrls-block">
                                <h4>
                                    SUBSTITUTIONS
                                </h4>

                                <SubstitutionsList subPlayers={substitutionsPlayers}/>

                                <button
                                    type="button"
                                    className="b-button substitution_btn"
                                    onClick={() => {setSubPopupActive(true)}}
                                >
                                    MAKE SUBSTITUTION
                                </button>
                            </div>

                        </div>
                    </div>


                    <div className="match-flow">
                        <div className="math-flow-frame">
                            <CommetariesBlock commentaries={commentaries} teams={leagueTeams}/>

                            <div className="final-score">
                                <span className="team">
                                    <span className="image">
                                        <img src={teamOne.image} alt={teamOne.title} />
                                    </span>
                                    <span className="full-name">
                                        {teamOne.title}
                                    </span>
                                    <span className="short-name">
                                        {teamOne.shortTitle}
                                    </span>
                                </span>
                                <span className="score">
                                    {match.team_1_score} - {match.team_2_score}
                                </span>
                                            <span className="team">
                                    <span className="image">
                                        <img src={teamTwo.image} alt={teamTwo.title} />
                                    </span>
                                    <span className="full-name">
                                        {teamTwo.title}
                                    </span>
                                    <span className="short-name">
                                        {teamTwo.shortTitle}
                                    </span>
                                </span>

                            </div>

                            <Link to={`/match/${id}/summary/${teamOne.id}`} className="submit-btn">MATCH SUMMARY</Link>

                        </div>

                    </div>

                </div>

                <button type="button" className="filters-btn icon-filters"
                        onClick={() => {setShowFilters(true)}}
                />

            </div>

            <TacticPopup popOpen={tacPopupActive} closePopup={tacPopClose} tactics={tactics} activeTacticId={activeTacticId} handleActiveTactic={changeTactic}/>

            <SubstitutionPopup popOpen={subPopupActive} closePopup={subPopClose} substitutionsPlayers={substitutionsPlayers} activePlayers={activePlayers} runSubstitution={makeSub}/>

        </div>
    )
}

export {MatchPage}
