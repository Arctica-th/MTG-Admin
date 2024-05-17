import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import axios from "axios";
import { getAddressById, getCustomerById } from "../Services/Crud";
import { format } from "date-fns";
import { convertCurrency } from "../Services/Func";

const CustomerDetail = () => {
  const navigate = useNavigate();
  let { customerId } = useParams();
  const [result, setResult] = useState(null);
  const [address, setAddress] = useState(null);

  const fetchCustomer = async () => {
    await getCustomerById(customerId)
      .then((res) => {
        setResult(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    await getAddressById(customerId)
      .then((res) => {
        setAddress(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
    }
    // else {
    //   navigate("/customer");
    // }
  }, [customerId]);

  const displayBasicInfo = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Basic information</div>
        <div className="text-center">
          <div>
            <img
              src={result?.image}
              alt={result?.firstName}
              width="120px"
              className="rounded-circle"
            />
          </div>
          <div className="my-2">
            {result?.firstName} {result?.lastName}
          </div>
          <div className="my-2">{result?.email}</div>
        </div>
        <div>
          <div className="h6 my-3">Address</div>
          <div className="body-1">
            <LabelText label="ที่อยู่" value={address.etc} />
            <LabelText label="ตำบล" value={address.subDistinct} />
            <LabelText label="อำเภอ" value={address.distinct} />
            <LabelText label="จังหวัด" value={address.province} />
            <LabelText label="รหัสไปรษณีย์" value={address.postcode} />
          </div>
        </div>
      </div>
    </div>
  );

  console.log("address", address);
  const displayOrder = (
    <div>
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">ORDER NO</th>
            <th>DATE PURCHASED</th>
            <th>STATUS</th>
            <th>AMOUNT OF ITEMS</th>
            <th>TOTAL PRICE</th>
          </tr>
        </thead>
        <tbody>
          {!!result?.order?.length &&
            result?.order.map((od) => {
              return (
                <tr>
                  <td>{od.orderNo}</td>
                  <td>{format(new Date(od.createdAt), "dd MMMM yyyy")}</td>
                  <td>Pendding</td>
                  <td>{od?.orderDetail?.length ?? 0} Items</td>
                  <td>{convertCurrency(od.total)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div
        className="h4 my-4"
        role="button"
        onClick={() => {
          navigate("/customer");
        }}
      >
        <BsChevronLeft /> Customer Detail
      </div>
      <div className="row my-3">
        <div className="col-3">{displayBasicInfo}</div>
        <div className="col-9">{displayOrder}</div>
      </div>
    </div>
  );
};

export default CustomerDetail;

const LabelText = ({ label, value }) => {
  return (
    <div className="">
      <span className="fw-bold text-nowrap">{label} : </span>
      <span>{value}</span>
    </div>
  );
};
