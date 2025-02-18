import {useParams, Link} from 'react-router-dom'
import React, { useState , useRef, useMemo} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import profileImage from "../../src/assets/profile.png"

function LeagueSettings() {

    const leagueInfo = {
        name: "Some league name",
        avatar: profileImage,
        useAvatar: "false",
        teams: 20,
        users: [
            {
                id: 1,
                name: "Alice Johnson",
                avatar: profileImage
            },
            {
                id: 2,
                name: "Bob Smith",
                avatar: profileImage
            },
            {
                id: 3,
                name: "Charlie Brown",
                avatar: profileImage
            },
            {
                id: 4,
                name: "Diana Prince",
                avatar: profileImage
            },
            {
                id: 5,
                name: "Edward Norton",
                avatar: profileImage
            },
            {
                id: 6,
                name: "Fiona Gallagher",
                avatar: profileImage
            },
            {
                id: 7,
                name: "George Clooney",
                avatar: profileImage
            },
            {
                id: 8,
                name: "Hannah Montana",
                avatar: profileImage
            },
            {
                id: 9,
                name: "Ian Somerhalder",
                avatar: profileImage
            },
            {
                id: 10,
                name: "Julia Roberts",
                avatar: profileImage
            }
        ]

    }

    const [formData, setFormData] = useState(leagueInfo);


    const [image, setImage] = useState(null);
    const inputRef = useRef(null);

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

    const [invites, setInvites] = useState('');
    const [emailsValid, setEmailsValid] = useState(true);

    const handleInvites = (event) => {
        setInvites(event.target.value);
    }

    const validateEmails = (emails) => {
        const emailArray = emails.split(',')
            .map(email => email.trim())
            .filter(email => email.length > 0);

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const allValid = emailArray.every(email => emailPattern.test(email));

        setEmailsValid(allValid);

        if (allValid && emailArray.length) {
            return emailArray;
        } else {
            return false
        }

    }

    const sendInvites = () => {
        const validEmails = validateEmails(invites);
        console.log(validEmails); // Выводим валидные email'ы в консоль
    }

    const handleChangeAmount = (event) => {
        setFormData({
            ...formData,
            teams: event.target.value
        });

    };

    const teamsAmount = [10, 12, 14, 16, 18, 20]

    const radioTeamsAmount = teamsAmount.map(function (value, index) {
        return (
            <div key={index} className="checkbox-block round">
                <input type="radio"
                       id={`teams_amount_${value}`}
                       name="teams-amount"
                       value={value}
                       checked={formData.teams.toString() === value.toString()}
                       onChange={handleChangeAmount}
                />
                <label htmlFor={`teams_amount_${value}`}>
                    {value}
                </label>
            </div>

        )
    })

    const removeUserById = (users, id) => {
        return users.filter(user => user.id !== id);
    }

    const handleUsers = (id) => {
        const users = formData.users
        const updatedUsers = removeUserById(users, id);

        setFormData(prevFormData => ({
            ...prevFormData,
            users: updatedUsers
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };


    const UsersList = ({ users }) => {

        if (!users || users.length === 0) {
            return ''
        }

        return (
            <div className="users-container">
                <h4>
                    MANAGE USERS
                </h4>

                <div className="users-list">
                    {users.map((item, index) => (
                        <div key={index} className="user-item">
                            <div className="num">
                                {index + 1}.
                            </div>
                            <div className="image">
                                <img src={item.avatar} alt={item.name}/>
                            </div>
                            <div className="name">
                                {item.name}
                            </div>
                            <div className="button-col">
                                <button type="button"
                                        className="remove-button btn-clear"
                                        onClick={() => {handleUsers(item.id)}}
                                >
                                    <span className="ico icon-r-b-cross" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <div className="page-login">

            <div className="wrapper">

                <h1>
                    LEAGUE SETTINGS
                </h1>

                <div className="league-settings-wrapper">
                    <div className="league-settings-grid">
                        <div className="col">
                            <div className="form-block">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="i1">LEAGUE NAME</label>
                                        <input id="i1" type="text" defaultValue={formData.name}/>
                                    </div>

                                    <div className="photo-grid form-group">
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

                                    <div className="form-group">
                                        <h4>AMOUNT OF TEAMS</h4>
                                        <div className="radio-container">
                                            {radioTeamsAmount}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="i2">INVITE PEOPLE</label>
                                        <textarea name="" id="i2" cols="30" rows="10"
                                                  placeholder="Enter E-mail addresses here,separated by a comma"
                                                  onChange={handleInvites}
                                        />
                                        {!emailsValid && (
                                            <div className="tip">
                                                Emails not valid
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <button type="button"
                                                className="submit-btn thin-btn"
                                                onClick={() => {sendInvites()}}
                                        >
                                            SEND INVITES
                                        </button>
                                    </div>

                                    <div className="checkbox-block form-group round">
                                        <input type="checkbox" id="any_users" />
                                        <label htmlFor="any_users">
                                            ANY USERS CAN JOIN
                                        </label>
                                    </div>


                                </form>



                            </div>

                        </div>
                        <div className="col">
                            <UsersList users={formData.users} />
                        </div>

                    </div>

                    <div className="submit-block">
                        <button type="submit"
                                className="submit-btn"
                                onClick={handleSubmit}
                        >
                            CREATE AND SEND INVITES
                        </button>

                    </div>
                </div>

            </div>

        </div>
    )
}

export {LeagueSettings}
