import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
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

  return (
    <div style={styles.headerContainer}>
      <div>
        <img
          src="/assets/images/logo.png"
          alt="logo"
          role="button"
          style={styles.img}
          onClick={() => {
            history.push("/");
          }}
        />
      </div>

      <div>
        <button
          className="btn btn--secondary "
          onClick={() => {
            history.push("/login");
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Header;
