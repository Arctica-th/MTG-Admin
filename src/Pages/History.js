import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListCardCreated } from "../Services/Crud";
import { updateIsLoading } from "../redux/action/dataAction";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { convertDateToString } from "../Services/Func";

const History = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToast } = useToasts;
  const [historyList, setHistoryList] = useState([]);

  const getData = () => {
    dispatch(updateIsLoading(true));
    getListCardCreated(id)
      .then((res) => {
        setHistoryList(res.data);
      })
      .catch((err) => {
        console.log(err);

        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const displayHeader = (
    <div>
      <nav style={{ BsBreadcrumbDivider: '">"' }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to="/advancesearch"
              style={{ color: "#ECC742", textDecoration: "none" }}
            >
              Advance Search
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            History
          </li>
        </ol>
      </nav>
      <div className="h4 my-4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/advancesearch")} role="button">
          <BsChevronLeft /> History
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">GAME COLLECTION</th>
            <th scope="col">NM</th>
            <th scope="col">EX</th>
            <th scope="col">FOIL_NM</th>
            <th scope="col">FOIL_EX</th>
            <th scope="col">OWNER</th>
            <th scope="col">TIMESTAMP</th>
          </tr>
        </thead>
        <tbody>
          {historyList?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{item?.name}</td>
                <td>
                  <div>{item?.gameEdition?.gameMaster?.name}</div>
                  <small className="text-secondary">
                    {item?.gameEdition?.name}
                  </small>
                </td>
                <td>{item?.stock?.nm}</td>
                <td>{item?.stock?.ex}</td>
                <td>{item?.stock?.foil_nm}</td>
                <td>{item?.stock?.foil_ex}</td>
                <td>{item?.owner?.firstName}</td>
                <td>
                  {item.timestamp &&
                    convertDateToString(new Date(item.timestamp), "date-time")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {displayHeader}
      {displayTable}
    </div>
  );
};

export default History;
