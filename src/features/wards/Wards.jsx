import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import WardForm from "../../components/WardForm";
import { addWards, fetchWards } from "./wardSlice";

export default function Wards() {
  const { wards } = useSelector((state) => state.wards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWards());
  }, [dispatch]);
  return (
    <div className="wardData">
      <h3>Wards View</h3>
      <WardForm type="add" submitFunction={addWards} />
      <ul>
        {wards?.map((item) => (
          <li key={item._id}>
            <NavLink to={`/wards/${item._id}`}>
              Ward Number - {item.wardNumber} <br /> Specialization - (
              {item.specialization})
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
