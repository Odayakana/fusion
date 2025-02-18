import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import "react-datepicker/dist/react-datepicker.css";

function PasswordReset() {

    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
    });

    const [passMatch, setPassMatch] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => {
            const newFormData = { ...prevState, [name]: value };

            // Проверка совпадения паролей после обновления состояния
            setPassMatch(newFormData.password === newFormData.passwordConfirm);
            return newFormData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Логика отправки данных, если пароли совпадают
        if (formData.password === formData.passwordConfirm) {
            setSubmitted(true);
            window.location.href = '/login';
        }
    };

    const tipStyle = {
        display: passMatch ? 'none' : 'block',
        color: "#FF4F4F",
        textAlign: "left",
        fontSize: "12px"
    }


    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    New password
                </h1>

                <div className="form-block">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="pass_1">New password</label>
                            <input
                                id="pass_1"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass_1">Confirm new password</label>
                            <input
                                id="pass_1"
                                type="password"
                                name="passwordConfirm"
                                onChange={handleChange}
                                required
                            />
                            <div className="tip" style={tipStyle}>
                                Passwords don't match
                            </div>

                        </div>


                        <button type="submit" className="submit-btn">
                            SET NEW PASSWORD
                        </button>
                    </form>

                </div>


            </div>

        </div>
    )
}

export {PasswordReset}
