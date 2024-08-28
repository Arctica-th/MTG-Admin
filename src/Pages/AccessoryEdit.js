import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AccessoryComponent from "../Components/AccessoryComponent";

const AccessoryEdit = () => {
  const navigate = useNavigate();

  const [image64, setImage64] = useState([]);
  const hooksForm = useForm();

  const onHandleCreate = async () => {};

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/accessory")} role="button">
          <BsChevronLeft /> Edit
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleCreate}>
            Submit
          </button>
        </div>
      </div>
      <AccessoryComponent
        hooksForm={hooksForm}
        setImage64={setImage64}
        image64={image64}
      />
    </div>
  );
};

export default AccessoryEdit;
