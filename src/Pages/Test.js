import axios from "axios";
import React, { useEffect } from "react";
import { getListCardCreated } from "../Services/Crud";

const Test = () => {
  const getData = () => {
    getListCardCreated()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Test</div>;
};

export default Test;
