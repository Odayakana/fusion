import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'

function Onboarding() {



    return (
        <div className="page-login onboarding-page">

            <div className="wrapper">

                <h1>
                    WELCOME TO FUSION!
                </h1>

                <div className="steps">
                    NEXT STEPS:
                </div>

                <div className="next-tiles">
                    <div className="tile">
                        <Link to={`/create-league`} style={{backgroundImage : "url('/src/assets/tile_1.jpg')"}}>
                            <span className="h-block" style={{backgroundImage : "url('/src/assets/tile_1_h.jpg')"}} />
                            <h2>
                                CREATE LEAGUE
                            </h2>
                            <span className="descr">
                                Create your own league and invite your friends to play
                            </span>
                        </Link>
                    </div>
                    <div className="tile">
                        <Link to={`/join-league`} style={{backgroundImage : "url('/src/assets/tile_2.jpg')"}}>
                            <span className="h-block" style={{backgroundImage : "url('/src/assets/tile_2_h.jpg')"}} />
                            <h2>
                                JOIN LEAGUE
                            </h2>
                            <span className="descr">
                                YOU WILL BE RANDOMLY SORTED INTO A LEAGUE WITH FREE SLOTS
                            </span>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export {Onboarding}
