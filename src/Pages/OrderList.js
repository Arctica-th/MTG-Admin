import React, { useState, useEffect, useRef } from "react";
// import Select from "react-select";

import { mtgApi } from "../api/mtgAdmin";
import {
  convertCurrency,
  convertDateToString,
  generateStatus,
} from "../Services/Func";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import * as orderStatus from "../Services/const";

const OrderList = () => {
  const [results, setResults] = useState([]);
  const [resultsFilter, setResultsFilter] = useState([]);
  const [rowPerPage, setRowPerPagge] = useState(10);
  const [page, setPage] = useState(1);
  const profile = useSelector((state) => state.profileReducer.profile);
  const optionOrderStatus = ["All", ...Object.values(orderStatus)];
  const [statusSelected, setStatusSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const pageStart = rowPerPage * (page - 1);
  const pageEnd = (page - 1) * rowPerPage + rowPerPage;

  // const generateStatus = (item) => {
  //   if (item.isDelivered) {
  //     return "Shipped";
  //   } else if (item.isCanceled) {
  //     return "Cancelled";
  //   } else if (item.isConfirm) {
  //     return "Confirmed";
  //   } else if (item.isPickup) {
  //     return "Pickup";
  //   } else if (item.isPayment) {
  //     return "Pending Order";
  //   } else if (item.isDeleted) {
  //     return "Deleted";
  //   } else {
  //     return "Pending Payment";
  //   }
  // };

  const generateBadgeColor = (item) => {
    if (item.isDeleted || item.isCanceled) {
      return {
        backgroundColor:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF3938",
        color: "#BF2E3C",
      };
    } else if (item.isDelivered || item.isConfirm) {
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
    await mtgApi.get(`/order/getAllOrder`).then((res) => {
      const tempData = [...res.data.data];

      const sortedDate = tempData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const dataOwner = sortedDate.filter((el) => el.isOwner);
      const dataNotOwner = sortedDate.filter((el) => !el.isOwner);

      const newData = [...dataOwner, ...dataNotOwner];

      setResults(newData);
      setResultsFilter(newData);
    });
  };

  useEffect(() => {
    if (profile && profile.id) {
      getOrderList();
    }
  }, [profile]);

  const onHandleSearch = (ev) => {
    ev.preventDefault();

    const filterByText = [...results].filter((res) => {
      return (
        res?.user?.firstName
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        res?.user?.lastName
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        res?.user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        res?.orderNo?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    });

    const filterByStatus = [...filterByText].filter((res) => {
      return statusSelected === "All"
        ? true
        : generateStatus(res).includes(statusSelected);
    });

    console.log({
      results,
      filterByText,
      filterByStatus,
    });

    setResultsFilter(filterByStatus);
  };

  const displayForm = (
    <div>
      <form onSubmit={onHandleSearch}>
        <div className="row">
          <div className="col-5">
            <TextField
              onChange={(ev) => setSearchTerm(ev.target.value)}
              value={searchTerm}
              label="Search for order ID, customer"
              fullWidth
              size="small"
            />
          </div>
          <div className="col-5">
            <FormControl fullWidth>
              <Select
                size="small"
                onChange={(ev) => setStatusSelected(ev.target.value)}
                value={statusSelected}
              >
                {optionOrderStatus.map((status, index) => {
                  return (
                    <MenuItem value={status} key={index}>
                      {status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2">
            <button className="btn btn--secondary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <TableContainer>
        <table className="main-table">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center">ORDER ID</th>
              <th>CUSTOMER NAME</th>
              <th>EMAIL</th>
              <th>PRICING</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th style={{ minWidth: "50px" }}></th>
            </tr>
          </thead>
          <tbody>
            {resultsFilter?.slice(pageStart, pageEnd)?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="">
                    <div className="d-flex align-items-center h-100">
                      {item.isOwner && <Owner>Owner</Owner>}
                      <span className="ps-2">#{item?.orderNo}</span>
                    </div>
                  </td>

                  <td>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={item?.user?.image} />
                      <Typography whiteSpace="nowrap">
                        {item.user?.firstName} {item.user?.lastName}
                      </Typography>
                    </Box>
                  </td>
                  <td>
                    <Typography>{item.user?.email}</Typography>
                  </td>
                  <td>
                    <Typography>{convertCurrency(item.total)}</Typography>
                  </td>
                  <td>
                    <Typography whiteSpace="nowrap">
                      {item.createdAt &&
                        format(new Date(item.createdAt), "dd MMMM yyyy")}{" "}
                    </Typography>
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
        <Box mt={2} display="flex" justifyContent="end">
          <Pagination
            count={Math.ceil(resultsFilter?.length / rowPerPage)}
            variant="outlined"
            color="primary"
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </TableContainer>
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
