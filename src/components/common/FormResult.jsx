import React from "react";

function FormResult({show, props}) {

    if (!show || !props) {
        return ''
    }

    const icoStyle = {
        color: props.color,
        margin: "0 auto 10px",
        display: "flex",
        justifyContent: "center",
        fontSize:  "32px"
    };

    const titleStyle = {
        textAlign: "center"
    };

    return (
        <div className={`reset-flow-result ${show ? 'active' : ''}`}>
            <div className={`icon ${props.icon}`} style={icoStyle} />
            <h4 style={titleStyle}>
                {props.title}
            </h4>
            <div className="descr">
                {props.description}
            </div>

        </div>
    )

}

export {FormResult}
