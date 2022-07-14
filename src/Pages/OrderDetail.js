import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { storeApi } from "../fakeApi/storeApi";
import { useHistory } from "react-router-dom";
import { mtgApi } from "../api/mtgAdmin";
import styled from "styled-components";

const OrderDetail = () => {
  let { orderNo } = useParams();
  const history = useHistory();

  const [results, setResults] = useState([]);

  const styles = {
    transaction: {
      width: "100%",
    },
    textDetail: {
      color: "#414749",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18px",
    },
  };

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

  const generateStatus = (item) => {
    if (item.isDelivered) {
      return "Shipped";
    } else if (item.isCanceled) {
      return "Cancelled";
    } else {
      return "Pendding";
    }
  };

  const onBackClick = () => {
    history.push("/");
  };

  const getOrderDetail = async () => {
    await mtgApi.get(`/order/AlistOrderDetail/${orderNo}`).then((res) => {
      setResults(res.data.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    if (orderNo) {
      getOrderDetail();
    }
  }, [orderNo]);

  const displayConfirmDetails = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Payment</div>
        <div>
          <img
            src="/assets/images/transaction.png"
            alt="transaction"
            style={styles.transaction}
          />
        </div>
        <div>
          <div className="body-2">Date transfer</div>
          <div style={styles.textDetail}>28 February 2022</div>
        </div>
        <div>
          <div className="body-2">Bank transfer</div>
          <div style={styles.textDetail}>Kasikorn Thai</div>
        </div>
        <div>
          <div className="body-2">Time transfer</div>
          <div style={styles.textDetail}>08:55</div>
        </div>
        <div>
          <div className="body-2">Amount transfer</div>
          <div style={styles.textDetail}>2,401.25</div>
        </div>
      </div>
    </div>
  );

  const displayShiiping = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Shipping Address</div>
        <div className="body-1 mb-2">Cameron Williamson</div>
        <div className="body-1 mb-2">090-000-0000</div>
        <div className="body-1 mb-2">
          304/915 Kahabuathong Soi 5 Phaholyothin Talad Bangkaen Bangkok Bangkok
          10210
        </div>
      </div>
    </div>
  );
  const displayBilling = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Billing Address</div>
        <div className="body-1 mb-2">Cameron Williamson</div>
        <div className="body-1 mb-2">090-000-0000</div>
        <div className="body-1 mb-2">
          304/915 Kahabuathong Soi 5 Phaholyothin Talad Bangkaen Bangkok Bangkok
          10210
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="card">
      <div className="card-body">
        <table className="w-100">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Product Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((item) => {
              return (
                <tr>
                  <td>
                    <div className="d-flex">
                      <div className="p-2">
                        <img
                          src={item?.card.img}
                          alt={item?.card?.name}
                          height="100px"
                        />
                      </div>
                      <span className="ms-2 pt-2" style={{ maxWidth: "200px" }}>
                        <div className="text-truncate">{item?.card?.name}</div>
                        <div>{item?.category}</div>
                        <div>Common</div>
                      </span>
                    </div>
                  </td>
                  <td>SKU {item?.id}</td>
                  <td>x {item?.amount}</td>
                  <td>{item?.price}</td>
                  <td>John Scott</td>
                  <td>
                    <Badge>{generateStatus(item)}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <div className="h4" onClick={onBackClick} type="button">
        <FaChevronLeft /> Order #{orderNo}
      </div>
      <div className="row">
        <div className="col-3">
          <div>{displayConfirmDetails}</div>
          <div className="my-2">{displayShiiping}</div>
          <div className="my-2">{displayBilling}</div>
        </div>
        <div className="col-9">{displayTable}</div>
      </div>
    </div>
  );
};

export default OrderDetail;
