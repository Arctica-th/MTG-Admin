import React, { useState } from "react";

import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { addStock, reduceStock } from "../Services/cardCrud";
import { useSelector } from "react-redux";

const AdjustComponent = ({ item, callBackFn, callBackCancelFn }) => {
  const hookForm = useForm();
  const { watch } = hookForm;
  const [condition, setCondition] = useState(1);
  const profile = useSelector((state) => state.profileReducer.profile);

  console.log({ item });

  const onHandleClose = () => {
    callBackCancelFn();
  };

  const onHandleSubmit = () => {
    const { nm, ex, foil_nm, foil_ex } = watch();

    const data = {
      // updateBy: profile.id ?? "630bc2cb6afb5421954dbf46",
      cardSerial: item.cardSerial,
      priceType: "normal",
      data: [
        {
          condition: "NM",
          amount: +nm,
        },
        {
          condition: "EX",
          amount: +ex,
        },
        {
          condition: "FOIL_EX",
          amount: +foil_nm,
        },
        {
          condition: "FOIL_EX",
          amount: +foil_ex,
        },
      ],
    };

    if (condition === 1) {
      addStock(data)
        .then((res) => {
          console.log(res);
          callBackFn();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      reduceStock(data)
        .then((res) => {
          console.log(res);
          callBackFn();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const displaySwitch = (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          <input
            type="radio"
            className="btn-check "
            name="options-outlined"
            id="success-outlined"
            autoComplete="off"
            value={1}
            onChange={(ev) => setCondition(ev.target.value)}
            defaultChecked
          />
          <label
            className="btn btn-outline-success w-100"
            htmlFor="success-outlined"
          >
            Increase
          </label>
        </Grid>
        <Grid item xs={6}>
          <input
            type="radio"
            value={2}
            onChange={(ev) => setCondition(ev.target.value)}
            className="btn-check"
            name="options-outlined"
            id="danger-outlined"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-danger w-100"
            htmlFor="danger-outlined"
          >
            Decrease
          </label>
        </Grid>
      </Grid>
    </Box>
  );

  const displayInformation = (
    <Stack>
      <Box>
        <Typography variant="caption">Card name</Typography>
        <Typography variant="body1">{item?.name ?? "-"}</Typography>
      </Box>
      <Box>
        <Typography variant="caption">Game collection</Typography>
        <Typography variant="body1">-</Typography>
      </Box>
      <Box>
        <Typography variant="caption">Edition</Typography>
        <Typography variant="body1">
          {item?.gameEdition?.name ?? "-"}{" "}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Price type</Typography>
        <Typography variant="body1"> Normal</Typography>
      </Box>
    </Stack>
  );

  const displayPricingNormal = (
    <Box>
      <InputEl
        label="nm"
        condition={condition}
        remaining={item.stock.nm ?? 0}
        hookForm={hookForm}
      />
      <InputEl
        label="ex"
        condition={condition}
        remaining={item.stock.ex ?? 0}
        hookForm={hookForm}
      />
      <InputEl
        label="foil_nm"
        condition={condition}
        remaining={item.stock.foil_nm ?? 0}
        hookForm={hookForm}
      />
      <InputEl
        label="foil_ex"
        condition={condition}
        remaining={item.stock.foil_ex ?? 0}
        hookForm={hookForm}
      />
    </Box>
  );

  const displayFooter = (
    <Stack direction="row" spacing={2} justifyContent="end">
      <Button variant="outlined" onClick={onHandleClose}>
        Close
      </Button>
      <Button variant="contained" onClick={onHandleSubmit}>
        Update
      </Button>
    </Stack>
  );

  return (
    <Stack width={500}>
      <Box p={4}>
        <Typography variant="h6">Adjust Quantity</Typography>
        {displayInformation}
        {displaySwitch}
        {displayPricingNormal}
      </Box>
      <Box bgcolor="rgba(243, 245, 247, 1)" p={2}>
        {displayFooter}
      </Box>
    </Stack>
  );
};

export default AdjustComponent;

const InputEl = ({ label, condition, remaining = 0, hookForm }) => {
  const { register, setValue } = hookForm;
  const [qtyInput, setQtyInput] = useState(0);
  // const [remaining, setRemaining] = useState(5);
  const [total, setTotal] = useState(0);

  // const newKeyName = ``

  const onHandleInput = (ev) => {
    const { value } = ev.target;
    setQtyInput(value);
    let qty = 0;

    if (condition == 1) {
      qty = +remaining + +value;
    } else {
      qty = +remaining - +value;
    }

    setTotal(qty);
    // setValue(label, qty);
  };

  return (
    <Box my={2}>
      <Typography variant="body1" mb={1}>
        {label.toUpperCase()}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            fullWidth
            size="small"
            // value={qtyInput}
            // onChange={onHandleInput}
            {...register(label, {
              onChange: onHandleInput,
              value: 0,
            })}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Stack spacing={1} mt={2}>
            <Typography
              variant="caption"
              fontWeight="600"
              color="rgba(66, 82, 110, 0.86)"
            >
              Summary
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                fontWeight="400"
                color="rgba(66, 82, 110, 0.86)"
              >
                Latest of stock
              </Typography>
              <Typography
                variant="caption"
                fontWeight="400"
                color="rgba(66, 82, 110, 0.86)"
              >
                {qtyInput}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                fontWeight="400"
                color="rgba(66, 82, 110, 0.86)"
              >
                Remaining Stock
              </Typography>
              <Typography
                variant="caption"
                fontWeight="400"
                color="rgba(66, 82, 110, 0.86)"
              >
                {remaining}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" fontWeight="500" color="#28A745">
                Total Stock
              </Typography>
              <Typography variant="caption" fontWeight="500" color="#28A745">
                {total}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
