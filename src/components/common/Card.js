import React from "react";

function Card({col = 4, title, body, footer, style, headerStyle, bodyStyle, footerStyle}) {
    return <div className={`col col-${col}`}>
        <div className="card" style={style}>
            <div className="card-header" style={headerStyle}>{title}</div>
            <div className="card-body" style={bodyStyle}>{body}</div>
            <div className="card-footer" style={footerStyle}>{footer}</div>
        </div>
    </div>
}

export default Card;