import React, { useState, useEffect } from "react";
import { readFileDataTo64 } from "../Services/Func";

const GCollectionEl = () => {
  const [slipImage, setSlipImage] = useState(null);

  const styles = {
    slipImage: {
      height: "336px",
      objectFit: "contain",
    },
  };

  const editionOptions = [
    { label: "Realm of the Gods", value: "1" },
    { label: "Mythic Booster", value: "2" },
    { label: "Rise of the Unison Warrior (2nd Edition)", value: "3" },
  ];

  const onInputImage = async (ev) => {
    const file = await ev.target.files[0];
    const img64 = await readFileDataTo64(file);

    setSlipImage(img64);
  };

  const displayBasicInfo = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Basic information</div>
        <div className="my-2">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="my-2">
          <textarea className="form-control" placeholder="Description" />
        </div>
      </div>
    </div>
  );

  const displayImage = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Image</div>
        <div className="text-center my-3">
          {slipImage && (
            <img src={slipImage} alt="slip" style={styles.slipImage} />
          )}
        </div>
        <div>
          <label className="label-upload">
            + Upload Image
            <input
              className=""
              type="file"
              accept="image/*"
              id="input-file"
              onChange={onInputImage}
            />
          </label>
        </div>
      </div>
    </div>
  );

  const displayVisibility = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Visibility</div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="visibility-radio"
              defaultChecked
            />
            <label className="form-check-label">Published</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="visibility-radio"
            />
            <label className="form-check-label">Hidden</label>
          </div>
        </div>
      </div>
    </div>
  );
  const displayEdition = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Edition</div>
        <div>
          {editionOptions?.map((item) => {
            return (
              <span className="m-1 badge rounded-pill bg-warning">
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
  return (
    <div className="row">
      <div className="col-9">
        <div className="mb-2">{displayBasicInfo}</div>
        <div className="my-2">{displayImage}</div>
      </div>
      <div className="col-3">
        <div className="mb-2">{displayVisibility}</div>
        <div className="my-2">{displayEdition}</div>
      </div>
    </div>
  );
};

export default GCollectionEl;
