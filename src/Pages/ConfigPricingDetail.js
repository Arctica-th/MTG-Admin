import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { defaultValues } from "../Data/configPricingData";
import { BsChevronLeft } from "react-icons/bs";
import { Stack, TextField, Typography } from "@mui/material";

const ConfigPricingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pricingData, setPricingData] = useState();

  useEffect(() => {
    if (id) {
      const res = defaultValues.find((el) => el.id == id);
      setPricingData(res);
    }
  }, [id]);

  const displayBreadCrump = (
    <nav style={{ BsBreadcrumbDivider: '">"' }} aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link
            to="/config-pricing"
            style={{ color: "#ECC742", textDecoration: "none" }}
          >
            Config Pricing
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pricingData?.gameCollection}
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      <div className="container-fluid py-4">
        {displayBreadCrump}
        <div className="h4 my-4 d-flex justify-content-between align-items-center">
          <div onClick={() => navigate("/config-pricing")} role="button">
            <BsChevronLeft /> {pricingData?.gameCollection}
          </div>
          <div>
            <button className="btn btn--secondary">Save</button>
          </div>
        </div>
        <div className="card shadow">
          <div className="card-body p-4">
            <Stack marginY={3} spacing={3}>
              <Typography variant="h6" color="#414749" fontWeight="600">
                Type card (THB)
              </Typography>

              <TextField
                label="Price of NM (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Price of NM_Foil (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Price of Etched (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>

            <Stack marginY={3} spacing={3}>
              <Typography variant="h6" color="#414749" fontWeight="600">
                Type card (Multiply Rate %)
              </Typography>

              <TextField
                label="Price of EX (Multiply Rate % from NM)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Price of EX_Foil (Multiply Rate % from NM_Foil)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>

            <Stack marginY={3} spacing={3}>
              <Typography variant="h6" color="#414749" fontWeight="600">
                Rarity (Minimum Price THB)
              </Typography>

              <TextField
                label="Price of Common (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Price of Uncommon (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Price of Rare (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Price of Mystic (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPricingDetail;
