import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, updateToken } from "../redux/action/profileAction";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useResponsive } from "../hooks/use-responsive";
import { useBoolean } from "../hooks/use-boolean";
import SideMenu from "./SideMenu";

const Header = () => {
  const downMd = useResponsive("down", "md");
  const openMenu = useBoolean();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState();
  const token = useSelector((state) => state.profileReducer.token);
  const profile = useSelector((state) => state.profileReducer.profile);
  const styles = {
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "90px",
      paddingBlock: "10px",
      paddingLeft: "20px",
      paddingRight: "50px",
      backgroundColor: "#011627",
    },
    img: {
      width: "100px",
    },
  };

  const onHandleLogout = () => {
    navigate("/login");
    dispatch(updateToken(""));
    dispatch(updateProfile(""));
    localStorage.setItem("token", "");
  };

  return (
    <>
      <Drawer
        open={openMenu.value}
        anchor="left"
        onClose={() => openMenu.onFalse()}
      >
        <img
          src="/assets/images/logo.png"
          alt="logo"
          role="button"
          style={{ ...styles.img, margin: "10px auto" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <SideMenu />
      </Drawer>
      <div style={styles.headerContainer}>
        <div className="d-flex g-2">
          {downMd && (
            <IconButton onClick={() => openMenu.onToggle()}>
              <Menu
                fontSize="large"
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          )}
          <img
            src="/assets/images/logo.png"
            alt="logo"
            role="button"
            style={styles.img}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        <div>
          {token ? (
            <>
              <span className="text-white me-2">Hi, {profile?.name}</span>
              <Button
                variant="contained"
                onClick={onHandleLogout}
                sx={{ background: "#5581B3" }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ background: "#5581B3" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
