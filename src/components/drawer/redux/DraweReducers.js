const initialState = {
    visible: false,
    content: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DRAWER_VISIBLE':
            return {
                visible: action.visible
            };
        case 'SET_DRAWER_CONTENT':
            return {
               ...state, content: action.content
            };
        default:
            return state
    }
}