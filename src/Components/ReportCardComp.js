import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const ReportCardComp = ({ children, item }) => {
  return (
    <Paper elevation={2} sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {children}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="gray">
            Amount (EA)
          </Typography>
          <Typography variant="body1">{item.amount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="gray">
            Value (USD)
          </Typography>
          <Typography variant="body1">$ {item.value.usd.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="gray">
            Value (THB)
          </Typography>
          <Typography variant="body1">฿ {item.value.thb.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReportCardComp;
