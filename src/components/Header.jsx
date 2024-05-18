import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";

import hospital from "../assets/hospital.png"

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={hospital} alt="hospital" />
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/patients">Patients</NavLink>
        <NavLink to="/wards">Wards</NavLink>
        <NavLink
          to="https://github.com/ShamiKantMourya/Patient-Management-System"
          target="_blank"
        >
          <GitHubIcon />
        </NavLink>
        <NavLink
          to="https://replit.com/@shamiMourya/PatientManagementBackend"
          target="_blank"
        >
          <StorageIcon />
        </NavLink>
      </nav>
    </div>
  );
}
