import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import GCollectionEl from "../Components/GCollectionEl";
import { editGameCollection } from "../Services/Crud";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

const GCollectionEdit = () => {
  const { state } = useLocation();
  let { gcId } = useParams();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const defaultValues = {
    // name: state.gameSelected.name,
    // description: state.gameSelected.description,
  };

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

  const onHandleEdit = async () => {
    const { name, description, imageURL } = getValues();

    editGameCollection(gcId, name, description)
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
          <BsChevronLeft /> Edit
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleEdit}>
            Submit
          </button>
        </div>
      </div>
      <GCollectionEl register={register} errors={errors} />
    </div>
  );
};

export default GCollectionEdit;
