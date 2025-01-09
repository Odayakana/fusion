import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {SettingsPageNav} from "../components/settings/SettingsPageNav";


function SettingsNotifications() {

    const notificationsInfo = [
        {
            "id": 1,
            "label": "New messages",
            "value": true
        },
        {
            "id": 2,
            "label": "Transfer offers",
            "value": false
        },
        {
            "id": 3,
            "label": "Transfer status updates",
            "value": true
        },
        {
            "id": 4,
            "label": "Upcoming matches",
            "value": false
        },
        {
            "id": 5,
            "label": "System messages",
            "value": false
        },
        {
            "id": 6,
            "label": "Nova Newsletter",
            "value": false
        }
    ]

    const [formData, setFormData] = useState(notificationsInfo);

    const changeHandler = (id) => {

        setFormData(prevFormData => {
            const updatedFormData = prevFormData.map(item =>
                item.id === id ? { ...item, value: !item.value } : item
            );

            // updated data
            console.log(updatedFormData);

            return updatedFormData;
        });
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
                        <div className="form-block switchers-block">
                            <h4>
                                E-MAIL NOTIFICATIONS
                            </h4>
                            <form>
                                {formData.map((item, index) => (
                                    <div key={item.id} className="switcher">
                                        <input type="checkbox"
                                               id={`notification_${item.id}`}
                                               name={`notification_${item.id}`}
                                               value={item.value}
                                               checked={item.value}
                                               onChange={() => changeHandler(item.id)}
                                        />
                                        <label htmlFor={`notification_${item.id}`}>
                                            {item.label}
                                        </label>
                                    </div>
                                ))}
                            </form>

                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export {SettingsNotifications}
