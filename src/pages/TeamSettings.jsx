import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {ColorPicker} from "../components/settings/ColorPicker";

import profileImage from "../../src/assets/profile.png"


function TeamSettings() {

    const teamInfo = {
        name: "Name",
        logo: profileImage,
        useAvatar: "false",
        colorPrimary: "#ffffff",
        colorSecondary: "#ffffff",
        colorThird: "#ffffff"

    }

    const [formData, setFormData] = useState(teamInfo);


    const [image, setImage] = useState(profileImage);
    const inputRef = useRef(null);


    const changeHandler = value => {
        setFormData({
            ...formData,
            country: value.label
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFormData({
                    ...formData,
                    logo: reader.result
                });

            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setImage(null);
            setFormData({
                ...formData,
                logo: null
            });

        }
    };

    const handleCheck = (event) => {
        const { name, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked ? "true" : "false"
        }));
    };

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

                <div className="form-block">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="i1">FIRST NAME *</label>
                            <input id="i1"
                                   type="text"
                                   name="firstName"
                                   value={formData.name}
                                   onChange={handleChange}
                                   required
                            />
                        </div>

                        <div className="form-group photo-group">
                            <div className="photo-grid">
                                <div className="upload-block">
                                    <h4>UPLOAD AVATAR</h4>
                                    <label htmlFor="photo_input" className="read-more-btn">CHOOSE FILE</label>
                                    <input ref={inputRef} id="photo_input" accept="image/*" type="file" onChange={handleImageChange} />
                                </div>
                                <div className="file-tab">
                                    <div className={`tab file-block ${formData.logo ? 'active' : ''}`}>
                                        <div className="image">
                                            <div className="image-clear-btn"  onClick={() => {handleClearImage()}}/>
                                            <img src={formData.logo} id="file_preview" alt="Предпросмотр" />
                                        </div>
                                    </div>
                                    <div className="tab default-block" />
                                </div>
                            </div>
                            <div className="checkbox-block round">
                                <input type="checkbox"
                                       id={`useAvatar_1`}
                                       name="useAvatar"
                                       value="true"
                                       checked={"true" === formData.useAvatar}
                                       onChange={handleCheck}
                                />
                                <label htmlFor={`useAvatar_1`}>
                                    Use my avatar
                                </label>
                            </div>

                        </div>

                        <div className="form-group color-group" style={{marginBottom: "50px"}}>
                            <h4>CHOOSE KIT COLOUR *</h4>
                            <div className="form-group color-container">
                                <h5>
                                    Primary
                                </h5>
                                <ColorPicker data={{colorPrimary: "#ffffff"}} handleChange={handleChange}  />
                            </div>
                            <div className="form-group color-container">
                                <h5>
                                    Secondary
                                </h5>
                                <ColorPicker data={{colorSecondary: "#ffffff"}} handleChange={handleChange}  />
                            </div>
                            <div className="form-group color-container">
                                <h5>
                                    Third
                                </h5>
                                <ColorPicker data={{colorThird: "#ffffff"}} handleChange={handleChange}  />
                            </div>

                        </div>

                        <button type="submit" className="submit-btn">
                            SAVE CHANGES
                        </button>
                    </form>

                </div>


            </div>

        </div>
    )
}

export {TeamSettings}
