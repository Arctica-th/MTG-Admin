import React, { useState, useEffect } from "react";
import Select from "react-select";
import ModalCrudUser from "../Components/ModalCrudUser";
import ModalConfirm from "../Components/ModalConfirm";
import { getAllAdmin, delAdmin, getAdminByUsername } from "../Services/login";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";

const Admin = () => {
  const { register, watch } = useForm();
  const { addToast } = useToasts();
  const [results, setResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const watchSearchName = watch("searchName");

  const onHandleSearchUsername = () => {
    getAdminByUsername(watchSearchName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleSearch = () => {
    const searchRes = results.filter((res) => {
      return (
        res.firstName.toLowerCase().includes(watchSearchName.toLowerCase()) ||
        res.lastName.toLowerCase().includes(watchSearchName.toLowerCase()) ||
        res.email.toLowerCase().includes(watchSearchName.toLowerCase())
      );
    });

    setSearchResults(searchRes);
  };

  const getList = () => {
    getAllAdmin()
      .then((res) => {
        setResults(res);
        setSearchResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleDeleteAdmin = () => {
    if (itemSelected) {
      delAdmin(itemSelected)
        .then((res) => {
          addToast(res.message ?? "success", {
            appearance: "success",
            autoDismiss: true,
          });

          setIsModalDeleteOpen(false);
          getList();
          setItemSelected(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const displayForm = (
    <div>
      <div className="row align-items-center">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...register("searchName")}
          />
        </div>
        <div className="col-5">
          <Select placeholder="Status" isDisabled />
        </div>

        <div className="col-2">
          <div className="d-flex justify-content-around">
            <button
              className="btn btn--secondary me-2"
              onClick={onHandleSearch}
            >
              Search
            </button>
            <button
              className="btn btn--outline-secondary"
              onClick={() => {
                setIsModalOpen(true);
                setModalType("Create");
              }}
            >
              New
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>NAME</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchResults?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>Active</td>
                <td className="text-nowrap">
                  <span
                    className="mx-3"
                    type="button"
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalType("Edit");

                      setItemSelected(item);
                    }}
                  >
                    <img
                      src="/assets/images/icon/edit.png"
                      alt="edit"
                      width="16px"
                    />
                  </span>

                  <span
                    className="mx-3"
                    type="button"
                    onClick={() => {
                      setIsModalDeleteOpen(true);
                      setItemSelected(item);
                    }}
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
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-4 container">
      <div className="h4">Admin</div>
      <div>{displayForm}</div>
      <div>{displayTable}</div>
      <ModalCrudUser
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        modalType={modalType}
        callBack={getList}
        item={itemSelected}
        setItem={setItemSelected}
      />
      <ModalConfirm
        title="Delete"
        detail="Are you sure you want to delete an Admin?"
        callbackFn={onHandleDeleteAdmin}
        isOpen={isModalDeleteOpen}
        setIsOpen={setIsModalDeleteOpen}
      />
    </div>
  );
};

export default Admin;
