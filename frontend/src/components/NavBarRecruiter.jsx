import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from "../assets/assets";

const NavBarRecruiter = () => {
    const navigate = useNavigate()
    const {companyData, setCompanyToken, setCompanyData, theme, toggleTheme} = useContext(AppContext)

    const logOut = () => {
        setCompanyData(null)
        setCompanyToken(null)
        localStorage.removeItem("companyToken")
        navigate("/")
    }
    // useEffect(() => {
    // if(companyData) {
    //     navigate("/dashboard/manage-jobs")
    // }
    // }, [companyData])
    
  return (
    <div className="shadow p-4 bg-body app-fade-in">
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
                <button onClick={toggleTheme} className='btn btn-outline-secondary'>
                    <i className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-sun"}`}></i>
                </button>
                <img src={companyData.image} alt="" style={{ Width: '40px', height: '40px', objectFit: "cover"}}/>
                <button onClick={logOut} className="btn border noflexwrap">Log out</button>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default NavBarRecruiter
