import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import ECollectionComponent from "../Components/ECollectionComponent";
import { useForm } from "react-hook-form";
import { editEditionCollection, getEditionById } from "../Services/Crud";
import { useToasts } from "react-toast-notifications";
import { readFileDataTo64 } from "../Services/Func";

const ECollectionEdit = ({ optionGameMaster }) => {
  let { ecId } = useParams();
  const { state } = useLocation();
  const { addToast } = useToasts();

  const navigate = useNavigate();

  // const defaultValues = {
  //   name: state.editionSelected.name,
  //   description: state.editionSelected.description,
  // };

  const {
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onHandleEdit = async () => {
    const { name, description, imageURL } = getValues();

    const imageURL64 = (await imageURL.length)
      ? readFileDataTo64(imageURL[0])
      : "";

    const data = {
      id: ecId,
      name,
      description,
      imageURL64,
    };

    editEditionCollection(data)
      .then((res) => {
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        navigate("/editioncollection");
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const getEditionData = (id) => {
    getEditionById(id)
      .then((res) => {
        console.log(res);

        const list = {
          name: res.data.name,
          description: res.data.gameMaster.description,
        };

        reset(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (ecId) {
      getEditionData(ecId);
    }
  }, [ecId]);

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div
          onClick={() => {
            navigate("/editioncollection");
          }}
          type="button"
        >
          <BsChevronLeft /> Edit
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleEdit}>
            Submit
          </button>
        </div>
      </div>
      <ECollectionComponent register={register} errors={errors} />
    </div>
  );
};

export default ECollectionEdit;
