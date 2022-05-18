import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const styles = {
    container: {
      width: "500px",
      height: "auto",
      backgroundColor: "white",
      textAlign: "center",
      boxShadow:
        "0px 3px 4px -2px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(0, 0, 0, 0.31)",
      borderRadius: "8px",
    },
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: "200px",
      height: "auto",
      objectFit: "contain",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container} className="card">
        <div className="card-body py-4">
          <img src="/assets/images/logo.png" style={styles.img} />
          <div className="h4 my-2">Welcome Back</div>
          <div className="body-1 mt-2 mb-5">Please Login to continue</div>
          <input
            type="email"
            className="form-control my-3"
            placeholder="Email"
          />
          <input
            type="password"
            className="form-control my-3"
            placeholder="Password"
          />
          <div className="text-end my-3">Forgot password ?</div>
          <button
            type="submit"
            className="btn btn-secondary rounded-pill w-100 my-3"
            onClick={() => {
              history.push("/");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
