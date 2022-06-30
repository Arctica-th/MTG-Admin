import React, { useState, useEffect } from "react";
import Select from "react-select";

import { mtgApi } from "../api/mtgAdmin";
import { convertDateToString } from "../Services/Func";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OrderList = () => {
  const [results, setResults] = useState([]);

  const Badge = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;

    width: 60px;
    height: 30px;

    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #fce83a;
    border-radius: 4px;

    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    display: flex;
    align-items: center;
    letter-spacing: 0.15px;

    color: #bf9105;
  `;

  const getOrderList = async () => {
    await mtgApi.get(`/order/getAllOrder`).then((res) => {
      setResults(res.data.data);
    });
  };

  useEffect(() => {
    getOrderList();
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
              <tr key={item._id}>
                <td className="text-center">#{item.orderNo}</td>
                <td className="text-start">Nameless</td>
                <td>test@test.com</td>
                <td>{item.summary}</td>
                <td>{convertDateToString(new Date(item.createdAt))}</td>
                <td>
                  <Badge>Pending</Badge>
                </td>
                <td>
                  <Link to={`/orderdetail/${item._id}`}>
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
