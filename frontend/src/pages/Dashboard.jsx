import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import NavBarRecruiter from "../components/NavBarRecruiter";

const Dashboard = () => {
  // const navigate = useNavigate();
  // const { companyData, setCompanyData, setCompanyToken, companyToken } = useContext(AppContext);

  //log out
  // useEffect(() => {
  //   if(companyData) {
  //     navigate("/dashboard/manage-jobs")
  //   }
  // }, [companyData])

  return (
    <div>
      {/* Navbar for Recruiter Panel */}
      {/* Left side bar with option to add job, manage job, view applications */}
      <NavBarRecruiter/>
      <div>
        <div className="row mt-2">
          <div className="col-2 flex-column gap-3">
            <ul>
              <NavLink
                to={"/dashboard/add-job"}
                className={({ isActive }) =>
                  `d-flex gap-2 align-items-center p-3 link-underline link-underline-opacity-0 rounded ${
                    isActive && "bg-primary bg-opacity-25 "
                  }`
                }
              >
                <img src={assets.add_icon} alt="" />
                <p className="mb-0 text-dark">Add Job</p>
              </NavLink>
              <NavLink
                to={"/dashboard/manage-jobs"}
                className={({ isActive }) =>
                  `d-flex gap-2 align-items-center p-3 link-underline link-underline-opacity-0 rounded ${
                    isActive && "bg-primary bg-opacity-25"
                  }`
                }
              >
                <img src={assets.home_icon} alt="" />
                <p className="mb-0 text-dark">Manage Jobs</p>
              </NavLink>
              <NavLink
                to={"/dashboard/view-applications"}
                className={({ isActive }) =>
                  `d-flex gap-2 align-items-center p-3 link-underline link-underline-opacity-0 rounded ${
                    isActive && "bg-primary bg-opacity-25"
                  }`
                }
              >
                <img src={assets.person_tick_icon} alt="" />
                <p className="mb-0 text-dark">View applications</p>
              </NavLink>
            </ul>
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Link to="/">
        <Button 
          className="nav-button dashboard-button"
        >
          <i className="bi bi-house-door"></i>
          Home
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
