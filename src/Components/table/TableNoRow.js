import { CircularProgress } from "@mui/material";
import React from "react";

const TableNoRow = ({ textDisplay = "ไม่พบข้อมูล", loading }) => {
  return (
    <tr>
      <td colSpan="100%" className="text-center">
        {loading ? <CircularProgress size="small" /> : textDisplay}
      </td>
    </tr>
  );
};

export default TableNoRow;
