import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../redux/action/profileAction";

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
      height: "100px",
      padding: "10px 50px",
      backgroundColor: "#011627",
    },
    img: {
      width: "102px",
    },
  };

  const onHandleLogout = () => {
    dispatch(updateToken(""));
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
            navigate.push("/");
          }}
        />
      </div>

      <div>
        {token ? (
          <>
            <span className="text-white me-2">Hi, {profile?.role}</span>
            <button className="btn btn--secondary " onClick={onHandleLogout}>
              Log out
            </button>
          </>
        ) : (
          <button
            className="btn btn--secondary "
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
