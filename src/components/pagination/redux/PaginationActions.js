const setPage = page => ({
    type: 'SET_PAGINATION_PAGE',
    page
});

const setPageSize = pageSize => ({
    type: 'SET_PAGINATION_PAGE_SIZE',
    pageSize
});

const resetPagination = ()=> ({
    type: 'RESET_PAGINATION'
});

export const SetPaginationPage = page => dispatch => {
    dispatch(setPage(page))
};

export const SetPaginationPageSize = pageSize => dispatch => {
    dispatch(setPageSize(pageSize));
};

export const ResetPagination = () => dispatch => {
    dispatch(resetPagination());
};