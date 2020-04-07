import React, {useEffect} from "react";
import ListGateways from "./ListGateways";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {SelectGateway} from "./redux/actions/GatewaysActions";
import {connect} from "react-redux";

const SyledToolbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
`;

function IndexGateway({history, location, functSelectGateway}) {
    const {search} = location;
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(search);
        if (urlSearchParams.has('id')) {
            functSelectGateway(urlSearchParams.get('id'));
        }
    }, [search]);

    console.log("renderring...");

    const handleToFormAdd = () => {
        history.push('/gateways/add');
    };
    return <>
        <SyledToolbar>
            <button className="btn btn-sm btn-primary" onClick={handleToFormAdd}><FontAwesomeIcon icon="plus"/></button>
        </SyledToolbar>
        <ListGateways/>
    </>
};

const mapDispatchToProps = dispatch => ({
    functSelectGateway: (id) => dispatch(SelectGateway(id))
});

export default connect(null, mapDispatchToProps)(IndexGateway);