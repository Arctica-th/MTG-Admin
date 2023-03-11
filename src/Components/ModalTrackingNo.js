import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { postAdminConfirmDeliver } from "../Services/Crud";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

const ModalTrackingNo = ({ isOpen, setIsOpen, data, callBack }) => {
  const { register, handleSubmit, reset } = useForm();
  const { addToast } = useToasts();
  const profile = useSelector((state) => state.profileReducer.profile);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "0",
      marginRight: "-50%",
      minWidth: "500px",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      boxShadow:
        "0px 3px 4px -2px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(0, 0, 0, 0.31)",
    },
  };
  const styles = {
    footer: {
      background: "#F3F5F7",
      padding: "5px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const onHandleSubmit = (ev) => {
    postAdminConfirmDeliver(data._id, profile.id, ev.trackingNo)
      .then((res) => {
        addToast(res.messsage ?? "success", {
          appearance: "success",
          autoDismiss: true,
        });
        callBack();
        closeModal();
      })
      .catch((err) => {
        addToast(err.messsage ?? "something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <form>
          <div className="p-4">
            <div className="fw-bold">Tracking No.</div>
            <div className="my-2">
              <input
                type="text"
                className="form-control my-3"
                placeholder="Shipping Company"
                {...register("shipping-company")}
              />
              <input
                type="text"
                className="form-control my-3"
                placeholder="Tracking No"
                {...register("trackingNo", { required: true })}
              />
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                className="form-control my-3"
                placeholder="Shipping fee"
                {...register("shipping-fee")}
              />
            </div>
          </div>
          <div className="text-end " style={styles.footer}>
            <div className="btn btn-light border mx-2" onClick={closeModal}>
              Close
            </div>
            <div
              className="btn btn--secondary mx-2"
              onClick={handleSubmit(onHandleSubmit)}
            >
              Confirm
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalTrackingNo;
