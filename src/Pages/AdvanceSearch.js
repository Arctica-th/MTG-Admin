import { Button, TableContainer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import AdjustComponent from "../Components/AdjustComponent";
import CustomLabel from "../Components/CustomLabel";
import ModalConfirm from "../Components/ModalConfirm";
import ModalView from "../Components/ModalView";
import TableNoRow from "../Components/table/TableNoRow";
import { getAllEditionByGame, getGameCollectionByDate } from "../Services/Crud";
import { deleteCard } from "../Services/cardCrud";
import { mtgApi } from "../api/mtgAdmin";
import { updateIsLoading } from "../redux/action/dataAction";

const AdvanceSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { register, getValues } = useForm();

  const optionsVisibility = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(30);
  // const pageStart = (page - 1) * rowsPerPage;
  // const pageEnd = (page - 1) * rowsPerPage + rowsPerPage;

  const [results, setResults] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [isModalSettingOpen, setIsModalSettingOpen] = useState(false);

  const [itemSelected, setItemSelected] = useState(null);
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);
  const [notFoundText, setNotFoundText] = useState("กรุณาค้นหาข้อมูล");
  const [isMore, setIsMore] = useState(true);

  const [gameSelected, setGameSelected] = useState(null);
  const [editionSelected, setEditionSelected] = useState(null);
  const [visibilitySelected, setVisibilitySelected] = useState(
    optionsVisibility[0]
  );

  const getAllGame = () => {
    dispatch(updateIsLoading(true));
    getGameCollectionByDate()
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setGameSelected(opt[0]);

        setOptionGameCollection(opt);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };
  const getAllEdition = () => {
    dispatch(updateIsLoading(true));
    getAllEditionByGame(gameSelected.value)
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        const allValue = {
          label: "All",
          value: "",
        };

        setEditionSelected(allValue);
        setOptionGameEditions([allValue, ...opt]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  const onEditionSelected = (ev) => {
    setEditionSelected(ev);
    setPage(1);
  };

  const onHandleSearch = async (limit = 30, page = 1) => {
    try {
      dispatch(updateIsLoading(true));
      const { name } = getValues();
      const data = {
        name: name,
        gameEdition: editionSelected?.value,
        inStock: visibilitySelected?.value,
      };
      const res = await mtgApi.post(
        `/card/advSearchEdition/${gameSelected.value}?limit=${limit}&page=${page}`,
        data
      );

      setResults((prevResults) => [...prevResults, ...(res?.data?.data ?? [])]);

      if (!res?.data?.data?.length) {
        setNotFoundText("ไม่พบข้อมูล");
      }

      if (res?.data?.data?.length < limit) {
        setIsMore(false);
      } else {
        setIsMore(true);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(updateIsLoading(false));
    }
  };

  const onHandleSelectGame = () => {
    mtgApi
      .get(`/card/productPage/${gameSelected.value}`)
      .then((res) => {
        setResults(res.data.data.card);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGame();

    // getCardProduct();
  }, []);

  useEffect(() => {
    if (gameSelected) {
      getAllEdition();
    }
  }, [gameSelected]);

  const onDeleteClick = (item) => {
    setIsModalDeleteOpen(true);
    setItemSelected(item);
  };

  const onHandleDelete = () => {
    dispatch(updateIsLoading(true));
    const { cardSerial } = itemSelected;

    deleteCard(cardSerial)
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
        dispatch(updateIsLoading(false));
      });
  };

  // const handleChangePage = (p) => {
  //   setPage(p);

  //   onHandleSearch(rowsPerPage, p);
  // };

  // const onHandleChangeRow = (ev) => {
  //   const row = ev.target.value;
  //   setRowsPerPage(row);

  //   onHandleSearch(row, page);
  // };

  console.log("optionGameEditions", optionGameEditions);

  const onHandleMore = () => {
    const newPage = page + 1;

    onHandleSearch(rowsPerPage, newPage);
    setPage(newPage);
  };

  const onHandleSetting = (item) => {
    setIsModalSettingOpen(true);
    setItemSelected(item);
  };
  const onHandleHistory = (item) => {
    navigate(`/advancesearch/history/${item.cardSerial}`);
  };

  const displayForm = (
    <div className="d-flex align-items-end flex-wrap gap-2 ">
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <CustomLabel>Name</CustomLabel>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          {...register("name")}
        />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "150px",
        }}
      >
        <CustomLabel>Game Collection</CustomLabel>
        <Select
          placeholder="Game Collection"
          options={optionGameCollection}
          // defaultValue={optionGameCollection[0]}
          onChange={(ev) => {
            setGameSelected(ev);
            setPage(1);
          }}
          value={gameSelected}
        />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "150px",
        }}
      >
        <CustomLabel>Edition Collection</CustomLabel>
        <Select
          placeholder="Edition Collection"
          options={optionGameEditions}
          onChange={onEditionSelected}
          value={editionSelected}
        />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <CustomLabel>Visibility</CustomLabel>
        <Select
          placeholder="Visibility"
          options={optionsVisibility}
          value={visibilitySelected}
          onChange={(ev) => {
            setVisibilitySelected(ev);
            setPage(1);
          }}
        />
      </div>

      <div>
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => {
              setResults([]);
              setPage(1);
              setIsMore(true);
              onHandleSearch(rowsPerPage, 1);
            }}
          >
            Search
          </button>
          <Link to={`/advancesearch/create`} className="mx-2">
            <button className="btn btn-outline-primary ">New</button>
          </Link>
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <TableContainer>
        <table className="main-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ width: "200px" }}>
                NAME
              </th>
              <th scope="col" style={{ width: "200px" }}>
                GAME COLLECTION
              </th>
              <th scope="col">PRICE (NM)</th>
              <th scope="col">NM</th>
              <th scope="col">EX</th>
              <th scope="col">FOIL_NM</th>
              <th scope="col">FOIL_EX</th>
              <th scope="col">ADMIN</th>
              <th scope="col">VISIBILITY</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {!!results.length ? (
              results?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <div className="d-flex flex-nowrap align-items-center">
                        <div>
                          <img
                            src={item.img ?? "/assets/images/logo-white.png"}
                            alt={item.name}
                            height="40px"
                            className="me-3"
                          />
                        </div>
                        <div>
                          <span className="limit-line-2 ">{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item?.gameEdition?.name}</td>
                    <td>{(item?.price?.nm ?? 0.0).toFixed(2)}</td>
                    <td>{item?.stock?.nm}</td>
                    <td>{item?.stock?.ex}</td>
                    <td>{item?.stock?.foil_nm}</td>
                    <td>{item?.stock?.foil_ex}</td>
                    <td>
                      {item?.updateBy?.firstName} {item?.updateBy?.lastName}
                    </td>
                    <td>
                      <Badge>Published</Badge>
                    </td>
                    <td className="text-nowrap">
                      <span
                        className="mx-1"
                        type="button"
                        onClick={() => onHandleSetting(item)}
                      >
                        <IoMdSettings />
                      </span>
                      <span
                        className="mx-1"
                        type="button"
                        onClick={() => onHandleHistory(item)}
                      >
                        <HiOutlineDocumentSearch />
                      </span>

                      <span
                        className="mx-1"
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
              })
            ) : (
              <TableNoRow textDisplay={notFoundText} />
            )}
          </tbody>
        </table>
      </TableContainer>
      {!!results.length && isMore && (
        <Button sx={{ marginBlock: "20px" }} onClick={onHandleMore} fullWidth>
          More
        </Button>
      )}
    </div>
  );

  return (
    <div>
      <div className="py-4 container">
        <div className="h4">Advance Search</div>
        <div>{displayForm}</div>
        <div>{displayTable}</div>
        {/* <div>{results.length ? displayTable : notFoundText}</div> */}
      </div>

      <ModalConfirm
        isOpen={isModalDelete}
        setIsOpen={setIsModalDeleteOpen}
        title="Delete"
        detail={`Are you sure you want to delete ?`}
        callbackFn={onHandleDelete}
      />

      <ModalView
        isOpen={isModalSettingOpen}
        setIsOpen={setIsModalSettingOpen}
        title="Adjust Quantity"
        styleMore={{ p: 0 }}
      >
        <AdjustComponent
          item={itemSelected}
          callBackFn={() => {
            setIsModalSettingOpen(false);
            onHandleSearch(rowsPerPage, page);
          }}
          callBackCancelFn={() => setIsModalSettingOpen(false)}
        />
      </ModalView>
    </div>
  );
};

export default AdvanceSearch;

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
