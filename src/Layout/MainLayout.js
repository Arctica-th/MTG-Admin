import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import SideMenu from "../Components/SideMenu";
import { useResponsive } from "../hooks/use-responsive";

const MainLayout = () => {
  const upMd = useResponsive("up", "md");

  return (
    <React.Fragment>
      <div className="position-relative ">
        <Header />
        <div className="d-flex w-100  ">
          {upMd && (
            <Box
              sx={{
                width: "350px",
                height: "calc(100vh - 90px)",
                overflowY: "scroll",
              }}
            >
              <SideMenu />
            </Box>
          )}
          <div
            className="w-100"
            style={{ height: "calc(100vh - 90px)", overflowY: "scroll" }}
          >
            <div className="container-lg">
              <Outlet />
            </div>
          </div>
        </div>

        <div className="position-absolute bottom-0 end-0 p-2 text-secondary">
          version 0.0.15
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
