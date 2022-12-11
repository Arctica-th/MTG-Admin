import React, { useEffect, useState } from "react";
import SealComponent from "../Components/SealComponent";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { readFileDataTo64 } from "../Services/Func";
import { addProduct } from "../Services/cardCrud";
import AccessoryComponent from "../Components/AccessoryComponent";

const AccessoryEdit = () => {
  const navigate = useNavigate();
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

  const onHandleCreate = async () => {
    const { name, images, description, gameCollection, price, stock } =
      getValues();

    const data = {
      gameMaster: gameCollection ? gameCollection : "62893b464048140c7019367b",
      name,
      description,
      type: "Accessory",
      optionalDetail: {},
      price: {
        usd: price,
      },
      stock,
      img: image64,
    };
  };

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
