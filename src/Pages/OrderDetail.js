import { Box, Dialog, DialogContent, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ModalTrackingNo from "../Components/ModalTrackingNo";
import {
  postAdminConfirmStock,
  postAinsufficientStock,
} from "../Services/Crud";
import { convertCurrency, convertDateToString } from "../Services/Func";
import { mtgApi } from "../api/mtgAdmin";

const ROLE_SUPERADMIN = "superadmin";

const OrderDetail = () => {
  const { addToast } = useToasts();
  let { orderNo } = useParams();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profileReducer.profile);
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentSlip, setPaymentSlip] = useState("");
  const [allConfirm, setAllConfirm] = useState(false);
  const [modalTrackingOpen, setModalTrackingOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [openModalImage, setOpenModalImage] = useState(false);

  const styles = {
    transaction: {
      width: "100%",
      maxWidth: "300px",
      cursor: "pointer",
    },
    textDetail: {
      color: "#414749",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18px",
    },
  };

  // const Badge = styled.div`
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 8px;
  //   margin: auto;
  //   width: 60px;
  //   height: 30px;

  //   background: ${(props) => props.bColor};
  //   border-radius: 4px;

  //   font-weight: 400;
  //   font-size: 10px;
  //   line-height: 14px;

  //   letter-spacing: 0.15px;

  //   color: ${(props) => props.color};
  // `;

  // const generateBadgeColor = (item) => {
  //   if (item.isDelete) {
  //     return {
  //       backgroundColor:
  //         "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF3938",
  //       color: "#BF2E3C",
  //     };
  //   } else if (item.isDeliver || item.isConfirm) {
  //     return {
  //       backgroundColor:
  //         "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #57F000",
  //       color: "#2EBF4F",
  //     };
  //   } else {
  //     return {
  //       backgroundColor:
  //         "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FCE83A ",
  //       color: "#BF9105",
  //     };
  //   }
  // };

  const onBackClick = () => {
    navigate("/");
  };

  const onCancelOrder = async (orderNo) => {
    try {
      const response = await mtgApi
        .get(`/order/cancelOrders?orderNo=${orderNo}`)
        .then((res) => {
          addToast(res.data.messsage ?? "success", {
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
    } catch (error) {
      console.warn(error);
    }
  };

  const getOrderDetail = async () => {
    await mtgApi.get(`/order/AlistOrderDetail/${orderNo}`).then((res) => {
      const { data } = res.data;

      setResults(data);
      setPaymentSlip(res.data.paymentSlip);
      setAddress(res.data.address);

      const allTrue = data.every((el) => el.isConfirm);

      setAllConfirm(allTrue);
    });
  };

  const onHandleConfirm = (item, isConfirm) => {
    postAdminConfirmStock(item._id, profile.id, isConfirm)
      .then((res) => {
        addToast(res.data.messsage ?? "success", {
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
        addToast(res.data.message ?? "success", {
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

  const generateStatus = (item) => {
    const isOwner = !!(item?.adminOwner._id === profile?.id);

    if (item.isDeliver) {
      return <div className="text-success text-center"> Shipped</div>;
    } else if (item.isCanceled) {
      return <div className="text-danger text-center"> Cancelled</div>;
    } else if (
      !item.isCanceled &&
      !item.isConfirm &&
      !item.isDeliver &&
      !item.isInsufficient &&
      !item.isDelete &&
      !item.order.isPayment
    ) {
      return <div className="text-warning text-center"> Pending Payment</div>;
    } else if (allConfirm && item.card) {
      return isOwner ? (
        <button
          className="btn btn--secondary btn-sm mx-1"
          onClick={() => onHandleTrackingClick(item)}
        >
          Tracking No
        </button>
      ) : (
        <div className="text-success text-center"> Confirmed</div>
      );
    } else if (!item.isConfirm && !item.isDeliver && item.card) {
      return isOwner ? (
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-success btn-sm mx-1"
            onClick={() => onHandleConfirm(item, true)}
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
      ) : (
        <div className="text-warning text-center"> Pending </div>
      );
    } else if (item.isConfirm) {
      return <div className="text-success text-center"> Confirmed</div>;
    } else {
      return <div className="text-warning text-center"> Pending</div>;
    }
  };

  const displayConfirmDetails = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Payment</div>
        {paymentSlip && (
          <div>
            <img
              src={paymentSlip}
              alt="transaction"
              style={styles.transaction}
              onClick={() => setOpenModalImage(true)}
            />
          </div>
        )}
        <Dialog
          open={openModalImage}
          onClose={() => setOpenModalImage(false)}
          maxWidth="xl"
        >
          <DialogContent>
            <img
              src={paymentSlip}
              alt="transaction"
              style={{
                width: "100%",
              }}
            />
          </DialogContent>
        </Dialog>

        <div>
          <div className="body-2">Date transfer</div>
          <div style={styles.textDetail}>
            {address?.updatedAt &&
              convertDateToString(new Date(address.updatedAt))}
          </div>
        </div>
        <div>
          <div className="body-2">Bank transfer</div>
          <div style={styles.textDetail}>-</div>
        </div>
        <div>
          <div className="body-2">Time transfer</div>
          <div style={styles.textDetail}>
            {address?.updatedAt &&
              convertDateToString(new Date(address.updatedAt), "time")}
          </div>
        </div>
        <div>
          <div className="body-2">Amount transfer</div>
          <div style={styles.textDetail}>
            {convertCurrency(
              results.length &&
                results.reduce((total, item) => total + item.summary, 0)
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const displayShiiping = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Shipping Address</div>
        <div className="body-1 mb-2">{address?.user?.displayName}</div>
        <div className="body-1 mb-2">{address?.phoneNo}</div>
        <div className="body-1 mb-2">{`${address?.etc} ${address?.subDistinct}
         ${address?.distinct} ${address?.province} ${address?.postcode}`}</div>
      </div>
    </div>
  );
  const displayBilling = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Pickup Location</div>
        <div className="body-1 mb-2">{address?.user?.displayName}</div>
        <div className="body-1 mb-2">{address?.phoneNo}</div>
        <div className="body-1 mb-2">
          {`${address?.etc} ${address?.subDistinct}
         ${address?.distinct} ${address?.province} ${address?.postcode}`}
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

              <th>Price</th>
              <th>Quantity</th>
              <th className="text-center">Product Owner</th>
              <th className="text-center">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {results?.map((item, index) => {
              const isOwner = !!(item?.adminOwner?._id === profile?.id);

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
                        <Stack justifyContent="space-between" height={100}>
                          <Box>
                            <div className="text-truncate fw-bold">
                              {item?.card?.name}
                            </div>
                            <div>{item?.card?.optionalDetail?.rarity}</div>{" "}
                          </Box>
                          <div>{item?.condition}</div>
                        </Stack>
                      </span>
                    </div>
                  </td>

                  <td>{item?.price}</td>
                  <td>X {item?.amount}</td>
                  <td className="text-center">
                    {item?.adminOwner?.firstName} {item?.adminOwner?.lastName}
                  </td>
                  <td>{generateStatus(item)} </td>
                  <td>
                    {
                      // profile?.role === ROLE_SUPERADMIN &&
                      isOwner && !item?.isCanceled && !item?.isDeliver && (
                        <button
                          className="btn btn-outline-danger  btn-sm mx-1"
                          onClick={() => onHandleConfirm(item, false)}
                        >
                          Cancel
                        </button>
                      )
                    }
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
      <div className="h4 d-flex justify-content-between">
        <div>
          <FaChevronLeft onClick={onBackClick} type="button" /> Order #
          {!!results.length ? results[0].order.orderNo : "-"}
        </div>
        {profile?.role === ROLE_SUPERADMIN &&
          !!results.length &&
          !!results[0]?.order?.orderNo &&
          results?.some((res) => !res.isCanceled && !res.isDeliver) && (
            <button
              className="btn btn-danger  btn-sm mx-1"
              onClick={() => onCancelOrder(results[0].order.orderNo)}
            >
              Cancel All Order
            </button>
          )}
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div>{displayConfirmDetails}</div>
          <div className="my-2">{displayShiiping}</div>
          <div className="my-2">{displayBilling}</div>
        </div>
        <div className="col-lg-9">{displayTable}</div>
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
