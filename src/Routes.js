import React, {lazy, Suspense} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Drawer from "./components/drawer/Drawer";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import SelectItemFromUrl from "./components/common/SelectItemFromUrl";
import styled from "styled-components";

const GatewysComponent = lazy(() => import('./components/gateway/IndexGatewayComponent'));
const GatewysAddComponent = lazy(() => import('./components/gateway/AddGatewayComponent'));
const GatewysEditComponent = lazy(() => import('./components/gateway/EditGatewayComponent'));
const GatewysDeleteComponent = lazy(() => import('./components/gateway/DeleteGatewayComponent'));

const DevicesComponent = lazy(() => import('./components/device/IndexDevicesComponent'));
const DevicesAddComponent = lazy(() => import('./components/device/AddDeviceComponent'));
const DevicesEditComponent = lazy(() => import('./components/device/EditDeviceComponent'));
const DevicesDeleteComponent = lazy(() => import('./components/device/DeleteDeviceComponent'));

const StyledMain = styled.main`
    width: 90.5%;
    margin-left: 231px;
    @media (max-width: 768px) {
      margin-Left: 87px;
    }
`;

function Routes(props) {
    return (<>
        <BrowserRouter>
            <SelectItemFromUrl/>
            <Navbar/>
            <section style={{
                display: 'flex',
                flexDirection: '',
                marginTop: 45
            }}>
                <Sidebar/>
                <Suspense fallback={<div className="spinner-grow"></div>}>
                    <StyledMain>
                        <Switch>
                            <Route path="/gateways" exact component={props => <GatewysComponent {...props} />}/>
                            <Route path="/gateways/add" exact component={props => <GatewysAddComponent {...props} />}/>
                            <Route path="/gateways/edit" exact
                                   component={props => <GatewysEditComponent {...props} />}/>
                            <Route path="/gateways/delete" exact
                                   component={props => <GatewysDeleteComponent {...props} />}/>
                            <Route path="/devices" exact
                                   component={props => <DevicesComponent {...props} />}/>
                            <Route path="/devices/add" exact
                                   component={props => <DevicesAddComponent {...props} />}/>
                            <Route path="/devices/edit" exact
                                   component={props => <DevicesEditComponent {...props} />}/>
                            <Route path="/devices/delete" exact
                                   component={props => <DevicesDeleteComponent {...props} />}/>
                        </Switch>
                    </StyledMain>
                </Suspense>
                <Drawer/>
            </section>
        </BrowserRouter>
    </>);
}

export default Routes;