const initialState = {
    message: "",
    route: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TEXT_MESSAGE':
            return {
                ...state, message: action.message, route: action.route
            };
        default:
            return state;
    }
}