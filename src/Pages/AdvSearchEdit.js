import React from "react";
import { useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AdvSearchComponent from "../Components/AdvSearchComponent";

const AdvSearchEdit = () => {
  let { advId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();

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
      <AdvSearchComponent hooksForm={hooksForm} />
    </div>
  );
};

export default AdvSearchEdit;
