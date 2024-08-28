import jwt_decode from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { postLogin } from "../Services/login";
import { updateProfile, updateToken } from "../redux/action/profileAction";

const Login = () => {
  const hooksForm = useForm();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { register, handleSubmit } = hooksForm;

  const navigate = useNavigate();

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
      padding: "10px",
    },
    img: {
      width: "30%",
      minWidth: "100px",
      height: "auto",
      objectFit: "contain",
    },
  };

  const onHandleSubmit = (ev) => {
    const { username, password } = ev;

    const data = {
      username,
      password,
    };

    postLogin(data)
      .then(async (res) => {
        dispatch(updateToken(res.token));

        const userDetail = await jwt_decode(res.token);

        dispatch(updateProfile(userDetail));
        navigate("/");

        addToast("Login success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast("something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container} className="card">
        <form
          className="card-body py-4"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <img src="/assets/images/logo.png" style={styles.img} />
          <div className="h5 my-2">Welcome Back</div>
          <div className="body-1 mt-2 mb-5">Please Login to continue</div>
          <input
            type="username"
            className="form-control my-3"
            placeholder="Username"
            {...register("username")}
          />
          <input
            type="password"
            className="form-control my-3"
            placeholder="Password"
            {...register("password")}
          />
          <div className="text-end my-3">Forgot password ?</div>
          <button
            type="submit"
            className="btn btn--secondary  rounded-pill w-100 my-3"
            // onClick={onHandleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
