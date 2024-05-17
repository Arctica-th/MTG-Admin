import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import ModalConfirm from "../Components/ModalConfirm";
import {
  advanceSearchGame,
  deleteGameById,
  getGameCollectionByDate,
  searchGameCollection,
} from "../Services/Crud";

const GameCollection = () => {
  const { addToast } = useToasts();
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

  const { register, getValues } = useForm();

  const [results, setResults] = useState([]);

  const styles = {
    tableDescription: {
      maxWidth: "400px",
      height: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      lineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
  };

  const getProduct = async () => {
    getGameCollectionByDate()
      .then((res) => {
        console.log(res.data.data);
        setResults(res.data.data);
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const onHandleSearchGame = async () => {
    const { name } = getValues();
    // searchGameCollection(name)
    advanceSearchGame(name)
      .then((res) => {
        setResults(res.data.data);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const onDeleteClick = (item) => {
    setIsModalDeleteOpen(true);
    setItemSelected(item);
  };

  const onHandleDelete = async () => {
    try {
      const { id } = itemSelected;

      const res = await deleteGameById(id);

      console.log("res", res);

      addToast(res?.data?.message || "success", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      console.log("err", err);
      addToast(`${err?.message}` || "error", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsModalDeleteOpen(false);
      getProduct();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const displayForm = (
    <div>
      <div className="row row-cols-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            {...register("name")}
          />
        </div>
        <div className="col">
          <Select placeholder="Status" />
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn--secondary "
              onClick={onHandleSearchGame}
            >
              Search
            </button>

            <Link to={`/gamecollection/create`} className="mx-4">
              <button className="btn btn--outline-secondary">New</button>
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
            <th className="text-center">#</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>EDITION</th>
            <th>VISIBILITY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-start">
                  <div>
                    <img
                      src={item.imageURL || "/assets/images/logo-white.png"}
                      alt={item.name}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.description}</td>
                <td>{/* {item.gameEdition} */}</td>
                <td>Published</td>
                <td>
                  <Link
                    to={{
                      pathname: `/gamecollection/edit/${item.id}`,
                      state: { gameSelected: item },
                    }}
                    className="mx-2"
                  >
                    <span className="mx-3" type="button">
                      <img
                        src="/assets/images/icon/edit.png"
                        alt="edit"
                        width="16px"
                      />
                    </span>
                  </Link>

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
      <div className="py-4 container">
        <div className="h4">Game Collection</div>
        <div>{displayForm}</div>
        <div>{displayTable}</div>
      </div>

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

export default GameCollection;
