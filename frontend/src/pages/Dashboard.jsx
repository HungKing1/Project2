import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  //log out
  const logOut = () => {
    setCompanyData(null)
    setCompanyToken(null)
    localStorage.removeItem("companyToken")
    navigate("/")
  }

  useEffect(() => {
    if(companyData) {
      navigate("/dashboard/manage-jobs")
    }
  }, [companyData])

  return (
    <div>
      {/* Navbar for Recruiter Panel */}
      <div className="shadow p-4">
        <div className="row ">
          <div className="col-auto me-auto">
            <img
              onClick={() => navigate("/")}
              src={assets.logo}
              style={{ cursor: "pointer" }}
            />
          </div>
          {companyData && (
            <div className="col-auto d-flex gap-3 align-items-center">
              <p className="mb-0">Welcome, {companyData.name}</p>
              <div className="d-flex gap-2">
                <img src={companyData.image} alt="" style={{ maxWidth: '40px', height: 'auto' }}/>
                <button onClick={logOut} className="btn border noflexwrap">Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Left side bar with option to add job, manage job, view applications */}
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
    </div>
  );
};

export default Dashboard;
