import React from "react";
import Header from "../Components/Header";
import SideMenu from "../Components/SideMenu";
import { useSelector } from "react-redux";
import { Routes, Route, Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const styles = {
    body: {
      position: "absolute",
      top: "100px",
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: "scroll",
      // height: "calc(100vh - 100px)",
    },
  };

  return (
    <React.Fragment>
      <div className="position-relative ">
        <Header />
        <div className="d-flex w-100  ">
          <div
            className=""
            style={{
              width: "300px",
              height: "calc(100vh - 90px)",
              overflowY: "scroll",
            }}
          >
            <SideMenu />
          </div>
          <div
            className="w-100"
            style={{ height: "calc(100vh - 90px)", overflowY: "scroll" }}
          >
            <div className="container-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
