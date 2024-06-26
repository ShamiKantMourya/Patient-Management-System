import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import {
  fetchWards,
  deleteWardData,
  updateWards,
} from "../features/wards/wardSlice";
import {
  fetchPatients,
  deletePatientData,
  updatePatients,
} from "../features/patients/patientSlice";
import PatientForm from "./PatientsForm";
import WardForm from "./WardForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ShowDetails() {
  const { wards } = useSelector((state) => state?.wards);
  const { patients } = useSelector((state) => state?.patients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data =
    type === "wards"
      ? wards?.find((item) => item._id === id)
      : patients?.find((item) => item._id === id);
  // console.log(data);
  useEffect(() => {
    dispatch(fetchWards());
    dispatch(fetchPatients());
  }, []);
  return (
    <div className="detailsCard">
      <h3>{data?.name} Details </h3>
      <h4>{type?.toUpperCase()} </h4>

      <div>
        {type === "wards" ? (
          <>
            <p className="ward">
              Ward Number: <span>{data.wardNumber}</span>
            </p>
            <p className="ward">
              Capacity: <span>{data.capacity}</span>
            </p>
            <p className="ward">
              Specialization: <span>{data.specialization}</span>
            </p>
          </>
        ) : (
          <>
            <p>
              Name: <span>{data.name}</span>
            </p>
            <p>
              Age: <span>{data.age}</span>
            </p>
            <p>
              Gender: <span>{data.gender}</span>
            </p>
            <p>
              Medical History:{" "}
              {data.medicalHistory?.map((item, index) => (
                  <span key={index}>{(index ? ", " : "") + item}</span>
              ))}
            </p>
          </>
        )}
      </div>
      <button onClick={handleOpen}>Edit Data</button>
      <button
        onClick={() => {
          dispatch(
            type === "wards"
              ? deleteWardData(data?._id)
              : deletePatientData(data?._id)
          );
          navigate(-1);
        }}
      >
        Delete forever
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formToUpdate">
            {type === "patients" && (
              <PatientForm
                type="update"
                preData={data}
                onClose={handleClose}
                submitFunction={updatePatients}
              />
            )}
            {type === "wards" && (
              <WardForm
                type="update"
                preData={data}
                onClose={handleClose}
                submitFunction={updateWards}
              />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
