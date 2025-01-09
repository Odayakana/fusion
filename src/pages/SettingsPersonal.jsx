import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {SettingsPageNav} from "../components/settings/SettingsPageNav";

import profileImage from "../../src/assets/profile.png"


function SettingsPersonal() {

    const personalInfo = {
        firstName: "Name",
        lastName: "Name",
        email: "hello@mail.com",
        dateOfBirth: "8/26/2025",
        country: "Albania",
        password: "123456",
        avatar: profileImage

    }

    const [formData, setFormData] = useState(personalInfo);


    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: ' #0E1020', // Цвет фона
            color: '#ffffff', // Цвет текста
            border: '1px solid #ffffff', // Цвет границы
            boxShadow: 'none',
            height: '40px',
            borderRadius: '8px',
            '&:hover': {
                border: '1px solid #ffffff',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            height: '40px',
            color: '#ffffff', // Цвет текста

        }),
        valueContainer: (provided) => ({
            // ...provided,
            height: '40px',
            lineHeight: '40px',
            fontSize: '14px',
            padding: '0 14px'
        }),
        input: (provided) => ({
            height: 40,
            pointerEvents: 'none',
            position: "absolute",
            top: 0,
            left: 0,
            width: "200px",
            padding: '0 14px'

        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#4F7BFF' : ' #0E1020', // Цвет фона при наведении
            color: state.isFocused ? '#ffffff' : '#ffffff', // Цвет текста
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: ' #0E1020', // Цвет фона меню
            border: '1px solid #ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            fontSize: '14px',
            zIndex: 20

        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#ffffff', // Цвет выбранного значения
            height: '40px',

        }),
    };

    const [image, setImage] = useState(profileImage);
    const inputRef = useRef(null);

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const selectedCountry = options.find(option => option.label === formData.country);

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
                    avatar: reader.result
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
                avatar: null
            });

        }
    };

    const setDate = (date) => {

        setFormData({
            ...formData,
            dateOfBirth: date.toLocaleDateString('en-Us')
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [passMatch, setPassMatch] = useState(true);
    const [passData, setPassData] = useState({
        password: formData.password,
        passwordConfirm: formData.password,
    });

    const handlePass = (e) => {
        const { name, value } = e.target;

        setPassData(prevState => {
            const newPassData = { ...prevState, [name]: value };

            // Проверка совпадения паролей с использованием нового состояния
            setPassMatch(newPassData.password === newPassData.passwordConfirm);

            if (newPassData.password === newPassData.passwordConfirm) {
                setFormData({
                    ...formData,
                    password: newPassData.password
                });
            }

            return newPassData;
        });
    };

    const tipStyle = {
        display: passMatch ? 'none' : 'block',
        color: "#FF4F4F",
        textAlign: "left",
        fontSize: "12px"
    }

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
                        <div className="form-block">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="i1">FIRST NAME *</label>
                                    <input id="i1"
                                           type="text"
                                           name="firstName"
                                           value={formData.firstName}
                                           onChange={handleChange}
                                           required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="i2">LAST NAME</label>
                                    <input id="i2"
                                           type="text"
                                           name="lastName"
                                           value={formData.lastName}
                                           onChange={handleChange}
                                           required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="i3">E-MAIL *</label>
                                    <input id="i3"
                                           type="email"
                                           name="email"
                                           value={formData.email}
                                           onChange={handleChange}
                                           required
                                    />
                                </div>
                                <div className="form-group date-group">
                                    <label htmlFor="date_input">DATE OF BIRTH</label>
                                    <DatePicker
                                        selected={formData.dateOfBirth}
                                        dateFormat="dd.MM.yyyy"
                                        name="dateOfBirth"
                                        onChange={(date) => setDate(date)} />
                                    <div className="ico icon-calendar" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="s1">COUNTRY</label>
                                    <Select styles={customStyles} options={options} value={selectedCountry} onChange={changeHandler} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="p1">PASSWORD</label>
                                    <input
                                        id="pass_1"
                                        type="password"
                                        name="password"
                                        value={passData.password}
                                        onChange={handlePass}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="p2">CONFIRM PASSWORD *</label>
                                    <input
                                        id="pass_1"
                                        type="password"
                                        name="passwordConfirm"
                                        value={passData.passwordConfirm}
                                        onChange={handlePass}
                                        required
                                    />
                                    <div className="tip" style={tipStyle}>
                                        Passwords don't match
                                    </div>
                                </div>

                                <div className="form-group photo-group">
                                    <div className="photo-grid">
                                        <div className="upload-block">
                                            <h4>UPLOAD AVATAR</h4>
                                            <label htmlFor="photo_input" className="read-more-btn">CHOOSE FILE</label>
                                            <input ref={inputRef} id="photo_input" accept="image/*" type="file" onChange={handleImageChange} />
                                        </div>
                                        <div className="file-tab">
                                            <div className={`tab file-block ${formData.avatar ? 'active' : ''}`}>
                                                <div className="image">
                                                    <div className="image-clear-btn"  onClick={() => {handleClearImage()}}/>
                                                    <img src={formData.avatar} id="file_preview" alt="Предпросмотр" />
                                                </div>
                                            </div>
                                            <div className="tab default-block" />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="submit-btn">
                                    SAVE CHANGES
                                </button>
                            </form>

                            <div className="descr">
                                * Required field
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export {SettingsPersonal}
