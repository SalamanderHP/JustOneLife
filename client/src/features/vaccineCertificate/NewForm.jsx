import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { globalState } from "../global/globalSlice";
import "./styles.scss";
import { createNewVaccineCertificate } from "./vaccineSlice";

function NewForm() {
  const dispatch = useDispatch();
  const { web3, accounts, currentUser } = useSelector(globalState);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(
      createNewVaccineCertificate({ web3, accounts, currentUser, data })
    );
    alert("Create successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-4">
          <div className="field-input">
            <label htmlFor="">Patient public address</label>
            <input
              {...register("vaccine.patientPublicAddress", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
          <div className="field-input">
            <label htmlFor="">Location</label>
            <input
              {...register("vaccine.location", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="field-input">
            <label htmlFor="">Vaccine</label>
            <input
              {...register("vaccine.name", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
          <div className="field-input">
            <label htmlFor="">Date</label>
            <input
              type="date"
              {...register("vaccine.date", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="field-input">
            <label htmlFor="">Lot number</label>
            <input
              {...register("vaccine.lotNumber")}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="button-submit__wrapper">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default NewForm;
