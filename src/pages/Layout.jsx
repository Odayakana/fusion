import React from "react";

import {Link, Outlet, useLocation } from 'react-router-dom'
import { CNavLink } from '../components/CNavLink'
import { Notifications } from '../components/common/Notifications'
import { PersonalMenu } from '../components/common/PersonalMenu'
import { NewNotifications } from '../components/common/NewNotifications'
import { Chat } from '../components/common/Chat.jsx'

import playerImage from "../../src/assets/profile.png"
import notifications from "../json-data/notifications.json"
// import new_notifications from "../json-data/new-notifications.json"
import chat_info from "../json-data/chat.json"



function Layout() {

    const message = {
        // text : "THE SEASON CANNOT START UNTIL ALL  OF THE TEAMS IN YOUR LEAGUE HAVE AT LEAST 22 PLAYERS IN THEIR SQUADS.",
        // link: '/onboarding'
    }

    const new_notifications = []

    const [showNotifictains, setShowNotifictains] = React.useState(false);
    const [showPersonal, setShowPersonal] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);

    const PageAlert = (obj) => {

        if (!obj || !obj.length) {
            return ''
        }

        return (
            <div className="page-alert">
                {obj.message.text}
                {obj.message.link && (
                    <Link
                        className="alert-link icon-arrow-right"
                        to="submit"
                    >
                    </Link>
                )}
            </div>
        )
    }

    const notifLeng = notifications.length;

    const location = useLocation();
    const noHeaderRoutes = ['/register', '/login', '/password-reset-request', '/password-reset'];
    const showHeader = !noHeaderRoutes.includes(location.pathname);

    const footerRoutes = ['/dashboard-user', '/dashboard'];
    const showFooter = footerRoutes.includes(location.pathname);


    return (
    <>


        <header>

            <nav id='menu' className='main-menu'>
                <PageAlert message={message} />

                <div className='wrapper'>

                    <div className='logo-block'>
                        <CNavLink to="/" className='logo icon-logo'></CNavLink>
                    </div>

                    {showHeader &&
                        <>
                            <div className="nav-block">
                                <ul className="main-nav">
                                    <CNavLink to="/" active={['team']}>
                                        <span className='ico icon-team'></span>
                                        My team
                                    </CNavLink>
                                    <CNavLink to="/onboarding" active={['league', 'onboarding', 'match']}>
                                        <span className='ico icon-league'></span>
                                        League
                                    </CNavLink>
                                    <CNavLink to="/transfers-players" active={['transfers']}>
                                        <span className='ico icon-transfers'></span>
                                        Transfers
                                    </CNavLink>
                                    {/*<li className="message-item">*/}
                                    {/*    <button id="open_chat_btn" className="m_active"*/}
                                    {/*    onClick={() => {setShowChat(true)}}*/}
                                    {/*    >*/}
                                    {/*        <span className="ico icon-message" />*/}
                                    {/*        Messages*/}
                                    {/*    </button>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>

                            <div className="ctrls-block">
                                <div className="ctrl-btn icon-ball">
                                    <span className="count">1</span>
                                </div>

                                <div className="notifications-col">
                                    <button type="button" className="ctrl-btn icon-notif notifications_btn"
                                            onClick={(event) => {event.stopPropagation(); setShowNotifictains(true)}}
                                    >
                                        <span className="count">{notifLeng}</span>
                                    </button>

                                    <div className="notifications-block">
                                        <Notifications showNotifictains={showNotifictains} setShowNotifictains={setShowNotifictains} notifications={notifications} />
                                        <NewNotifications newNotifications={new_notifications} />
                                    </div>

                                </div>


                                <button type="button" className="profile-btn profile-nav-btn"
                                        onClick={(event) => {event.stopPropagation(); setShowPersonal(true)}}
                                >
                                    <div className="image-block">
                                        <img src={playerImage} alt="#" />

                                    </div>
                                    <span className="profile-nav-name">
                                username
                            </span>

                                    <PersonalMenu showPersonal={showPersonal} setShowPersonal={setShowPersonal} />


                                </button>

                            </div>

                        </>
                    }



                </div>

            </nav>

        </header>

        <div id="main" className={`${message ? 'alert-active' : ''}`}>
            <Outlet />
        </div>

        {showFooter &&
        <>
            <footer className="footer">
                <div className="wrapper">
                    <div className="l-side">
                        © NOVA, 2025. All rights reserved.
                    </div>

                    <ul>
                        <li>
                            <Link to={"#"}>
                                ABOUT
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"}>
                                SUPPORT & FEEDBACK
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"}>
                                TERMS OF SERVICE
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"}>
                                COOKIE POLICY
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"}>
                                PRIVACY POLICY
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
        }


        {/*<Chat messages={chat_info} showChat={showChat} setShowChat={setShowChat}/>*/}
      
    </>
  )
}

export {Layout}
