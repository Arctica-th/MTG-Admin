import React, { useState, useEffect } from "react";
import Modal from "react-modal";
// import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import {
  getAdminByUsername,
  postAddAdmin,
  postEditAdmin,
} from "../Services/login";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const ModalCrudUser = ({
  isOpen,
  setIsOpen,
  modalType,
  callBack,
  item,
  setItem,
}) => {
  const { addToast } = useToasts();
  const [optionsRole, setOptionsRole] = useState(["superadmin", "admin"]);

  const { register, handleSubmit, control, reset, watch } = useForm();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minHeight: "400px",
      minWidth: "400px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
    setItem(null);
    reset();
  };

  const onInitData = () => {
    getAdminByUsername(item.username)
      .then((res) => {
        console.log("init admin", res);

        const data = {
          username: res.username,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          role: res.role,
        };

        reset(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (item && isOpen) {
      onInitData();
    }
  }, [item, isOpen]);

  const onHandleSubmit = async (ev) => {
    try {
      const data = {
        username: ev.username,
        password: ev.password,
        firstName: ev.firstName,
        lastName: ev.lastName,
        image: "string",
        email: ev.email,
        role: ev.role,
      };
      let response;

      if (modalType === "Edit") {
        response = await postEditAdmin(data);
      } else {
        response = await postAddAdmin(data);
      }

      callBack();
      closeModal();
      addToast(response?.error ?? "success", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.warn(error);

      addToast(error.message ?? "something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="h6">{modalType}</div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="my-3">
          <TextField
            label="First Name"
            {...register("firstName")}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: !!watch("firstName"),
            }}
          />
        </div>
        <div className="my-3">
          <TextField
            label="Last Name"
            {...register("lastName")}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: !!watch("lastName"),
            }}
          />
        </div>
        <div className="my-3">
          <TextField
            label="Username"
            {...register("username")}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: !!watch("username"),
            }}
          />
        </div>
        <div className="my-3">
          <TextField
            label="Email"
            {...register("email")}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: !!watch("email"),
            }}
          />
        </div>
        <div className="my-3">
          <TextField
            type="password"
            label="Password"
            {...register("password")}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: !!watch("password"),
            }}
          />
        </div>
        <div className="my-3">
          <Controller
            rules={{ required: true }}
            name="role"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select {...field} size="small" label="Role">
                  {optionsRole?.map((op) => {
                    return (
                      <MenuItem key={op} value={op}>
                        {op}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
        </div>

        {/* <div className="my-2">
          <div>Status</div>
          <div className="d-flex justify-content-around align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusUser"
                id="statusUser1"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="statusUser1">
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusUser"
                id="statusUser2"
              />
              <label className="form-check-label" htmlFor="statusUser2">
                InActive
              </label>
            </div>
          </div>
        </div> */}

        <div className="text-end">
          <button
            className="btn btn--outline-secondary me-3"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="btn btn--secondary " type="submit">
            {modalType === "Edit" ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCrudUser;
