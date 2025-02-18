import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../team-page/itemTypes.js";
import {findObjectByKeyValue} from "../utils.js";
import {Link} from "react-router-dom";
import {Popup} from "../common/Popup.jsx";
import notifications from "../../json-data/notifications.json";


function Chat({messages, showChat, setShowChat}) {

    console.log(showChat);

    const [activeChatId, setActiveChatId] = React.useState(messages[0].id);
    const [chatOpen, setChatOpen] = React.useState(false);


    function countNewMessages(data) {
        let count = 0;
        data.forEach(item => {
            item.messages.forEach(message => {
                if (message.statusNew) {
                    count++;
                }
            });
        });
        return count;
    }

    function countNewChatMessages(data) {
        let count = 0;
        data.messages.forEach(message => {
            if (message.statusNew) {
                count++;
            }
        });
        return count;
    }

    const activeChat = findObjectByKeyValue(messages, 'id', activeChatId);

    const Chats = messages.map((item, index) => {

        function findLastMessage(item) {
            if (item.messages.length > 0) {
                // Возвращаем последний элемент в messages
                return item.messages[item.messages.length - 1];
            } else {
                // Если сообщений нет, возвращаем null или иное значение
                return null;
            }
        }

        const formatDate = (timestamp) => {
            const date = new Date(timestamp * 1000);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            // Форматируем часы и минуты
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            if (date.toDateString() === today.toDateString()) {
                // Если дата совпадает с сегодняшней
                return `${hours}:${minutes}`;
            } else if (date.toDateString() === yesterday.toDateString()) {
                // Если дата совпадает с вчерашним днем
                return "Yesterday";
            } else {
                // Форматируем дату в "дд.мм.гггг"
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
                const year = date.getFullYear();

                return `${day}.${month}.${year}`;
            }
        };

        return (
            <li key={index}>
                <button
                    className="contact-container open_chat_body_btn"
                    onClick={() => {setActiveChatId(item.id); setChatOpen(true)}}
                >
                    <div className="image-col">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="content-col">
                        <div className="flex-block title-block">
                            <h4>
                                {item.title}
                            </h4>
                            <div className="info-block">
                                <div className="count">
                                    {countNewChatMessages(item)}
                                </div>
                                <div className="time">
                                    {formatDate(findLastMessage(item).time)}
                                </div>
                            </div>
                        </div>
                        <div className="messages-block">
                            <div className="message">
                                {findLastMessage(item).message}
                            </div>
                        </div>
                    </div>
                </button>
            </li>

        );
    });

    const ChatMessages = (chat) => {
        if (!chat || chat.messages.length === 0) {
            return null; // Return null instead of an empty string for better rendering
        }

        const formatDate = (timestamp) => {
            const date = new Date(timestamp * 1000);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            if (date.toDateString() === today.toDateString()) {
                return 'Today';
            } else if (date.toDateString() === yesterday.toDateString()) {
                return 'Yesterday';
            } else {
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
            }
        };

        const formatTime = (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        // Group messages by date
        const groupedMessages = chat.messages.reduce((acc, message) => {
            const messageDate = new Date(message.time * 1000).toDateString();
            if (!acc[messageDate]) {
                acc[messageDate] = [];
            }
            acc[messageDate].push(message);
            return acc;
        }, {});

        return (
            <div>
                {Object.keys(groupedMessages).map((dateKey) => {
                    const messagesOnDate = groupedMessages[dateKey];
                    const displayDate = formatDate(messagesOnDate[0].time);

                    // Group by sender
                    const senderGroups = messagesOnDate.reduce((acc, message) => {
                        if (!acc[message.sender]) {
                            acc[message.sender] = [];
                        }
                        acc[message.sender].push(message);
                        return acc;
                    }, {});

                    return (
                        <div key={dateKey}>
                            <div className="day-row">
                                <div className="day">{displayDate}</div>
                            </div>
                            {Object.keys(senderGroups).map((sender) => {
                                const senderImage = senderGroups[sender][0].image; // Assuming every message has an 'image' attribute.

                                return (
                                    <div key={sender} className="contact-container">
                                        <div className="image-col">
                                            <img src={senderImage} alt={sender} />
                                        </div>
                                        <div className="content-col">
                                            <div className="title-block">
                                                <h4>
                                                    {sender}:
                                                </h4>
                                            </div>
                                            {senderGroups[sender].map((msg, index) => (
                                                <div key={index} className="flex-block messages-block">
                                                    <div className="message">
                                                        {msg.message}
                                                    </div>
                                                    <div className="time">
                                                        {formatTime(msg.time)} {/* Use formatTime for displaying hours and minutes */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };


    return (
        <div className={`chat-popup popup ${showChat ? 'active' : ''}`}>
            <button className="pop-close icon-s-cross"
                    onClick={() => {setShowChat(false)}}
            />
            <div id="chat_pop_content" className="pop-content chat-pop-content">
                <div id="chat_container">
                    <div className="chat-grid">
                        <div className="left-col">
                            <div className="chat-header">
                                <div className="title">
                                    <button className="close_chat ico icon-chev-right"
                                            onClick={() => {setShowChat(false)}}
                                    />
                                    <h2>
                                        MESSENGER
                                    </h2>
                                </div>
                                <div className="count">
                                    {countNewMessages(messages)}
                                </div>
                            </div>

                            <div className="main-block">
                                <div className="frame">
                                    <ul className="contacts-list">
                                        {Chats}
                                    </ul>
                                </div>
                            </div>

                            <div className="footer-block">
                                <form action="#">
                                    <div className="search-form-block">
                                        <input type="text" placeholder="Search" />
                                        <button type="submit" className="ico icon-search" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={`right-col chat_col ${chatOpen ? 'active' : ''}`}>
                            <div id="chat_body_container">
                                <div className="chat-header">
                                    <div className="title">
                                        <button className="close_chat ico icon-chev-right close_chat_body_btn"
                                                onClick={() => {setChatOpen(false)}}
                                        />
                                        <h2>
                                            {activeChat.title}
                                        </h2>
                                    </div>
                                    <div className="info">
                                        {activeChat.members} members
                                        <div className="ico icon-tip" />
                                    </div>
                                </div>
                                <div className="main-block">

                                    <div id="chat_body">

                                        <div className="frame">

                                            {ChatMessages(activeChat)}

                                        </div>

                                    </div>



                                </div>
                                <div className="footer-block">
                                    <form action="#">
                                        <div className="ctrls-form-block">
                                            <div className="textarea-group">
                                                <textarea name="" id="" placeholder="Write a message..." />
                                            </div>
                                            <div className="ctrls-block">
                                                <div className="form-group">
                                                    <button className="ico icon-hexagon" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="file" id="chat_file" />
                                                    <label htmlFor="chat_file" className="ico icon-file" />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="ico icon-send" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

)

}

export {Chat}
