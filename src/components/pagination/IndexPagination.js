import React from "react";
import Pagination from "react-paginating";
import {connect} from "react-redux";
import styled from 'styled-components';
import {SetPaginationPage, SetPaginationPageSize} from "./redux/PaginationActions";

const StyledPageLink = styled.span`
    cursor: pointer;
`;

function IndexPagination({total, page, pageSize, funcSetPaginationPage, funcSetPaginationPageSize}) {
    const handlePageChange = page => {
        funcSetPaginationPage(page);
    };

    const handleChangeLimit = e => {
        funcSetPaginationPageSize(Number(e.target.value));
    };

    return <>
        {total > 0 && <Pagination
            total={total}
            limit={pageSize}
            pageCount={total}
            currentPage={page}
        >
            {({
                  pages,
                  currentPage,
                  hasNextPage,
                  hasPreviousPage,
                  previousPage,
                  nextPage,
                  totalPages,
                  getPageItemProps
              }) => (
                <div className="pagination pagination-sm justify-content-center">
                <span
                    className="page-item"
                    {...getPageItemProps({
                        pageValue: 1,
                        onPageChange: handlePageChange
                    })}
                >
                    <StyledPageLink className="page-link">first</StyledPageLink>
                </span>
                    {hasPreviousPage && (
                        <span
                            className="page-item"
                            {...getPageItemProps({
                                pageValue: previousPage,
                                onPageChange: handlePageChange
                            })}
                        >
                         <StyledPageLink className="page-link">{'<'}</StyledPageLink>
                    </span>
                    )}
                    {pages.map(page => {
                        let activePage = null;
                        if (currentPage === page) {
                            activePage = {backgroundColor: '#fdce09'};
                        }
                        return (
                            <span
                                className={`page-item ${currentPage === page && 'active'}`}
                                {...getPageItemProps({
                                    pageValue: page,
                                    key: page,
                                    style: activePage,
                                    onPageChange: handlePageChange
                                })}
                            >
                            <StyledPageLink className="page-link">{page}</StyledPageLink>
                        </span>
                        );
                    })}

                    {hasNextPage && (
                        <span
                            className="page-item"
                            {...getPageItemProps({
                                pageValue: nextPage,
                                onPageChange: handlePageChange
                            })}
                        >
                       <StyledPageLink className="page-link">{'>'}</StyledPageLink>
                    </span>
                    )}

                    <span
                        className="page-item"
                        {...getPageItemProps({
                            pageValue: totalPages,
                            onPageChange: handlePageChange
                        })}
                    >
                    <StyledPageLink className="page-link">last</StyledPageLink>
                </span>
                    <select
                        className="form-control-sm"
                        style={{
                            marginLeft: 10
                        }}
                        placeholder="limit"
                        value={pageSize}
                        onChange={handleChangeLimit}
                    >
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                    </select>
                </div>
            )}
        </Pagination>}
    </>
}

const mapStateToProps = state => {
    return {
        page: state.pagination.page,
        pageSize: state.pagination.pageSize
    }
};

const mapDispatchtoProps = dispatch => ({
    funcSetPaginationPage: (page) => dispatch(SetPaginationPage(page)),
    funcSetPaginationPageSize: (pageSize) => dispatch(SetPaginationPageSize(pageSize)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(IndexPagination);