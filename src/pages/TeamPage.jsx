import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {Link, useParams} from 'react-router-dom'
import { findObjectByKeyValue } from '../components/utils.js';

import {TeamPageNav} from "../components/team-page/TeamPageNav";
import {TeamDropdown} from "../components/common/Dropdown.jsx";
import {FieldPlayers} from "../components/team-page/FieldPlayers";
import {ListPlayers} from "../components/team-page/ListPlayers";
import {MobilePlayers} from "../components/team-page/MobilePlayers";
import teamsData from "../json-data/teams.json"
import formationsData from "../json-data/field-positions.json"
import tacticData from "../json-data/tactic.json"
import playersInfo from "../json-data/players.json"
import playersCountInfo from "../json-data/players-count.json"

// images
import imgField from "../assets/field.svg"


function MyTeamPitch() {


    const myTeamId = useParams().id;

    const getValueForCase = (input) => {
        let value;  // Используем let, так как value будет инициализирован в зависимости от case
        switch (input) {
            case '0':
                value = [];
                break;
            case '1':
                value = playersInfo;
                break;
            default:
                value = playersCountInfo;
        }
        return value; // Возвращаем значение, которое мы хотим присвоить константе
    };

    const playersData = getValueForCase(myTeamId)

    const [activeSettings, setActiveSettings] = React.useState(false);

    const [activeFormationId, setActiveFormationId] = React.useState(formationsData[0].id);
    const activeFormation = findObjectByKeyValue(formationsData, 'id', activeFormationId)


    const handleFormationChange = (id) => {
        setActiveFormationId(id)

        updatePlayersOnField(findObjectByKeyValue(formationsData, 'id', id));

    }

    const initialFieldPositions = activeFormation.positions.map((position, index) => ({
        id: index,
        title: position.position,
        player_id: null,
        player_info: null,
    }));

    const [playersOnField, setPlayersOnField] = React.useState(initialFieldPositions);

    const handlePlayersOnField = (place_id, playerId, playerInfo) => {
        setPlayersOnField(prevFieldPositions => {
            // Создаём новую версию поля
            const newFieldPositions = prevFieldPositions.map(position => ({ ...position }));

            const foundIndex = newFieldPositions.findIndex(obj => obj.id === place_id);

            if (foundIndex === -1) {
                return newFieldPositions; // Если индекс не найден, возвращаем текущее состояние
            }

            // Убираем игрока с предыдущей позиции, если таковой есть
            const existingPlayerIndex = newFieldPositions.findIndex(obj => obj.player_id === playerId);
            if (existingPlayerIndex !== -1) {
                newFieldPositions[existingPlayerIndex] = {
                    ...newFieldPositions[existingPlayerIndex],
                    player_id: null,
                    player_info: null,
                };
            }

            // Устанавливаем нового игрока на нужное место
            newFieldPositions[foundIndex] = {
                ...newFieldPositions[foundIndex],
                player_id: playerId,
                player_info: playerInfo,
            };

            return newFieldPositions; // Возвращаем обновлённое состояние
        });
    }

    const updatePlayersOnField = (newFormation) => {
        setPlayersOnField(prevFieldPositions => {
            return prevFieldPositions.map((position, index) => ({
                ...position,
                title: newFormation.positions[index]?.position || position.title, // Обновляем название позиции, если новая формирование есть
            }));
        });
    }

    const clearPlayerOnField = (playerId) => {
        setPlayersOnField(prevFieldPositions => {
            return prevFieldPositions.map(position => {
                if (position.player_id === playerId) {
                    return { ...position, player_id: null, player_info: null }; // Очищаем информацию о игроке
                }
                return position; // Возвращаем неизмененный объект
            });
        });
    }
    const [touchedPlayer, setTouchedPlayer] = React.useState(null);

    const handleTouchedPlayer = (obj) => {
        setTouchedPlayer(obj)
    }


    const updatePlayerInfo = (id, playerInfo) => {
        setPlayersOnField(prevPlayers => {

            const player_id = playerInfo ? playerInfo.id : touchedPlayer.id
            const player_info = playerInfo ? playerInfo : touchedPlayer

            const playerIndex = prevPlayers.findIndex(player => player.player_id === player_id);


            if (playerIndex === -1) {
                return prevPlayers.map((player) =>
                    player.id === id ? { ...player, player_id, player_info } : player
                );
            }

            if (prevPlayers[playerIndex].id !== id) {

                const curPlayer = prevPlayers[playerIndex];
                const prevPlayer = prevPlayers[id];

                return prevPlayers.map((player, index) => {
                    if (player.id === id) {
                        return { ...player, player_id: curPlayer.player_id, player_info: curPlayer.player_info };
                    }
                    if (player.id === playerIndex) {
                        return { ...player, player_id: prevPlayer.player_id, player_info: prevPlayer.player_info };
                    }
                    return player;
                });


            }

            return prevPlayers;


        });

        setTouchedPlayer(null);

    };


    return (
        <div className="page-index">

            <div className="wrapper">
                <TeamPageNav id={myTeamId}/>

                <div className="field-grid">
                    <div className={`settings-col m-filters-col ${activeSettings ? 'active' : ''}`}>
                        <button className="filters-close-btn icon-s-cross"
                                onClick={() => {setActiveSettings(false)}}
                        />

                        <div className="setting-block">
                            <div className="drop-container">
                                <h4>
                                    Select team
                                </h4>

                                <TeamDropdown props={teamsData} />
                            </div>
                        </div>

                        <div className="setting-block">
                            <div className="drop-container">
                                <h4>
                                    Select formation
                                </h4>

                                <TeamDropdown props={formationsData}  setId={handleFormationChange} />
                            </div>

                            <div className="drop-container">
                                <h4>
                                    Select tactic
                                </h4>

                                <TeamDropdown props={tacticData} />
                            </div>
                        </div>

                        <div className="setting-block">
                            <div className="grid-info-2">
                                <div className="col">
                                    <h4>
                                        Team name
                                    </h4>
                                    <div className="info">
                                        Test Team 001
                                    </div>
                                </div>
                                <div className="col">
                                    <h4>
                                        Managed by
                                    </h4>
                                    <div className="info">
                                        <Link to="#">
                                            username
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="setting-block">
                            <div className="grid-info-2">
                                <div className="col">
                                    <h4>
                                        Current position
                                    </h4>
                                    <div className="info">
                                        1st
                                    </div>
                                </div>
                                <div className="col">
                                    <h4>
                                        Overall rank
                                    </h4>
                                    <div className="info">
                                        5499
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="setting-block">
                            <div className="grid-info-3">
                                <div className="col">
                                    <h4>
                                        Goals for
                                    </h4>
                                    <div className="info">
                                        55
                                    </div>
                                </div>
                                <div className="col">
                                    <h4>
                                        Goals against
                                    </h4>
                                    <div className="info">
                                        12
                                    </div>
                                </div>
                                <div className="col">
                                    <h4>
                                        Clean sheets
                                    </h4>
                                    <div className="info">
                                        9
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="setting-block">
                            <div className="grid-info-3">
                                <div className="col">
                                    <h4>
                                        Wins
                                    </h4>
                                    <div className="info">
                                        20
                                    </div>
                                </div>
                                <div className="col">
                                    <h4>
                                        Draws
                                    </h4>
                                    <div className="info">
                                        1
                                    </div>
                                </div>
                                <div className="col">
                                    <h4>
                                        Losses
                                    </h4>
                                    <div className="info">
                                        2
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/team-settings" className="settings-submit-btn">
                            TEAM SETTINGS
                        </Link>

                    </div>

                    <DndProvider backend={HTML5Backend}>

                        <div className="field-col">
                            <div className="field-block">
                                <button type="button" className="filters-btn icon-filters"
                                        onClick={() => {setActiveSettings(true)}}
                                />

                                <img src={imgField} alt="field"/>

                                <FieldPlayers
                                    props={activeFormation}
                                    activePlayers={playersOnField}
                                    removePlayer={clearPlayerOnField}
                                    touchPlayer={handleTouchedPlayer}
                                    touchedPlayer={touchedPlayer}
                                    updatePlayerInfo={updatePlayerInfo}
                                />

                            </div>

                        </div>

                        <div className="players-col">

                            <ListPlayers
                                props={playersData}
                                activePlayers={playersOnField}
                                removePlayer={clearPlayerOnField}
                                touchPlayer={handleTouchedPlayer}
                                touchedPlayer={touchedPlayer}
                                updatePlayerInfo={updatePlayerInfo}

                            />
                        </div>

                    </DndProvider>

                </div>
            </div>

            <MobilePlayers
                props={playersData}
                activePlayers={playersOnField}
                removePlayer={clearPlayerOnField}
                touchPlayer={handleTouchedPlayer}
                touchedPlayer={touchedPlayer}
                updatePlayerInfo={updatePlayerInfo}

            />


        </div>
    )
}

export {MyTeamPitch}
