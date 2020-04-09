const setMessage = (message, route) => {
    return {
        type: 'SET_TEXT_MESSAGE',
        message,
        route
    }
};

export const SetTextMessage = (message, route) => dispatch => {
    dispatch(setMessage(message, route));
};