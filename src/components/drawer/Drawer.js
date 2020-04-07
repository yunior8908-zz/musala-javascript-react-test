import React from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import {SetDrawerVisible} from "./redux/DraweActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StyleDrawer = styled.div`
    position: absolute;
    padding: 20px 5px 5px 5px;
    top: 0;
    right: 0;
    bottom: 0;
    transition: width 2s linear;
    background: #fff;
    box-shadow: 2px 2px 8px 2px #666;
    z-index: 9999;
`;

const StyledCloseButton = styled(FontAwesomeIcon)`
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 18px;
    color: #000;
    text-align: center;
    vertical-align: middle;
    content-align: center;
    cursor: pointer;
`;

const StyledContent = styled.div`
   width: 100%;
   height: calc(100%);
   margin-top: 5px;
   background: #fff;
`;

function Drawer({visible, ContentComponent, funcCloseDrawer}) {
    return <>
        {visible && <StyleDrawer className="col col-11 col-sm-8 col-md-5 col-lg-5 col-xl-5">
            <StyledCloseButton icon="window-close" onClick={() => funcCloseDrawer()}/>
            <StyledContent>
                {ContentComponent}
            </StyledContent>
        </StyleDrawer>}
    </>
};

const mapStateToProps = state => ({
    visible: state.drawer.visible,
    ContentComponent: state.drawer.content
});

const mapDispatchToProps = dispatch => ({
    funcCloseDrawer: () => dispatch(SetDrawerVisible(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);