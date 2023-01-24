import React from "react";

const Alert = (props) => {
    return (
        <div className={`alert ${props.type} fade show`} role="alert">
            {props.message}
        </div>
    )
}

export default Alert;
