import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageJobs = () => {
  const navigate = useNavigate()  
  
  const [jobs, setJobs] = useState([])
  const {backendUrl, companyToken} = useContext(AppContext)

  const fetchCompanyJobs = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/company/list-jobs", 
        {headers: {token: companyToken}}
      )
      if(data.success) {
        setJobs(data.jobsData.reverse()) //getCompanyPostedJob
        console.log(data.jobsData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeJobVisibility = async (id) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/company/change-visibility", 
      {id}, 
      {headers: {token: companyToken}})
      if(data.success) {
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  return (
    <div  className='p-4 border rounded'>
      <div>
        <table style={{width: "70vw"}}>
          <thead>
            <tr className='border'>
              <th className='py-4 px-4 fs-5'>#</th>
              <th className='py-4 px-4 fs-5'>Job Title</th>
              <th className='py-4 px-4 fs-5'>Date</th>
              <th className='py-4 px-4 fs-5'>Location</th>
              <th className='py-4 px-4 fs-5 text-center'>Applicants</th>
              <th className='py-4 px-4 fs-5 text-center'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr className='border'>
                <td className='py-4 px-4'>{index+1}</td>
                <td className='py-4 px-4'>{job.title}</td>
                <td className='py-4 px-4'>{moment(job.date).format('ll')}</td>
                <td className='py-4 px-4'>{job.location}</td>
                <td className='py-4 px-4 text-center'>{job.applicants}</td>
                <td className='py-4 px-4 text-center'>
                  <input onChange={() => changeJobVisibility(job._id)} type="checkbox" style={{scale: "1.5"}} checked={job.visible}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-end my-3 p-4' style={{width: "70vw"}}>
        <button className='btn btn-primary' style={{width: "10vw"}}
        onClick={() => navigate('/dashboard/add-job')}>Add new job</button>
      </div>
    </div>
  )
}

export default ManageJobs