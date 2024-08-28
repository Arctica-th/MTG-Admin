import { SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TableComp from "../Components/TableComp";
import {
  getGameCollectionByDate,
  postReportTransaction,
} from "../Services/Crud";
import { convertDateToString } from "../Services/Func";
import { getAllAdmin } from "../Services/login";
import { updateIsLoading } from "../redux/action/dataAction";

const Transaction = () => {
  const { control, watch } = useForm();
  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionAdmin, setOptionAdmin] = useState([]);
  const watchData = watch();
  const isSuperAdmin = profile?.role === "superadmin";

  const getGameMaster = () => {
    getGameCollectionByDate()
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setOptionGameCollection(opt);
      })
      .catch((err) => {});
  };

  const getAdminList = () => {
    getAllAdmin()
      .then((res) => {
        const opt = res.map((item) => {
          return {
            label: `${item.firstName} ${item.lastName}`,
            value: item._id,
          };
        });

        setOptionAdmin(opt);
      })
      .catch((err) => {});
  };

  const getData = () => {
    dispatch(updateIsLoading(true));
    const adminId = watchData.admin ?? "";

    const data = {
      startDate: watchData.startDate.$d,
      endDate: watchData.endDate.$d,
      game: watchData.gameCollection,
      admin: adminId,
    };

    postReportTransaction(data)
      .then((res) => {
        // setReportList(res);

        const list = res.data.map((el) => {
          return {
            date: convertDateToString(new Date(el.date), "date-time"),
            orderNo: el.orderNo,
            cardName: el.cardName,
            finish: el.finish,
            set: el.set,
            condition: el.condition,
            amount: el.amount,
            totalUsd: el.total.usd,
            totalThb: el.total.thb,
            confirmAdmin: el.confirmationAdmin,
          };
        });

        setTableData(list);
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  useEffect(() => {
    getAdminList();
    getGameMaster();
  }, []);

  const displaySearch = (
    <Grid container my={2} spacing={2}>
      <Grid item xs={isSuperAdmin ? 2.5 : 3}>
        <FormControl fullWidth>
          <InputLabel id="gameCollection">Game Collection</InputLabel>
          <Controller
            control={control}
            name="gameCollection"
            defaultValue=""
            render={({ field }) => {
              return (
                <Select {...field} label="Game Collection">
                  {optionGameCollection?.map((game) => {
                    return <MenuItem value={game.value}>{game.label}</MenuItem>;
                  })}
                </Select>
              );
            }}
          />
        </FormControl>
      </Grid>
      {isSuperAdmin && (
        <Grid item xs={isSuperAdmin ? 2.5 : 3}>
          <FormControl fullWidth>
            <InputLabel id="admin">Admin</InputLabel>
            <Controller
              control={control}
              name="admin"
              defaultValue=""
              render={({ field }) => {
                return (
                  <Select {...field} label="Admin">
                    {optionAdmin?.map((game) => {
                      return (
                        <MenuItem value={game.value}>{game.label}</MenuItem>
                      );
                    })}
                  </Select>
                );
              }}
            />
          </FormControl>
        </Grid>
      )}
      <Grid item xs={isSuperAdmin ? 2.5 : 3}>
        <Controller
          control={control}
          name="startDate"
          defaultValue=""
          render={({ field }) => {
            return (
              <DatePicker
                {...field}
                label="Start date"
                renderInput={(params) => <TextField {...params} />}
              />
            );
          }}
        />
      </Grid>
      <Grid item xs={isSuperAdmin ? 2.5 : 3}>
        <Controller
          control={control}
          name="endDate"
          defaultValue=""
          render={({ field }) => {
            return (
              <DatePicker
                {...field}
                label="End date"
                renderInput={(params) => <TextField {...params} />}
              />
            );
          }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SearchOutlined />}
          onClick={getData}
          disabled={
            !!!(
              watchData.startDate ||
              watchData.endDate ||
              watchData.gameCollection
            )
          }
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );

  const tableColumn = [
    {
      accessorKey: "date",
      id: "date",
      cell: (info) => info.getValue(),
      header: "DATE",
    },
    {
      accessorKey: "orderNo",
      id: "orderNo",
      cell: (info) => info.getValue(),
      header: "ORDER'S NO",
    },
    {
      accessorKey: "cardName",
      id: "cardName",
      cell: (info) => info.getValue(),
      header: "CARD'S NAME",
      // sort: true,
    },
    {
      accessorKey: "finish",
      id: "finish",
      cell: (info) => info.getValue(),
      header: "FINISH",
    },
    {
      accessorKey: "set",
      id: "set",
      cell: (info) => info.getValue(),
      header: "SET",
    },
    {
      accessorKey: "condition",
      id: "condition",
      cell: (info) => info.getValue(),
      header: "CONDITION",
    },
    {
      accessorKey: "amount",
      id: "amount",
      cell: (info) => info.getValue(),
      header: "AMOUNT",
    },
    {
      accessorKey: "totalUsd",
      id: "totalUsd",
      cell: (info) => info.getValue(),
      header: "Total (USD)",
    },
    {
      accessorKey: "totalThb",
      id: "totalThb",
      cell: (info) => info.getValue(),
      header: "Total (THB)",
    },
    {
      accessorKey: "confirmAdmin",
      id: "confirmAdmin",
      cell: (info) => info.getValue(),
      header: "CONFIRMATION ADMIN",
    },
  ];

  return (
    <div className="py-4 container">
      <Typography variant="h6">Transcations</Typography>
      {displaySearch}

      <Box
        sx={{
          width: "calc(100vw - 400px)",
        }}
      >
        <TableComp columns={tableColumn} data={tableData} />
      </Box>
    </div>
  );
};

export default Transaction;
