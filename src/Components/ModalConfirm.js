import React from "react";
import Modal from "react-modal";

const ModalConfirm = ({ title, detail, callbackFn, isOpen, setIsOpen }) => {
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
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="p-2">
          <div className="text-primary fw-bold">{title}</div>
          <div className="text-primary my-2">{detail}</div>
        </div>
        <div className="text-end " style={styles.footer}>
          <div className="btn btn-light border mx-2" onClick={closeModal}>
            Close
          </div>
          <div className="btn btn-danger mx-2" onClick={callbackFn}>
            Delete
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
