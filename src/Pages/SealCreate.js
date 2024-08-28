import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import SealComponent from "../Components/SealComponent";
import { addProduct } from "../Services/cardCrud";

const SealCreate = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [image64, setImage64] = useState([]);
  const hooksForm = useForm();
  const { getValues } = hooksForm;

  const onHandleCreate = async () => {
    const { name, description, gameCollection, price, stock } = getValues();

    const data = {
      gameMaster: gameCollection ? gameCollection : "62893b464048140c7019367b",
      name,
      description,
      type: "Seal",
      optionalDetail: {},
      price: {
        usd: price,
      },
      stock,
      img: image64,
    };

    await addProduct(data)
      .then((res) => {
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        navigate("/seal");
      })
      .catch((err) => {
        addToast(err.message || "Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate.goBack()} role="button">
          <BsChevronLeft /> Create
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleCreate}>
            create
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

export default SealCreate;
