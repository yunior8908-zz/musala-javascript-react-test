import axios from '../../../../apiConfig';

const setListDevicesLoading = () => ({
    type: 'FETCH_LIST_DEVICES_LOADING'
});

const setListDevices = data => ({
    type: 'FETCH_LIST_DEVICES_SUCCESS',
    devices: data.data,
    total: data.total
});

const setSelectedDevice = device => ({
    type: 'SELECTED_DEVICE',
    device
});

const setAddLoading = flag => ({
    type: 'SET_ADD_DEVICE_LOADING',
    flag
});

const setEditLoading = flag => ({
    type: 'SET_EDIT_DEVICE_LOADING',
    flag
});

const setDeleteLoading = flag => ({
    type: 'SET_DELETE_DEVICE_LOADING',
    flag
});

export const SelectDevices= (id) => async dispatch => {
    try{
        const response = await axios.get(`/devices?id=${id}`);
        dispatch(setSelectedDevice(response.data));
    }catch (e) {
        console.error(e)
    }
};

export const FetchListDevices = params => async dispatch => {
    const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    dispatch(setListDevicesLoading());
    try {
        const response = await axios.get(`devices${query && `?${query}`}`);
        dispatch(setListDevices(response.data));
    } catch (e) {
        console.error(e);
    }
};

export const AddDevice = values => async dispatch => {
    dispatch(setAddLoading(true));
    try {
        await axios.post('devices', values);
        dispatch(setAddLoading(false));
    }catch (e) {
        console.error(e)
    }
};

export const EditDevice = data => async dispatch => {
    const {_id, ...values} = data;
    dispatch(setEditLoading(true));
    try {
        await axios.put('devices', {...values, id: _id});
        dispatch(setEditLoading(false));
    } catch (e) {
        console.error(e)
    }
};

export const DeleteDevice = data => async dispatch => {
    dispatch(setDeleteLoading(true));
    try {
        await axios.delete('devices', {
            data: data
        });
        dispatch(setDeleteLoading(false));
    }catch (e) {
        console.error(e)
    }
};