import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {SettingsPageNav} from "../components/settings/SettingsPageNav";


function SettingsPrivacy() {

    const privacyOptions = {
        messages: "anyone",
        visibility: "public"
    }

    const [formData, setFormData] = useState(privacyOptions);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };



    return (
        <div className="page-login page-settings">

            <div className="wrapper">

                <h1>
                    SETTINGS
                </h1>

                <div className="settings-grid">

                    <div className="col">
                        <SettingsPageNav />
                    </div>

                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <div className="form-block">
                                <div className="form-block privacy-block">
                                    <div className="form-group">
                                        <h4>
                                            WHO CAN MESSAGE YOU?
                                        </h4>

                                        <div className="checkbox-block round">
                                            <input type="radio"
                                                   id={`messages_1`}
                                                   name="messages"
                                                   value="anyone"
                                                   checked={"anyone" === formData.messages}
                                                   onChange={handleChange}
                                            />
                                            <label htmlFor={`messages_1`}>
                                                Anyone
                                            </label>
                                        </div>
                                        <div className="checkbox-block round">
                                            <input type="radio"
                                                   id={`messages_2`}
                                                   name="messages"
                                                   value="league"
                                                   checked={"league" === formData.messages}
                                                   onChange={handleChange}
                                            />
                                            <label htmlFor={`messages_2`}>
                                                League members only
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-block privacy-block" style={{marginBottom: "70px"}}>
                                    <div className="form-group">
                                        <h4>
                                            PROFILE PAGE VISIBILITY
                                        </h4>

                                        <div className="checkbox-block round">
                                            <input type="radio"
                                                   id={`visibility_1`}
                                                   name="visibility"
                                                   value="public"
                                                   checked={"public" === formData.visibility}
                                                   onChange={handleChange}
                                            />
                                            <label htmlFor={`visibility_1`}>
                                                Public
                                            </label>
                                        </div>
                                        <div className="checkbox-block round">
                                            <input type="radio"
                                                   id={`visibility_2`}
                                                   name="visibility"
                                                   value="league"
                                                   checked={"league" === formData.visibility}
                                                   onChange={handleChange}
                                            />
                                            <label htmlFor={`visibility_2`}>
                                                League members only
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="submit-btn">
                                    SAVE CHANGES
                                </button>

                            </div>
                        </form>

                    </div>

                </div>


            </div>

        </div>
    )
}

export {SettingsPrivacy}
