import React, {useState, useEffect} from "react";
import { findObjectByKeyValue } from '../utils.js';


function CommetariesBlock({commentaries, teams}) {

    function Comments({commentaries}) {

        if (!commentaries || commentaries.length === 0) {
            return '';
        }


        return (
            commentaries.map(function (comment) {

                if (comment.sender === "system") {
                    return (
                        <div key={comment.id} className={`system-row ${comment.type ? comment.type : ''}`}>
                            <div className="message">
                                {comment.message}
                            </div>
                        </div>
                    )
                }

                if (comment.sender === "player") {

                    const player = findObjectByKeyValue(teams, "id", comment.playerId);

                    return (
                        <div key={comment.id} className={`player-row ${comment.type === "playerOne" ? "l-row" : "r-row"}`}>
                            <div className="row-content">
                                <div className="time">
                                    <span className="ico" />
                                    {comment.time}
                                </div>
                                <div className="team-match-info">
                                    <div className="image-block">
                                        <img src={player.image} alt={player.title} />
                                    </div>
                                    <div className="messages-container">

                                        {comment.messages.map((message, index) => {

                                            const getIcon = (icon) => {
                                                if (icon) {
                                                    return (
                                                        <div className="ico"><img src={`/src/assets/messages/${message.ico}`} alt="" /></div>
                                                    )
                                                }
                                                return ""
                                            }

                                            const getMessage = (message) => {

                                                if (message) {
                                                    return (
                                                        <span dangerouslySetInnerHTML={{ __html: message }} />
                                                    )
                                                }
                                                return ""
                                            }

                                            return (
                                                <div key={message.id} className={`message-row ${message.type ? message.type : ""}`}>
                                                    {getIcon(message.ico)} {getMessage(message.message)}
                                                </div>
                                            )}
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            })
        );

    }



    return (
      <div className="flow-frame">
          <Comments commentaries={commentaries} />
      </div>
  )
}

export {CommetariesBlock}
