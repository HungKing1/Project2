import React, { use, useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";
const ViewApplications = () => {
  const {backendUrl, companyToken} = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  const fetchCompanyJobApplications = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/company/applicants", 
        {headers: {token: companyToken}}
      )

      if(data.success) {
        setApplicants(data.applicants.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  } 

  const handleUpdateStatus = async (id, status) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/company/change-status", 
        {id, status},
        {headers: {token: companyToken}}
      )

      if(data.success) {
        fetchCompanyJobApplications()
        toast.success("Job application status updated")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  return applicants ? applicants.lenght === 0 ?
    (<p className="my-3 fs-5">No applicants available</p>)
    :
    (<div className="p-4 border rounded">
      <table className="" style={{ width: "70vw" }}>
        <thead className="">
          <tr className="border rounded">
            <th className="py-2 px-4 fs-5">#</th>
            <th className="py-2 px-4 fs-5">User name</th>
            <th className="py-2 px-4 fs-5">Job Title</th>
            <th className="py-2 px-4 fs-5">Location</th>
            <th className="py-2 px-4 fs-5">Resume</th>
            <th className="py-2 px-4 fs-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr className="border rounded-pill">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4 d-flex gap-2 align-items-center">
                <img
                  src={applicant.userId.image}
                  alt=""
                  className="rounded-pill p-2"
                  style={{ width: "60px" }}
                />
                <span>{applicant.userId.name}</span>
              </td>
              <td className="py-2 px-4">{applicant.jobId.title}</td>
              <td className="py-2 px-4">{applicant.jobId.location}</td>
              <td className="py-2 px-4">
                <a
                  href={applicant.userId.resume}
                  target="_blank"
                  className="btn rounded border bg-primary bg-opacity-25 py-1"
                >
                  <span style={{ color: "blue" }}>Resume</span>
                  <img
                    src={assets.resume_download_icon}
                    alt=""
                    className="ms-2"
                  />
                </a>
              </td>
              <td className="py-2 px-4">
                {
                  applicant.status === "Pending"
                  ? 
                    <div className="d-flex gap-2">
                      <button onClick={() => handleUpdateStatus(applicant._id, "Accepted")} className="btn border btn-outline-success">Accept</button>
                      <button onClick={() => handleUpdateStatus(applicant._id, "Rejected")} className="btn border btn-outline-danger">Reject</button>
                    </div>
                  :
                    <div>
                      <p className={`mb-0 ${applicant.status === "Accepted" ? "text-success" : "text-danger"}`}>{applicant.status}</p>
                    </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <Loading />
}

export default ViewApplications;
