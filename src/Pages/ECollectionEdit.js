import React from "react";
import { useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import ECollectionComponent from "../Components/ECollectionComponent";
import { useForm } from "react-hook-form";
import { editEditionCollection } from "../Services/Crud";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { readFileDataTo64 } from "../Services/Func";

const ECollectionEdit = ({ optionGameMaster }) => {
  let { ecId } = useParams();
  const { state } = useLocation();
  const { addToast } = useToasts();

  const history = useHistory();

  const defaultValues = {
    name: state.editionSelected.name,
    description: state.editionSelected.description,
  };

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

  const onHandleEdit = async () => {
    const { name, description, imageURL } = getValues();

    // const data = {
    //   name,
    //   description,
    // };
    const imageURL64 = await readFileDataTo64(imageURL[0]);

    editEditionCollection(ecId, name, description, imageURL64)
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
          <BsChevronLeft /> Edit
        </div>
        <div>
          <button className="btn btn-secondary" onClick={onHandleEdit}>
            Submit
          </button>
        </div>
      </div>
      <ECollectionComponent
        optionGameMaster={optionGameMaster}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default ECollectionEdit;
