import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'

function RegisterPage() {

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

    const [image, setImage] = useState(null);
    const inputRef = useRef(null);

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
    }

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

    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    REGISTER
                </h1>

                <div className="steps">
                    <span>1. CREATE TEAM</span>
                    <span className="ico icon-chev-right" />
                    <span>2. Personal information</span>
                </div>

                <div className="form-block">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="i1">FIRST NAME *</label>
                            <input id="i1" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="i2">LAST NAME</label>
                            <input id="i2" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="i3">E-MAIL *</label>
                            <input id="i3" type="text" />
                        </div>
                        <div className="form-group date-group">
                            <label htmlFor="date_input">DATE OF BIRTH</label>
                            <DatePicker
                                selected={startDate}
                                dateFormat="dd.MM.yyyy"
                                onChange={(date) => setStartDate(date)} />
                            <div className="ico icon-calendar" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="s1">COUNTRY</label>
                            <Select styles={customStyles} options={options} value={value} onChange={changeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="p1">PASSWORD</label>
                            <input id="p1" type="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="p2">CONFIRM PASSWORD *</label>
                            <input id="p2" type="password" />
                        </div>

                        <div className="form-group photo-group">
                            <div className="photo-grid">
                                <div className="upload-block">
                                    <h4>UPLOAD AVATAR</h4>
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

                        <button type="submit" className="submit-btn">
                            CONTINUE
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

export {RegisterPage}
