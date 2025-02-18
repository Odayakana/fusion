import React from "react";


function PlayerStats({props}) {

    return (
        <div className="asd">
            <ul>
                {Object.entries(props[0]).map(([key, value]) => (
                    <li key={key}>
                        <h5 className="title">
                            {key}
                        </h5>
                        <span className={`score rang-${Math.floor(value / 20)}`}>
                            {value}
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export {PlayerStats}
