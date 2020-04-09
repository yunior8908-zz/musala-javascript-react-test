import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

function MessagesComponent({messages, time = 5}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timeOut = setTimeout(() => {
            setVisible(false)
        }, time * 1000);
        return () => {
            clearTimeout(timeOut);
        }
    }, [messages, time]);

    return <>
        {visible && <div className="text-center alert-danger text-danger">
            {messages.message}
        </div>}
    </>
}

const mapStateToProps = state => ({
    messages: state.messages
});

export default connect(mapStateToProps)(MessagesComponent)