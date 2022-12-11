import React, { useEffect } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import AdvSearchComponent from "../Components/AdvSearchComponent";
import { getCardDetail } from "../Services/cardCrud";

const AdvSearchEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const hooksForm = useForm();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = hooksForm;

  const getData = (cardId) => {
    getCardDetail(cardId)
      .then((res) => {
        const resData = res.data[0];
        console.log({ resData });
        const data2 = {
          name: resData.name,
          detail: resData.detail,
          cardSerial: resData.cardSerial,
          gameEdition: resData.gameEdition.id,
        };

        reset(data2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleEdit = () => {};

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/advancesearch")} role="button">
          <BsChevronLeft /> Edit
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleEdit}>
            Submit
          </button>
        </div>
      </div>
      <AdvSearchComponent hooksForm={hooksForm} />
    </div>
  );
};

export default AdvSearchEdit;
