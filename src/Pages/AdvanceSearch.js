import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdvSearchCreate from "./AdvSearchCreate";
import { storeApi } from "../fakeApi/storeApi";
import AdvSearchEdit from "./AdvSearchEdit";
import {
  advanceSearchGame,
  deleteGameById,
  getAllEditionByGame,
  getGameCollectionByDate,
} from "../Services/Crud";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import ModalConfirm from "../Components/ModalConfirm";
import { mtgApi } from "../api/mtgAdmin";
import styled from "styled-components";
import { deleteCard, removeProduct } from "../Services/cardCrud";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import ModalView from "../Components/ModalView";
import AdjustComponent from "../Components/AdjustComponent";
import { useDispatch } from "react-redux";
import { updateIsLoading } from "../redux/action/dataAction";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select as MuiSelect,
} from "@mui/material";

const AdvanceSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const optionsVisibility = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const pageStart = (page - 1) * rowsPerPage;
  const pageEnd = (page - 1) * rowsPerPage + rowsPerPage;

  const [results, setResults] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [isModalSettingOpen, setIsModalSettingOpen] = useState(false);

  const [itemSelected, setItemSelected] = useState(null);
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);
  const [notFoundText, setNotFoundText] = useState("");
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
        setNotFoundText("NO DATA");
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
    <div className="row row-cols-5">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          {...register("name")}
        />
      </div>
      <div className="col">
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
      <div className="col">
        <Select
          placeholder="Edition Collection"
          options={optionGameEditions}
          // defaultValue={optionGameEditions[0]}
          onChange={onEditionSelected}
          value={editionSelected}
        />
      </div>
      <div className="col">
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

      <div className="col">
        <div className="d-flex justify-content-around">
          <div
            className="btn btn--secondary "
            type="submit"
            onClick={() => {
              setResults([]);
              setPage(1);
              setIsMore(true);
              onHandleSearch(rowsPerPage, 1);
            }}
          >
            Search
          </div>
          <Link to={`/advancesearch/create`} className="mx-2">
            <button className="btn btn--outline-secondary">New</button>
          </Link>
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
          {!!results.length
            ? results?.map((item, index) => {
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
            : !!notFoundText && (
                <tr>
                  <td colSpan={11} align="center">
                    {notFoundText}
                  </td>
                </tr>
              )}
        </tbody>
      </table>

      {!!results.length && isMore && (
        <Button sx={{ marginBlock: "20px" }} onClick={onHandleMore} fullWidth>
          More
        </Button>
      )}

      {/* <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        gap={2}
        mt={2}
        p={2}
        sx={{ backgroundColor: "white" }}
      >
        <Box>
          <FormControl fullWidth>
            <InputLabel id="rowperpage">Row per page</InputLabel>
            <MuiSelect
              labelId="rowperpage"
              id="rowperpage-select"
              value={rowsPerPage}
              label="Row per page"
              onChange={onHandleChangeRow}
              sx={{
                width: "100px",
              }}
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </MuiSelect>
          </FormControl>
        </Box>
        <Box width={300}>
          <Pagination
            size="small"
            count={Math.ceil(500 / rowsPerPage)}
            color="primary"
            variant="outlined"
            onChange={(e, value) => handleChangePage(value)}
            // page={page}
          />
        </Box>
      </Box> */}
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
