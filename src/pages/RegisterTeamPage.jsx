import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'

function RegisterTeamPage() {


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

    const [color, setColor] = useState('#FFFFFF');

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const style = {
        color: color
    };

    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    REGISTER
                </h1>

                <div className="steps">
                    <span>1. CREATE TEAM</span>
                    <span className="ico icon-chev-right" />
                    <span className="next-step">2. Personal information</span>
                </div>

                <div className="form-block">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="i1">TEAM NAME *</label>
                            <input id="i1" type="text" />
                        </div>

                        <div className="form-group photo-group">
                            <div className="photo-grid">
                                <div className="upload-block">
                                    <h4>UPLOAD LOGO</h4>
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
                                    <div className={`tab  default-block ${image ? '' : 'active'}`}>
                                        <div className="checkbox-block round">
                                            <input type="checkbox" id="no_logo" />
                                            <label htmlFor="no_logo">
                                                Use my avatar
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group color-group">
                            <h4>CHOOSE KIT COLOUR *</h4>
                            <div className="color-block">
                                <span className="ico icon-t-shirt"  style={style}/>
                                <label htmlFor="color_input" className="read-more-btn">CHANGE COLOUR</label>
                                <input
                                    id="color_input"
                                    type="color"
                                    value={color}
                                    onChange={handleColorChange}
                                />
                            </div>
                        </div>


                        <div className="checkbox-block form-group">
                            <input type="checkbox" id="policy" />
                            <label htmlFor="policy">
                                I have understood an agree to the <Link to={`#`}>Terms of service</Link> and the <Link to={`#`}>Privacy policy</Link>
                            </label>
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

export {RegisterTeamPage}
