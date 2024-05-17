import React, { useCallback } from "react";
import { BsChevronLeft } from "react-icons/bs";
import GCollectionEl from "../Components/GCollectionEl";
import { editGameCollection, getGamgeMasterById } from "../Services/Crud";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";
import { IconButton } from "@mui/material";

const GCollectionEdit = () => {
  const { state } = useLocation();
  let { gcId } = useParams();
  console.log("gcId", gcId);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  console.log("state", state);

  const defaultValues = {
    name: "",
    description: "",
    imageURL: "",
  };

  const {
    register,
    getValues,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues });

  const getDataById = useCallback(async () => {
    const response = await getGamgeMasterById(gcId);
    const { data } = response;

    const defVal = {
      name: data.data.name,
      description: data.data.description,
      imageURL: data.data.imageURL,
    };

    reset(defVal);
    console.log("data", data);
  }, [gcId]);

  useEffect(() => {
    getDataById();
  }, [getDataById]);

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
          <IconButton size="large" onClick={() => navigate("/gamecollection")}>
            <BsChevronLeft />
          </IconButton>
          Edit
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleEdit}>
            Submit
          </button>
        </div>
      </div>
      <GCollectionEl register={register} errors={errors} watch={watch} />
    </div>
  );
};

export default GCollectionEdit;
