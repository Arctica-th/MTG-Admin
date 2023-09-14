import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, updateToken } from "../redux/action/profileAction";
import { Button } from "@mui/material";

const Header = () => {
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
      padding: "10px 50px",
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

  console.log({ profile });

  return (
    <div style={styles.headerContainer}>
      <div>
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
  );
};

export default Header;
