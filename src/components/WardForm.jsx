import { useState } from "react";
import { useDispatch } from "react-redux";

export default function WardForm({ preData, type, submitFunction, onClose }) {
  const dispatch = useDispatch();
  const initialValue = {
    wardNumber: "",
    capacity: "",
    specialization: "",
  };
  const [formData, setFormData] = useState(preData ?? initialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // console.log(formData)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "add") {
      dispatch(submitFunction(formData));
    } else if (type === "update") {
      console.log(preData._id, "id event")
      dispatch(submitFunction({ id: preData._id, formData }));
    }
    setFormData(initialValue);
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Ward Number:
          <input
            type="number"
            name="wardNumber"
            value={formData.wardNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Capacity:
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Specialization:
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
