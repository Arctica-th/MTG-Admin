import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SealComponent from "../Components/SealComponent";

const SealEdit = () => {
  const navigate = useNavigate();

  const [image64, setImage64] = useState([]);
  const hooksForm = useForm();

  const onHandleEdit = () => {};

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/seal")} role="button">
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
