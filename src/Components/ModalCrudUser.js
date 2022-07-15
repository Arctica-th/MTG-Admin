import React from "react";
import Modal from "react-modal";
import Select from "react-select";

const ModalCrudUser = ({ isOpen, setIsOpen, modalType }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minHeight: "400px",
      minWidth: "400px",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="h6">{modalType}</div>
      <form>
        <div className="my-2">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="my-2">
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="my-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="my-2">
          <Select placeholder="Role" options={[]} />
        </div>

        <div className="my-2">
          <div>Status</div>
          <div className="d-flex justify-content-around align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusUser"
                id="statusUser1"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="statusUser1">
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="statusUser"
                id="statusUser2"
              />
              <label className="form-check-label" htmlFor="statusUser2">
                InActive
              </label>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button
            className="btn btn--outline-secondary me-3"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="btn btn--secondary ">Create</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCrudUser;
