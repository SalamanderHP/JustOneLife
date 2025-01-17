import React from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalState } from "../global/globalSlice";
import { saveIPFSFile } from "./medicalRecordSlice";
import medicalRecordServices from "./medicalRecordServices";
import { authenticateIPFSAPI } from "./medicalRecordAPI";
import { deleteWaitingRoomAPI } from '../waitingRoom/waitingRoomAPI';

const PasswordModal = ({ show, handleClosePasswordModal, dataRegister, waitingItemId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { web3, accounts, currentUser } = useSelector(globalState);

  const hasingPassword = async (payload) => {
    const { passwordPatient, passwordDoctor, patientAddress, doctorAddress } =
      payload;
    const medicalRecordService = new medicalRecordServices({
      passwordPatient,
      passwordDoctor,
    });
    const { hash_1_Patient, hash_2_Patient, hash_1_Doctor, hash_2_Doctor } =
      await medicalRecordService.hashingPassword();

    const resultPatient = await authenticateIPFSAPI({
      hash_2: hash_2_Patient,
      userAddress: patientAddress,
    });

    const resultDoctor = await authenticateIPFSAPI({
      hash_2: hash_2_Doctor,
      userAddress: doctorAddress,
    });

    return {
      resultPatient: resultPatient.data,
      resultDoctor: resultDoctor.data,
      hash_1_Patient,
      hash_1_Doctor,
    };
  };

  const onSubmit = async (data) => {
    const doctorInfo = {
      doctorAddress: currentUser.publicAddress,
      doctorName: currentUser.name,
    };
    const jsonData = JSON.stringify({ ...dataRegister, ...doctorInfo });
    const { resultPatient, resultDoctor, hash_1_Patient, hash_1_Doctor } =
      await hasingPassword({
        passwordPatient: data.passwordPatient,
        passwordDoctor: data.passwordDoctor,
        patientAddress: dataRegister.generalInfo.publicAddress,
        doctorAddress: currentUser.publicAddress,
      });

    if (resultPatient && resultDoctor) {
      dispatch(
        saveIPFSFile({
          web3,
          accounts,
          currentUser,
          file: jsonData,
          patientAddress: dataRegister.generalInfo.publicAddress,
          hash_1_Patient,
          hash_1_Doctor,
        })
      );
      console.log("Authenticated successs");
      await deleteWaitingRoomAPI({id: waitingItemId});
      console.log("waiting item removed");
      handleClosePasswordModal();
    } else {
      console.log("Authenticated failed");
    }
  };

  const onHideModal = () => {
    setValue("password", "");
    handleClosePasswordModal();
  };

  return (
    <Modal
      show={show}
      onHide={onHideModal}
      centered
      dialogClassName="add-doctor-form__dialog"
      contentClassName="add-doctor-form__content row"
    >
      <form
        className="add-doctor-form"
        onSubmit={handleSubmit(onSubmit)}
        id="add-doctor-form"
      >
        <div className="row signature-confirm">
          <div className="col-6">
            <h5
              className="modal-title signature-title"
              id="exampleModalLongTitle"
            >
              Signature of Patient
            </h5>

            <ErrorMessage
              errors={errors}
              name="passwordPatient"
              render={({ message }) => <p>{message}</p>}
            />
            <input
              {...register("passwordPatient", {
                required: "Please confirm you request",
              })}
              className="form-control"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="col-6">
            <ErrorMessage
              errors={errors}
              name="passwordDoctor"
              render={({ message }) => <p>{message}</p>}
            />
            <h5
              className="modal-title signature-title"
              id="exampleModalLongTitle"
            >
              Signature of Doctor
            </h5>
            <input
              {...register("passwordDoctor", {
                required: "Please confirm you request",
              })}
              className="form-control"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>
        <button className="btn btn-primary signature-confirm-button">
          Confirm
        </button>
      </form>
    </Modal>
  );
};
export default PasswordModal;
