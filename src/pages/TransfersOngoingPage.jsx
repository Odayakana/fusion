import {useParams, Link} from 'react-router-dom'
import React from "react";

import { findObjectByKeyValue } from '../components/utils.js';
import {RangeSlider} from "../components/transfers/RangeSlider";
import {TeamDropdown} from "../components/common/Dropdown.jsx";
import {PlayersBlock} from "../components/transfers/PlayersBlock";
import {TransfersPageNav} from "../components/transfers/TransfersPageNav";
import {TransferFlowPopup} from "../components/transfers/Popups";

import playersInfo from "../json-data/players-market.json"

const teamInfo = {
    boosted : false,
    transferBudget : 200000000,
    remainingBudget : 20000000,
    squadSize : 25,
}

function TransfersOngoingPage() {


    const showFields = {
        position: "Pos",
        name : "Name",
        age : "Age",
        nationality : "Nationality",
        value : "Value",
        myOffer : "My offer",
    }

    function filterObjects(objects, filters) {
        return objects.filter(obj => {
            const matchesName = filters.name ? obj.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
            const matchesPosition = filters.position ? obj.position === filters.position : true;
            const matchesMinAge = filters.minAge !== null ? obj.age >= filters.minAge : true;
            const matchesMaxAge = filters.maxAge !== null ? obj.age <= filters.maxAge : true;
            const matchesMinVal = filters.minVal !== null ? obj.value >= filters.minVal : true;
            const matchesMaxVal = filters.maxVal !== null ? obj.value <= filters.maxVal : true;

            return matchesName && matchesPosition && matchesMinAge && matchesMaxAge && matchesMinVal && matchesMaxVal;
        });
    }



    const uniqueTitles = new Set(); // Для отслеживания уникальных titles

    const unicPositions = playersInfo.reduce((acc, current) => {
        if (!uniqueTitles.has(current.position)) {
            uniqueTitles.add(current.position);
            acc.push({ id: current.id, title: current.position });
        }
        return acc;
    }, []);

    unicPositions.unshift({ id: 0, title: 'All' });
    unicPositions.forEach((item, index) => {
        if (index > 0) {
            item.id = index; // Начинаем с 1, поскольку 0 уже занят элементом { id: 0, title: 'All' }
        }
    });


    function findMinMax(arr, field) {
        if (arr.length === 0) {
            return null; // Возвращаем null, если массив пустой
        }

        let min = arr[0][field];
        let max = arr[0][field];

        for (const obj of arr) {
            if (obj[field] < min) {
                min = obj[field];
            }
            if (obj[field] > max) {
                max = obj[field];
            }
        }

        return {
            min: min,
            max: max
        };
    }

    const ages = findMinMax(playersInfo, 'age')
    const values = findMinMax(playersInfo, 'value')

    const initFilters = {
        name : null,
        position : null,
        minAge : ages.min,
        maxAge : ages.max,
        minVal : values.min,
        maxVal : values.max,
    }

    const [filters, setFilters] = React.useState(initFilters);
    const [players, setPlayers] = React.useState(filterObjects(playersInfo, filters));

    function setName (name) {
        if (filters.name !== name) {
            const newFilters = {
                ...filters,
                name: name
            }

            setFilters((prevFilters) => newFilters);
            setPlayers(filterObjects(playersInfo, newFilters))
        }
    }

    function setPosition (id) {
        const positionObj = findObjectByKeyValue(unicPositions, 'id', id);
        const position = positionObj && positionObj.title !== "All" ? positionObj.title : null;

        if (filters.position !== position) {
            const newFilters = {
                ...filters,
                position: position,
            }

            setFilters((prevFilters) => newFilters);
            setPlayers(filterObjects(playersInfo, newFilters))
        }

    }

    function setMinMaxAge(min, max) {
        if (filters.minAge !== min || filters.maxAge !== max) {
            const newFilters = {
                ...filters,
                minAge: min,
                maxAge: max,
            }

            setFilters((prevFilters) => newFilters);
            setPlayers(filterObjects(playersInfo, newFilters))
        }
    }

    function setMinMaxValue(min, max) {
        if (filters.minVal !== min || filters.maxVal !== max) {
            const newFilters = {
                ...filters,
                minVal: min,
                maxVal: max,
            }

            setFilters((prevFilters) => newFilters);
            setPlayers(filterObjects(playersInfo, newFilters))
        }
    }
    const dropRef = React.useRef();
    const rangeAgeRef = React.useRef();
    const rangeValRef = React.useRef();

    function clearFilters() {
        setFilters((prevFilters) => initFilters);
        setPlayers(filterObjects(playersInfo, initFilters));
        dropRef.current.clear();
        rangeAgeRef.current.clear();
        rangeValRef.current.clear();
    }

    function numToPrice (num) {
        if (num >= 1000000) {
            // Если число больше или равно миллиону, делим на 1 миллион и округляем
            return Math.round(num / 1000000) + 'm';
        } else if (num >= 1000) {
            // Если число больше или равно тысяче, делим на 1000 и округляем
            return Math.round(num / 1000) + 'k';
        } else {
            // Если число меньше 1000, просто возвращаем его в виде строки
            return num.toString();
        }
    }

    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const [popOpen, setPopOpen] = React.useState(false);
    const [popEvent, setPopEvent] = React.useState(false);

    const closePopup = () => {
        setPopOpen(false);
    }

    const handlePopEvent = (event) => {
        setPopEvent(event);
    }
    const handlePopup = (event) => {
        setPopOpen(true);
        setPopEvent(event);
    }

    const handleBoost = (option) => {
        setPopOpen(false);
        console.log(option);
    }

    const handleSubmit = () => {
        setPopOpen(false);
        console.log('submited');
    }


    return (
        <div className="page-market">
            <div className="wrapper">
                <h1>
                    TRANSFER MARKET
                </h1>

                <TransfersPageNav />

                <div className="market-grid">

                    <div className="filters-col">

                        <div className={`filters ${filtersOpen ? 'active' : ''}`}>
                            <button className="show-filters"
                                    onClick={() => {setFiltersOpen(true)}}
                            >
                                SHOW FILTERS
                            </button>

                            <div className="form-block">
                                <div className="filters-container">
                                    <div className="form-group search-group">
                                        <label htmlFor="i1">SEARCH BY NAME *</label>
                                        <input id="i1" type="text"
                                               value={filters.name === null ? '' : filters.name}
                                               onChange={(event) => {setName(event.target.value)}}
                                        />
                                        <span className="ico icon-search" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="s1">POSITION</label>

                                        <TeamDropdown ref={dropRef} props={unicPositions} setId={(id) => setPosition(id)} startVal={'POSITION'}/>
                                    </div>

                                    <div className="range-sliders">
                                        <div className="form-group range-block">
                                            <h4>
                                                AGE
                                            </h4>

                                            <RangeSlider
                                                ref={rangeAgeRef}
                                                min={ages.min}
                                                max={ages.max}
                                                sendMinMax={setMinMaxAge}
                                            />

                                        </div>

                                        <div className="form-group range-block">
                                            <h4>
                                                VALUE
                                            </h4>

                                            <RangeSlider
                                                ref={rangeValRef}
                                                min={values.min}
                                                max={values.max}
                                                sendMinMax={setMinMaxValue}
                                            />

                                        </div>
                                    </div>
                                </div>

                                <div className="filters-bottom">
                                    <button className="hide-filters"
                                            onClick={() => {setFiltersOpen(false)}}
                                    >
                                        HIDE FILTERS
                                    </button>

                                    <div className="reset-col">
                                        <button className="reset-filters"
                                                onClick={() => {clearFilters()}}
                                        >
                                            Clear <span className="desc-text">filters</span> <span className="ico icon-s-cross" />
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="list-col">
                        <PlayersBlock players={players} fields={showFields} />
                    </div>

                    <div className="team-col">
                        <div className="team-container">
                            <div className="info-row">
                                <h4>
                                    My team
                                </h4>

                                <div className="info-container">
                                    <div className="info-block">
                                        <div className="i-title boost-title">
                                            Transfer budget
                                            <button
                                                type="button"
                                                className={`submit-btn trans-btn ${teamInfo.boosted ? 'disabled' : ''}`}
                                                onClick={() => {
                                                    handlePopup('boost')
                                                }}
                                            >
                                                BOOST
                                            </button>
                                        </div>
                                        <div className="i-value">
                                            <span className="ico icon-nova" />
                                            {numToPrice(teamInfo.transferBudget)}
                                        </div>
                                    </div>
                                    <div className="info-block">
                                        <div className="i-title">
                                            Remaining budget
                                        </div>
                                        <div className="i-value">
                                            <span className="ico icon-nova" />
                                            {numToPrice(teamInfo.remainingBudget)}
                                        </div>
                                    </div>
                                    <div className="info-block">
                                        <div className="i-title">
                                            Squad size
                                        </div>
                                        <div className="i-value">
                                            {teamInfo.squadSize} / 22
                                        </div>
                                    </div>

                                </div>

                                <div className={`tip ${teamInfo.squadSize >= 22 ? 'tip-success' : 'tip-alert'}`}>
                                    Minimum squad size: 22 <span className="ico icon-r-check" />
                                </div>
                            </div>

                            <div className="submit-row">
                                <button type="button"
                                        className={`submit-btn`}
                                        onClick={() => {
                                            handlePopup('submit')
                                        }}

                                >
                                    SUBMIT SQUAD
                                </button>
                            </div>

                        </div>

                    </div>



                </div>


            </div>

            <TransferFlowPopup info={teamInfo} popEvent={popEvent} setPopEvent={handlePopEvent} popOpen={popOpen} closePopup={closePopup} handleSubmit={handleSubmit} handleBoost={handleBoost}/>

        </div>
    )
}

export {TransfersOngoingPage}
