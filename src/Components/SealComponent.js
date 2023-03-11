import React, { useState, useEffect } from "react";
import { readFileDataTo64 } from "../Services/Func";

const SealComponent = ({ hooksForm, image64, setImage64 }) => {
  const { register, errors, reset, setValue } = hooksForm;
  // const [image64, setImage64] = useState([]);

  const styles = {
    image64: {
      height: "200px",
      width: "150px",
      objectFit: "cover",
      marginRight: "5px",
    },
  };

  const onInputImage = async (ev) => {
    const files = Array.from(ev.target.files);

    files.map(async (item) => {
      const img64 = await readFileDataTo64(item);

      setImage64((image64) => [...image64, img64]);
    });
  };

  const displayBasicInfo = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Basic information</div>

        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...register("name")}
          />
        </div>
        <div className="my-2">
          <textarea
            className="form-control"
            placeholder="Product Detail"
            {...register("description")}
          />
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Game Collection"
            {...register("gameCollection")}
          />
        </div>
      </div>
    </div>
  );

  const displayPricing = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Pricing</div>

        <div className="my-2">
          <input
            type="number"
            className="form-control"
            onWheel={(e) => e.target.blur()}
            placeholder="Pricing"
            {...register("price")}
          />
        </div>
      </div>
    </div>
  );
  const displayInventory = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Inventory</div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="SKU"
            {...register("sku")}
          />
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Stock quantity"
            {...register("stock")}
          />
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

  const displayImage = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Image</div>
        <div className=" my-3">
          <div className="d-flex flex-wrap">
            {image64.length
              ? image64.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt="card"
                      style={styles.image64}
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div>
          <label className="label-upload">
            + Upload Image
            <input
              multiple
              className=""
              type="file"
              accept="image/*"
              id="input-file"
              {...register("images", {
                onChange: onInputImage,
              })}
            />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-9">
        <div className="mb-2">{displayBasicInfo}</div>
        <div className="mb-2">{displayPricing}</div>
        <div className="mb-2">{displayInventory}</div>
        <div className="mb-2">{displayImage}</div>
      </div>
      <div className="col-3">
        <div className="mb-2">{displayVisibility}</div>
      </div>
    </div>
  );
};

export default SealComponent;
