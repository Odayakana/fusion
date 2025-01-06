import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {FormResult} from "../components/common/FormResult";

function PasswordResetRequest() {

    const success = {
        icon : "icon-r-check",
        color: "#00CD5C",
        title: "Email sent",
        description : "Check your email and open the link we sent to continue"
    }

    const fail = {
        icon : "r-b-cross",
        color: "#FF4F4F",
        title: "Email error",
        description : "Error description"
    }

    const [formData, setFormData] = useState({
        email: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [sentResult, setSentResult] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // if sent ok
        setSubmitted(true);
        setFormData({ email: ''}); // reset form
        setSentResult(success)

        //else
        // setSubmitted(true);
        // setSentResult(fail)


    };

    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    Password reset
                </h1>

                <div className="form-block">

                    <div style={{display: submitted ? 'none' : 'block'}}>
                        <div className="description">
                            Enter your email and we'll send you a link to reset your password
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="i1">E-MAIL</label>
                                <input
                                    id="i1"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                SEND E-MAIL
                            </button>
                        </form>
                    </div>

                    <FormResult show={submitted} props={sentResult}/>

                </div>


            </div>

        </div>
    )
}

export {PasswordResetRequest}
