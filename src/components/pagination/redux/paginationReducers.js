const inititalState = {
    page: 1,
    pageSize: 7
};

export default (state = inititalState, action) => {
    switch (action.type) {
        case 'SET_PAGINATION_PAGE':
            return {
                ...state, page: action.page
            };
        case 'SET_PAGINATION_PAGE_SIZE':
            return {
                ...state, pageSize: action.pageSize, page: 1
            };
        case 'RESET_PAGINATION':
            return inititalState
        default:
            return state;
    }
}