import React from "react";
import { Route, Switch } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Accessory from "./Pages/Accessory";
import Admin from "./Pages/Admin";
import AdvanceSearch from "./Pages/AdvanceSearch";
import Customer from "./Pages/Customer";
import EditionCollection from "./Pages/EditionCollection";
import GameCollection from "./Pages/GameCollection";
import Login from "./Pages/Login";
import OrderDetail from "./Pages/OrderDetail";
import OrderList from "./Pages/OrderList";
import PickupLocation from "./Pages/PickupLocation";
import Seal from "./Pages/Seal";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout>
            <Component {...props}></Component>
          </Layout>
        );
      }}
    ></Route>
  );
};

const App = () => {
  return (
    <Switch>
      <AppRoute path="/" exact layout={MainLayout} component={OrderList} />
      <Route path="/login">
        <Login />
      </Route>
      <AppRoute
        path="/pickuplocation"
        layout={MainLayout}
        component={PickupLocation}
      />
      <AppRoute
        path="/gamecollection"
        layout={MainLayout}
        component={GameCollection}
      />
      <AppRoute
        path="/editioncollection"
        layout={MainLayout}
        component={EditionCollection}
      />
      <AppRoute
        path="/advancesearch"
        layout={MainLayout}
        component={AdvanceSearch}
      />
      <AppRoute path="/seal" layout={MainLayout} component={Seal} />
      <AppRoute path="/accessory" layout={MainLayout} component={Accessory} />
      <AppRoute path="/admin" layout={MainLayout} component={Admin} />
      <AppRoute path="/customer" layout={MainLayout} component={Customer} />

      <AppRoute
        path="/orderdetail/:orderNo"
        layout={MainLayout}
        component={OrderDetail}
      />
    </Switch>
  );
};

export default App;
