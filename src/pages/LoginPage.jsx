import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'

function LoginPage() {


    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    LOG IN
                </h1>

                <div className="form-block">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="i1">E-MAIL</label>
                            <input id="i1" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="i2">PASSWORD</label>
                            <input id="i2" type="password" />

                                <div className="tip">
                                    <Link to={`/password-reset-request`}>Forgot password?</Link>
                                </div>

                        </div>

                        <button type="submit" className="submit-btn">
                            LOG IN
                        </button>
                    </form>

                    <h4>
                        DON’T HAVE AN ACCOUNT?
                    </h4>

                    <Link to={`/register`} className="submit-btn">
                        REGISTER
                    </Link>
                </div>

            </div>

        </div>
    )
}

export {LoginPage}
