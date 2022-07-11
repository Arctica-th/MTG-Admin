import React from "react";
import SealComponent from "../Components/SealComponent";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { readFileDataTo64 } from "../Services/Func";
import { addProduct } from "../Services/cardCrud";

const SealCreate = () => {
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

  const onHandleCreate = async () => {
    const { name, images, description, gameCollection, price, stock } =
      getValues();

    const img64 = await readFileDataTo64(images[0]);

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
      img: img64,
    };

    await addProduct(data)
      .then((res) => {
        console.log(res);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        history.push("/seal");
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
        <div onClick={() => history.goBack()} role="button">
          <BsChevronLeft /> Create
        </div>
        <div>
          <button className="btn btn-secondary" onClick={onHandleCreate}>
            create
          </button>
        </div>
      </div>
      <SealComponent hooksForm={hooksForm} />
    </div>
  );
};

export default SealCreate;
