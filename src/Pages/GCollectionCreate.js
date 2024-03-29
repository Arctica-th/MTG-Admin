import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import GCollectionEl from "../Components/GCollectionEl";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { addGameCollection } from "../Services/Crud";
import { useNavigate } from "react-router-dom";
import { readFileDataTo64 } from "../Services/Func";

const GCollectionCreate = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const onHandleCreate = async () => {
    const { name, description, imageURL } = getValues();

    const data = {
      name,
      description,
      imageURL: await readFileDataTo64(imageURL[0]),
    };

    addGameCollection(data)
      .then((res) => {
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        navigate("/gamecollection");
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div>
          <BsChevronLeft /> Create
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleCreate}>
            create
          </button>
        </div>
      </div>
      <GCollectionEl register={register} errors={errors} />
    </div>
  );
};

export default GCollectionCreate;
