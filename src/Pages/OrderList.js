import React, { useState, useEffect } from "react";
import Select from "react-select";

import { mtgApi } from "../api/mtgAdmin";
import { convertDateToString } from "../Services/Func";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const OrderList = () => {
  const [results, setResults] = useState([]);
  const profile = useSelector((state) => state.profileReducer.profile);

  const Badge = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;

    width: 100px;
    height: 30px;

    background: ${(props) => props.bColor};
    border-radius: 4px;

    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    letter-spacing: 0.15px;

    color: ${(props) => props.color};
  `;

  const Owner = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 47px;
    height: 30px;
    background: #f4694f;
    border-radius: 4px;
    font-family: "IBM Plex Sans Thai Looped";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 143%;
    letter-spacing: 0.15px;
    color: #ffffff;
    margin-inline: 20px;
  `;

  const generateStatus = (item) => {
    if (item.orderData[0].isDelivered) {
      return "Shipped";
    } else if (item.orderData[0].isCanceled) {
      return "Cancelled";
    } else if (item.orderData[0].isConfirm) {
      return "Confirmed";
    } else if (item.orderData[0].isPickup) {
      return "Pickup";
    } else if (item.orderData[0].isPayment) {
      return "Pending Order";
    } else if (item.orderData[0].isDeleted) {
      return "Deleted";
    } else {
      return "Pending Payment";
    }
  };
  const generateBadgeColor = (item) => {
    if (item.orderData[0].isDeleted || item.orderData[0].isCanceled) {
      return {
        backgroundColor:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF3938",
        color: "#BF2E3C",
      };
    } else if (item.orderData[0].isDelivered || item.orderData[0].isConfirm) {
      return {
        backgroundColor:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #57F000",
        color: "#2EBF4F",
      };
    } else {
      return {
        backgroundColor:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FCE83A ",
        color: "#BF9105",
      };
    }
  };

  const getOrderList = async () => {
    await mtgApi.get(`/order/getAllOrder/${profile.id}`).then((res) => {
      const tempData = [...res.data.data];

      const sortedDate = tempData.sort(
        (a, b) =>
          new Date(b.orderData[0].createdAt).getTime() -
          new Date(a.orderData[0].createdAt).getTime()
      );

      const dataOwner = sortedDate.filter((el) => el.isOwner);
      const dataNotOwner = sortedDate.filter((el) => !el.isOwner);

      const newData = [...dataOwner, ...dataNotOwner];
      console.log({ newData });
      setResults(newData);
    });
  };

  useEffect(() => {
    if (profile && profile.id) {
      getOrderList();
    }
  }, [profile]);

  console.log({ results: results });

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
          <button className="btn btn--secondary ">Search</button>
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
                <td className="">
                  <div className="d-flex align-items-center h-100">
                    {item.isOwner ? <Owner>Owner</Owner> : ""}
                    <span className="ps-2">#{item.orderData[0].orderNo}</span>
                  </div>
                </td>

                <td>test@test.com</td>
                <td>{item.orderData[0].total.toString()}</td>
                <td>
                  {convertDateToString(new Date(item.orderData[0].createdAt))}
                </td>
                <td>
                  <Badge
                    bColor={generateBadgeColor(item).backgroundColor}
                    color={generateBadgeColor(item).color}
                  >
                    {generateStatus(item)}
                  </Badge>
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
