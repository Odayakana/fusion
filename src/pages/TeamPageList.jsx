import React from "react";

import {Link, useParams} from 'react-router-dom'
import { findObjectByKeyValue } from '../components/utils.js';

import {TeamPageNav} from "../components/team-page/TeamPageNav";
import {TeamDropdown} from "../components/common/Dropdown.jsx";
import {TableHead} from "../components/team-list/TableHead";
import {PlayerItems} from "../components/team-list/PlayerItems";

import teamsData from "../json-data/teams.json"
import formationsData from "../json-data/field-positions.json"
import tacticData from "../json-data/tactic.json"
import playersInfo from "../json-data/players.json"
import playersCountInfo from "../json-data/players-count.json"


function MyTeamList() {

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


    const [playersList, setPlayersList] = React.useState(playersData);

    const [activeSettings, setActiveSettings] = React.useState(false);

    const moveItem = (index, newIndex) => {

        if (newIndex < 0 || newIndex >= playersList.length || index === newIndex) {
            return null;
        }

        const itemToMove = playersList[index];

        const newItems = [...playersList];

        newItems.splice(index, 1);

        newItems.splice(newIndex, 0, itemToMove);

        setPlayersList(newItems);
    };


    return (
      <div className="page-index">

          <div className="wrapper">
              <TeamPageNav id={myTeamId}/>

              <div className="list-grid">

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

                              <TeamDropdown props={formationsData} />
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

                  <div className="l-players-col">
                      <div className="players-list">
                          <TableHead />

                          <PlayerItems
                              props={playersList}
                              moveItem={moveItem}
                          />


                      </div>

                  </div>

              </div>
              <button type="button" className="filters-btn icon-filters"
                      onClick={() => {setActiveSettings(true)}}
              />

          </div>


      </div>
  )
}

export {MyTeamList}
