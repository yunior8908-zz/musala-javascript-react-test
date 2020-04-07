const setVisibility = (visible) => ({
    type: 'SET_DRAWER_VISIBLE',
    visible
});

const setContent = (content) => ({
    type: 'SET_DRAWER_CONTENT',
    content
});


export const SetDrawerVisible = (visible) => dispatch => {
    dispatch(setVisibility(visible));
};

export const SetDrawerContent = (content) => dispatch => {
    dispatch(setContent(content));
};