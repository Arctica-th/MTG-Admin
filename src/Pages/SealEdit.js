import React, { useState } from "react";
import SealComponent from "../Components/SealComponent";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const SealEdit = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [image64, setImage64] = useState([]);
  const hooksForm = useForm();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = hooksForm;

  const onHandleEdit = () => {};

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => history.goBack()} role="button">
          <BsChevronLeft /> Edit
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleEdit}>
            Submit
          </button>
        </div>
      </div>
      <SealComponent
        hooksForm={hooksForm}
        image64={image64}
        setImage64={setImage64}
      />
    </div>
  );
};

export default SealEdit;
