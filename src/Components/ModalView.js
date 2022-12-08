import React from "react";
// import Modal from "react-modal";
import { Modal, Box } from "@mui/material";

const ModalView = ({
  title,
  children,
  onSubmit,
  isOpen,
  setIsOpen,
  styleMore,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    maxHeight: "90vh",
    overflowY: "scroll",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    ...styleMore,
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={closeModal}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalView;
