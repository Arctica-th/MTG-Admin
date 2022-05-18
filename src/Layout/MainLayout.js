import React from "react";
import Header from "../Components/Header";
import SideMenu from "../Components/SideMenu";
import { useSelector } from "react-redux";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

const MainLayout = ({ children }) => {
  const history = useHistory();
  const { pathname } = history.location;

  const route = useRouteMatch();
  const { url } = route;

  const styles = {
    body: {
      position: "absolute",
      top: "100px",
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: "scroll",
    },
  };

  return (
    <React.Fragment>
      <div className="position-relative " style={{ height: "100vh" }}>
        <Header />
        <div className="row w-100 hide-scrollbar-y" style={styles.body}>
          <div className="col-auto" style={{ width: "300px" }}>
            <SideMenu />
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
