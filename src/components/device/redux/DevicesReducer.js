const initialState = {
    devices: [],
    total: 0,
    loading: true,
    loadingAdd: true,
    loadingEdit: true,
    loadingDelete: true,
    device: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_LIST_DEVICES_LOADING':
            return {
                ...state, loading: true
            };
        case 'FETCH_LIST_DEVICES_SUCCESS':
            return {
                ...state, loading: false, devices: action.devices, total: action.total
            };
        case 'SET_ADD_DEVICE_LOADING':
            return {
                ...state, loadingAdd: action.flag
            };
        case 'SET_EDIT_DEVICE_LOADING':
            return {
                ...state, loadingEdit: action.flag
            };
        case 'SET_DELETE_DEVICE_LOADING':
            return {
                ...state, loadingDelete: action.flag
            };
        case 'SELECTED_DEVICE':
            return {
                ...state, device: action.device
            };
        default:
            return state;
    }
}

