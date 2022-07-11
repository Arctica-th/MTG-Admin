import React, { useEffect, useState } from "react";
import Select from "react-select";
import { mtgApi } from "../api/mtgAdmin";
import styled from "styled-components";
import ModalConfirm from "../Components/ModalConfirm";
import { removeProduct } from "../Services/cardCrud";
import { useToasts } from "react-toast-notifications";
import SealCreate from "./SealCreate";
import SealEdit from "./SealEdit";
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const Seal = () => {
  const { addToast } = useToasts();
  let { path, url } = useRouteMatch();
  const [results, setResults] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [gameSelected, setGameSelected] = useState(null);

  const optionsVisibility = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const getAllGame = () => {
    mtgApi
      .get(`/game/getAllByDate/1/20`)
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setOptionGameCollection(opt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSealProduct = () => {
    mtgApi.get(`/card/getAllByName/Seal/20/20`).then((res) => {
      setResults(res.data.data);
    });
  };

  const onDeleteClick = (item) => {
    setIsModalDeleteOpen(true);
    setItemSelected(item);
  };

  const onHandleDelete = () => {
    const { id } = itemSelected;

    removeProduct(id)
      .then((res) => {
        addToast(res.message ?? "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast(err.message ?? "error", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        setIsModalDeleteOpen(false);
      });
  };

  useEffect(() => {
    getAllGame();
    getSealProduct();
  }, []);

  const displayForm = (
    <div>
      <div className="row row-cols-4">
        <div className="col">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="col">
          <Select
            placeholder="Game Collection"
            options={optionGameCollection}
            onChange={(ev) => setGameSelected(ev)}
            value={gameSelected}
          />
        </div>

        <div className="col">
          <Select placeholder="Visibility" options={optionsVisibility} />
        </div>
        <div className="col">
          <div className="d-flex justify-content-around">
            <button className="btn btn-secondary">Search</button>
            <Link to={`${url}/create`} className="mx-2">
              <button className="btn btn-outline-secondary">New</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col">NAME</th>
            <th scope="col">GAME COLLECTION</th>
            <th scope="col">PRICE</th>
            <th scope="col">STOCK</th>
            <th scope="col">VISIBILITY</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <img
                    src={item.img ?? "/assets/images/logo-white.png"}
                    alt={item.name}
                    height="40px"
                    className="me-3"
                  />
                  <span>{item.name}</span>
                </td>
                <td>{item?.gameEdition?.name}</td>
                <td>{item.price.usd}</td>
                <td>
                  <Badge>{item.stock} in stock</Badge>
                </td>
                <td>
                  <Badge>Published</Badge>
                </td>
                <td>
                  {/* <span className="mx-3" type="button"> */}
                  <Link className="mx-3" to={`${path}/edit/:sealId`}>
                    <img
                      src="/assets/images/icon/edit.png"
                      alt="edit"
                      width="16px"
                    />
                  </Link>
                  {/* </span> */}

                  <span
                    className="mx-3"
                    type="button"
                    onClick={() => onDeleteClick(item)}
                  >
                    <img
                      src="/assets/images/icon/bin.png"
                      alt="bin"
                      width="16px"
                    />
                  </span>
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
      <Switch>
        <Route exact path={path}>
          <div className="py-4 container">
            <div className="h4">Seal</div>
            <div>{displayForm}</div>
            <div>{displayTable}</div>
          </div>
        </Route>
        <Route path={`${path}/create`}>
          <SealCreate />
        </Route>
        <Route path={`${path}/edit/:sealId`}>
          <SealEdit />
        </Route>
      </Switch>

      <ModalConfirm
        isOpen={isModalDelete}
        setIsOpen={setIsModalDeleteOpen}
        title="Delete"
        detail={`Are you sure you want to delete ?`}
        callbackFn={onHandleDelete}
      />
    </div>
  );
};

export default Seal;

const Badge = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 70px;
  height: 30px;

  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #57f000;
  border-radius: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  letter-spacing: 0.15px;

  color: #2ebf4f;
`;
