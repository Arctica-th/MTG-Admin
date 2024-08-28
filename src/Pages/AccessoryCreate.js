import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import AccessoryComponent from "../Components/AccessoryComponent";
import { addProduct } from "../Services/cardCrud";

const AccessoryCreate = () => {
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
      type: "Accessory",
      optionalDetail: {},
      price: {
        usd: price,
      },
      stock,
      img: image64,
    };

    await addProduct(data)
      .then((res) => {
        console.log(res);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        navigate("/accessory");
      })
      .catch((err) => {
        console.log(err);

        addToast(err.message || "Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/accessory")} role="button">
          <BsChevronLeft /> Create
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleCreate}>
            create
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

export default AccessoryCreate;
