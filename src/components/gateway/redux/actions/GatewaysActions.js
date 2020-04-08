import axios from '../../../../apiConfig';

const fetchedGateways = data => ({
    type: 'FETCH_LIST_GATEWAYS',
    gateways: data.data,
    total: data.total
});

const selectedGateway = data => ({
    type: 'SELECT_FROM_LIST',
    gateway: data
});

const setAddLoading = flag => ({
    type: 'SET_GATEWAY_ADD_LOADING',
    loading: flag
});

const setEditLoading = flag => ({
    type: 'SET_GATEWAY_EDIT_LOADING',
    loading: flag
});

const setDeleteLoading = flag => ({
    type: 'SET_GATEWAY_DELETE_LOADING',
    loading: flag
});

export const FetchGateways = (prms) => async dispatch => {
    const query = Object.keys(prms).map(k => `${k}=${prms[k]}`).join('&');
    try {
        const response = await axios.get(`gateways${query && `?${query}`}`);
        dispatch(fetchedGateways(response.data));
    } catch (e) {
        console.error(e);
    }
};

export const SelectGateway = id => async dispatch => {
    try {
        const response = await axios.get(`gateways?id=${id}`);
        dispatch(selectedGateway(response.data));
    } catch (e) {
        console.error(e);
    }
};

export const AddGateway = data => async dispatch => {
    dispatch(setAddLoading(true));
    try {
        await axios.post('gateways', data);
        dispatch(setAddLoading(false));
    } catch (e) {
        console.error()
    }
};

export const EditGateway = data => async dispatch => {
    const {_id, ...values} = data;
    dispatch(setEditLoading(true));
    try {
        await axios.put('gateways', {...values, id: _id});
        dispatch(setEditLoading(false));
    } catch (e) {
        console.error(e)
    }
};

export const DeleteGateway = data => async dispatch => {
    dispatch(setDeleteLoading(true));
    try {
        await axios.delete(`gateways`, {
            data
        });
        dispatch(setDeleteLoading(false));
    } catch (e) {
        console.error(e)
    }
};

