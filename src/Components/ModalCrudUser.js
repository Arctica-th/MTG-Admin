import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { postAddAdmin } from "../Services/login";
import { useToasts } from "react-toast-notifications";

const ModalCrudUser = ({ isOpen, setIsOpen, modalType }) => {
  const { addToast } = useToasts();
  const [optionsRole, setOptionsRole] = useState([
    { label: "Admin", value: "admin" },
  ]);

  const { register, handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

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
    reset();
  };

  const onHandleSubmit = (ev) => {
    const data = {
      username: ev.username,
      password: ev.password,
      firstName: ev.firstName,
      lastName: "S",
      image: "string",
      email: ev.email,
      role: ev.role.value,
    };

    postAddAdmin(data)
      .then((res) => {
        console.log(res);

        addToast(res ?? "success", {
          appearance: "success",
          autoDismiss: true,
        });

        closeModal();
      })
      .catch((err) => {
        console.log(err);

        addToast(err.message ?? "something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="h6">{modalType}</div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            {...register("firstName")}
          />
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            {...register("username")}
          />
        </div>
        <div className="my-2">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className="my-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <div className="my-2">
          {/* <Select
            placeholder="Role"
            options={optionsRole}
            {...register("role")}
          /> */}

          <Controller
            rules={{ required: true }}
            name="role"
            control={control}
            render={({ field }) => <Select {...field} options={optionsRole} />}
          />
        </div>

        <div className="my-2">
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
        </div>

        <div className="text-end">
          <button
            className="btn btn--outline-secondary me-3"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="btn btn--secondary " type="submit">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCrudUser;
