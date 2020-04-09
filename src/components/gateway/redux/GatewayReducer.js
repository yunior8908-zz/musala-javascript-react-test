const initialState = {
    gateways: [],
    loadingList: false,
    loadingAdd: false,
    loadingEdit: false,
    loadingDelete: false,
    total: 0,
    gateway: null
};

export default (state = initialState, action)=> {
    switch (action.type) {
        case 'FETCH_LIST_GATEWAYS':
            return {
                ...state, gateways: action.gateways, total: action.total
            };
        case 'SELECTED_GATEWAY':
            return {
                ...state, gateway: action.gateway
            };
        case 'SET_GATEWAY_ADD_LOADING':
            return {
                ...state, loadingAdd: action.loading
            };
        case 'SET_GATEWAY_EDIT_LOADING':
            return {
                ...state, loadingEdit: action.loading
            };
        case 'SET_GATEWAY_DELETE_LOADING':
            return {
                ...state, loadingDelete: action.loading
            };
        default:
            return state;
    }
}