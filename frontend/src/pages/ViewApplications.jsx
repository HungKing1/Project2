import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ViewApplications = () => {
  return (
    <div className="p-4 border rounded">
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
          {viewApplicationsPageData.map((applicant, index) => (
            <tr className="border rounded-pill">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4 d-flex gap-2 align-items-center">
                <img
                  src={applicant.imgSrc}
                  alt=""
                  className=""
                  style={{ width: "60px" }}
                />
                <span>{applicant.name}</span>
              </td>
              <td className="py-2 px-4">{applicant.jobTitle}</td>
              <td className="py-2 px-4">{applicant.location}</td>
              <td className="py-2 px-4">
                <a
                  href=""
                  className="btn rounded-pill border bg-primary bg-opacity-25 py-1"
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
                <div className="d-flex gap-2">
                  <button className="btn border btn-outline-success">Accept</button>
                  <button className="btn border btn-outline-danger">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplications;
