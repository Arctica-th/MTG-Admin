import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { storeApi } from "../fakeApi/storeApi";
import { useHistory } from "react-router-dom";
import { mtgApi } from "../api/mtgAdmin";
import styled from "styled-components";
import {
  postAdminConfirmStock,
  postAinsufficientStock,
} from "../Services/Crud";
import { useSelector } from "react-redux";
import ModalTrackingNo from "../Components/ModalTrackingNo";
import { useToasts } from "react-toast-notifications";

const OrderDetail = () => {
  const { addToast } = useToasts();
  let { orderNo } = useParams();
  const history = useHistory();
  const profile = useSelector((state) => state.profileReducer.profile);
  const [results, setResults] = useState([]);
  const [allConfirm, setAllConfirm] = useState(false);
  const [modalTrackingOpen, setModalTrackingOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

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
    margin: auto;
    width: 60px;
    height: 30px;

    background: ${(props) => props.bColor};
    border-radius: 4px;

    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    letter-spacing: 0.15px;

    color: ${(props) => props.color};
  `;

  const generateStatus = (item) => {
    if (item.isDeliver) {
      return "Shipped";
    } else if (item.isDelete) {
      return "Cancelled";
    } else if (item.isConfirm) {
      return "Confirmed";
    } else {
      return "Pendding";
    }
  };

  const generateBadgeColor = (item) => {
    if (item.isDelete) {
      return {
        backgroundColor:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF3938",
        color: "#BF2E3C",
      };
    } else if (item.isDeliver || item.isConfirm) {
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

  const onBackClick = () => {
    history.push("/");
  };

  const getOrderDetail = async () => {
    await mtgApi
      .get(`/order/AlistOrderDetail/${orderNo}/${profile.id}`)
      .then((res) => {
        const { data } = res.data;
        setResults(data);

        const allTrue = data.every((el) => el.isConfirm);

        setAllConfirm(allTrue);
      });
  };

  const onHandleConfirm = (item) => {
    postAdminConfirmStock(item._id, profile.id)
      .then((res) => {
        addToast(res.messsage ?? "success", {
          appearance: "success",
          autoDismiss: true,
        });

        getOrderDetail();
      })
      .catch((err) => {
        addToast(err.messsage ?? "something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const onHandleTrackingClick = (item) => {
    setModalTrackingOpen(true);
    setItemSelected(item);
  };

  const onHandleInsufficient = (item) => {
    postAinsufficientStock(item._id, profile.id)
      .then((res) => {
        addToast(res.messsage ?? "success", {
          appearance: "success",
          autoDismiss: true,
        });

        getOrderDetail();
      })
      .catch((err) => {
        addToast(err.messsage ?? "something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  useEffect(() => {
    if (orderNo && profile && profile.id) {
      getOrderDetail();
    }
  }, [orderNo, profile]);

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
              <th className="text-center">Product Owner</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex">
                      <div className="p-2">
                        <img
                          src={item?.card?.img}
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
                  <td className="text-center">-</td>
                  <td>
                    {item.isDeliver ? (
                      <div className="text-success text-center"> Shipped</div>
                    ) : !item.isConfirm && !item.isDeliver && item.card ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-success btn-sm mx-1"
                          onClick={() => onHandleConfirm(item)}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm mx-1"
                          onClick={() => onHandleInsufficient(item)}
                        >
                          Insufficient
                        </button>
                      </div>
                    ) : allConfirm && item.card ? (
                      <button
                        className="btn btn--secondary btn-sm mx-1"
                        onClick={() => onHandleTrackingClick(item)}
                      >
                        Tracking No
                      </button>
                    ) : (
                      <Badge
                        bColor={generateBadgeColor(item).backgroundColor}
                        color={generateBadgeColor(item).color}
                      >
                        {generateStatus(item)}
                      </Badge>
                    )}
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
      <div className="h4">
        <FaChevronLeft onClick={onBackClick} type="button" /> Order #{orderNo}
      </div>
      <div className="row">
        <div className="col-3">
          <div>{displayConfirmDetails}</div>
          <div className="my-2">{displayShiiping}</div>
          <div className="my-2">{displayBilling}</div>
        </div>
        <div className="col-9">{displayTable}</div>
      </div>

      <ModalTrackingNo
        isOpen={modalTrackingOpen}
        setIsOpen={setModalTrackingOpen}
        data={itemSelected}
        callBack={getOrderDetail}
      />
    </div>
  );
};

export default OrderDetail;
