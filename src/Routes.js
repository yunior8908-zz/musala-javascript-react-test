import React, {lazy} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Drawer from "./components/drawer/Drawer";

const GatewysComponent = lazy(() => import('./components/gateway/IndexGateway'));
const GatewysAddComponent = lazy(() => import('./components/gateway/AddGateway'));
const GatewysEditComponent = lazy(() => import('./components/gateway/EditGateway'));
const GatewysDeleteComponent = lazy(() => import('./components/gateway/DeleteGateway'));

function Routes(props) {
    return (<>
        <BrowserRouter>
            <Switch>
                <Route path="/gateways" exact component={props => <GatewysComponent {...props} />}/>
                <Route path="/gateways/add" exact component={props => <GatewysAddComponent {...props} />}/>
                <Route path="/gateways/edit" exact component={props => <GatewysEditComponent {...props} />}/>
                <Route path="/gateways/delete" exact component={props => <GatewysDeleteComponent {...props} />}/>
            </Switch>
        </BrowserRouter>
        <Drawer/>
    </>);
}

export default Routes;