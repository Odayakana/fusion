import React from "react";


function TableHead() {


    return (

        <div className="players-list-container">
            <div className="header-row player-list-row">
                <div className="info-col">
                    Pos
                </div>
                <div className="info-col">
                    Name
                </div>
                <div className="info-col">
                    Fitness
                </div>
                <div className="info-col">
                    Position
                </div>
                <div className="info-col">
                    Points
                </div>
                <div className="info-col">
                    Games
                </div>
                <div className="info-col">
                    Goals
                </div>
                <div className="info-col">
                    Assists
                </div>
                <div className="info-col">
                    Yellow
                </div>
                <div className="info-col">
                    Red
                </div>
            </div>
        </div>
    )
}

export {TableHead}
