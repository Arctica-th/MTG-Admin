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

import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TableComp from "../Components/TableComp";
import { updateIsLoading } from "../redux/action/dataAction";
import { getGameCollectionByDate, postReportColor } from "../Services/Crud";
import { convertDateToString } from "../Services/Func";
import { getAllAdmin } from "../Services/login";
import ReportCardComp from "../Components/ReportCardComp";

const Color = () => {
  const { control, watch } = useForm();
  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();
  const [reportList, setReportList] = useState([]);
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
      .catch((err) => {
        console.log(err);
      });
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
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    dispatch(updateIsLoading(true));
    const adminId = watchData.admin ?? "";

    const data = {
      startDate: watchData.startDate.$d,
      endDate: watchData.endDate.$d,
      game: watchData.gameCollection,
    };

    postReportColor(data)
      .then((res) => {
        setReportList(res.data);
        console.log(res);
        // const list = res.data.map((el) => {
        //   return {
        //     date: convertDateToString(new Date(el.date), "date-time"),
        //     orderNo: el.orderNo,
        //     cardName: el.cardName,
        //     finish: el.finish,
        //     set: el.set,
        //     condition: el.condition,
        //     amount: el.amount,
        //     totalUsd: el.total.usd,
        //     totalThb: el.total.thb,
        //     confirmAdmin: el.confirmationAdmin,
        //   };
        // });
      })
      .catch((err) => {
        console.log(err);
      })
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
      <Grid item xs={3}>
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

      <Grid item xs={3}>
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
      <Grid item xs={3}>
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

  console.log({ reportList });

  const displayContent = (
    <Box>
      <Grid container>
        {!!reportList.length &&
          reportList.map((item) => {
            return (
              <Grid xs={4} m={1}>
                <ReportCardComp item={item}>
                  <Typography variant="caption" color="gray">
                    Name
                  </Typography>
                  <Typography variant="body1">{item.name}</Typography>
                </ReportCardComp>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );

  return (
    <div className="py-4 container">
      <Typography variant="h6">Color</Typography>
      {displaySearch}
      {displayContent}
    </div>
  );
};

export default Color;
