import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import ECollectionComponent from "../Components/ECollectionComponent";
import { addGameEdition } from "../Services/Crud";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { readFileDataTo64 } from "../Services/Func";
import { useHistory } from "react-router-dom";

const ECollectionCreate = ({ optionGameMaster }) => {
  const { addToast } = useToasts();
  const history = useHistory();

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

    addGameEdition(data)
      .then((res) => {
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        history.push("/editioncollection");
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
          <button className="btn btn-secondary" onClick={onHandleCreate}>
            create
          </button>
        </div>
      </div>
      <ECollectionComponent
        register={register}
        errors={errors}
        optionGameMaster={optionGameMaster}
      />
    </div>
  );
};

export default ECollectionCreate;
