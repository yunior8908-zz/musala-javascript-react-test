import React from "react";

function Card({col = 4, title, body, footer}) {
    return <div className={`col col-${col}`}>
        <div className="card">
            <div className="card-header">{title}</div>
            <div className="card-body">{body}</div>
            <div className="card-footer">{footer}</div>
        </div>
    </div>
}

export default Card;