import React from "react";
import { useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import ECollectionComponent from "../Components/ECollectionComponent";

const ECollectionEdit = () => {
  let { ecId } = useParams();

  return (
    <div className="container-fluid py-4">
      <div className="h4">
        <BsChevronLeft /> Edit
      </div>
      <ECollectionComponent />
    </div>
  );
};

export default ECollectionEdit;
