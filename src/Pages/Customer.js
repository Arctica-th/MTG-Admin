import { Pagination, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { mtgApi } from "../api/mtgAdmin";
import { getAllCustomer } from "../Services/Crud";
import * as orderStatus from "../Services/const";

const Customer = () => {
  const [results, setResults] = useState([]);
  const [resultsFilter, setResultsFilter] = useState([]);
  const [rowPerPage, setRowPerPagge] = useState(10);
  const [page, setPage] = useState(1);

  const pageStart = rowPerPage * (page - 1);
  const pageEnd = (page - 1) * rowPerPage + rowPerPage;

  const fetchCustomer = () => {
    getAllCustomer()
      .then((res) => {
        console.log("res", res);
        setResults(res.data);
        setResultsFilter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleSearch = (ev) => {
    const { value } = ev.target;

    const filter = [...results].filter((item) => {
      return (
        item.firstName.toLowerCase().includes(value.toLowerCase()) ||
        item.lastName.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
      );
    });

    setResultsFilter(filter);
    setPage(1);
  };

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const displayForm = (
    <div>
      <div className="row">
        <div className="col">
          <TextField
            label="Search..."
            sx={{ background: "white" }}
            fullWidth
            onChange={onHandleSearch}
          />
        </div>
      </div>
    </div>
  );
  console.log("orderStatus", orderStatus);
  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>NAME</th>
            <th>EMAIL</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {resultsFilter?.slice(pageStart, pageEnd)?.map((item, index) => {
            return (
              <tr>
                <td className="text-center">{index + 1}</td>
                <td>
                  <span>
                    <img
                      src={item?.image}
                      width="25px"
                      className="rounded-circle me-3"
                    />
                    <span>
                      {item?.firstName} {item?.lastName}
                    </span>
                  </span>
                </td>
                <td>{item?.email}</td>

                <td>
                  <Link to={`/customer/${item?._id}`}>
                    <BsChevronRight />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-2 d-flex justify-content-end me-2">
        <Pagination
          count={Math.ceil(resultsFilter?.length / rowPerPage)}
          variant="outlined"
          color="primary"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );

  return (
    <div className="py-4 container">
      <div className="h4">Customer</div>
      <div>{displayForm}</div>
      <div>{displayTable}</div>
    </div>
  );
};

export default Customer;
