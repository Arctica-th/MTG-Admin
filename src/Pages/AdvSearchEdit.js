import React from "react";
import { useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import AdvSearchComponent from "../Components/AdvSearchComponent";

const AdvSearchEdit = () => {
  let { advId } = useParams();

  return (
    <div className="container-fluid py-4">
      <div className="h4">
        <BsChevronLeft /> Edit
      </div>
      <AdvSearchComponent />
    </div>
  );
};

export default AdvSearchEdit;
