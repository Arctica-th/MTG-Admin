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

  const onBackClick = () => {
    history.push("/advancesearch");
  };

  return (
    <div className="container-fluid py-4">
      <div className="h4" onClick={onBackClick} type="button">
        <BsChevronLeft /> Edit
      </div>
      <AdvSearchComponent hooksForm={hooksForm} />
    </div>
  );
};

export default AdvSearchEdit;
