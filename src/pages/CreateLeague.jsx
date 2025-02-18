import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CreateLeague() {


    const [image, setImage] = useState(null);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setImage(null);
        }
    };

    const [startDate, setStartDate] = useState(new Date());


    const [selectedOption, setSelectedOption] = useState('');

    const handleChangeAmount = (event) => {
        setSelectedOption(event.target.value);
    };

    const teamsAmount = [10, 12, 14, 16, 18, 20]

    const radioTeamsAmount = teamsAmount.map(function (value, index) {
        return (
            <div key={index} className="checkbox-block round">
                <input type="radio"
                       id={`teams_amount_${value}`}
                       name="teams-amount"
                       value={value}
                       checked={selectedOption === value.toString()}
                       onChange={handleChangeAmount}
                />
                <label htmlFor={`teams_amount_${value}`}>
                    {value}
                </label>
            </div>

        )
    })

    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    CREATE LEAGUE
                </h1>

                <div className="form-block">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="i1">LEAGUE NAME *</label>
                            <input id="i1" type="text" />
                        </div>

                        <div className="form-group photo-group">
                            <div className="photo-grid">
                                <div className="upload-block">
                                    <h4>UPLOAD AVATAR*</h4>
                                    <label htmlFor="photo_input" className="read-more-btn">CHOOSE FILE</label>
                                    <input ref={inputRef} id="photo_input" accept="image/*" type="file" onChange={handleImageChange} />
                                </div>
                                <div className="file-tab">
                                    <div className={`tab file-block ${image ? 'active' : ''}`}>
                                        <div className="image">
                                            <div className="image-clear-btn"  onClick={() => {handleClearImage()}}/>
                                            <img src={image} id="file_preview" alt="Предпросмотр" />
                                        </div>
                                    </div>
                                    <div className="tab default-block" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <h4>AMOUNT OF TEAMS</h4>
                            <div className="radio-container">
                                {radioTeamsAmount}
                            </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="i2">INVITE PEOPLE</label>
                            <textarea name="" id="i2" cols="30" rows="10"
                                      placeholder="Enter E-mail addresses here,separated by a comma" />
                        </div>

                        <div className="checkbox-block form-group round">
                            <input type="checkbox" id="any_users" />
                                <label htmlFor="any_users">
                                    ANY USERS CAN JOIN
                                </label>
                        </div>


                        <button type="submit" className="submit-btn">
                            CREATE AND SEND INVITES
                        </button>
                    </form>

                    <div className="descr">
                        * Required field
                    </div>
                </div>

            </div>

        </div>
    )
}

export {CreateLeague}
