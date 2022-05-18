import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import AdvSearchComponent from "../Components/AdvSearchComponent";

const AdvSearchCreate = () => {
  return (
    <div className="container-fluid py-4">
      <div className="h4">
        <BsChevronLeft /> Create
      </div>
      <AdvSearchComponent />
    </div>
  );
};

export default AdvSearchCreate;
