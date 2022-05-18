import React, { useState, useEffect } from "react";
import Select from "react-select";
import { storeApi } from "../fakeApi/storeApi";
import { convertDateToString } from "../Services/Func";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [results, setResults] = useState([]);

  const getProduct = async (limit) => {
    await storeApi.get(`/products?limit=${limit}`).then((res) => {
      setResults(res.data);
    });
  };

  useEffect(() => {
    getProduct(5);
  }, []);

  const displayForm = (
    <div>
      <div className="row">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search for order ID, customer"
          />
        </div>
        <div className="col-5">
          <Select placeholder="Status" />
        </div>
        <div className="col-2">
          <button className="btn btn-secondary">Search</button>
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">ORDER ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PRICING</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th style={{ minWidth: "50px" }}></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item) => {
            return (
              <tr>
                <td className="text-center">#{item.id}</td>
                <td className="text-start">{item.title}</td>
                <td>test@test.com</td>
                <td>{item.price}</td>
                <td>{convertDateToString(new Date())}</td>
                <td>{item.id}</td>
                <td>
                  <Link to={`/orderdetail/${item.id}`}>
                    <FaChevronRight />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-4 container">
      <div className="h4">OrderList</div>
      <div>{displayForm}</div>
      <div>{displayTable}</div>
    </div>
  );
};

export default OrderList;
