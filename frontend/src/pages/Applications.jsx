import React, { useContext, useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const  {backendUrl, userData, userApplications, fetchUserData, fetchUserApplications} = useContext(AppContext)
  //console.log(userApplications, "userapplications")

  const {user} = useUser()
  const {getToken} = useAuth()

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append("resume", resume)
      const token = await getToken()
  
      const {data} = await axios.post(backendUrl + "/api/users/update-resume",
        formData, 
        {headers: {Authorization: `Bearer ${token}`}}
      )
  
      if(data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }
  
      setIsEdit(false)
      setResume(null)
    } catch (error) {
      toast.error(error.message)
    }
  } 
  
  useEffect(() => {
    if(user) {
      fetchUserApplications()
    }
  }, [user])
  return (
    <div>
      <div className='container'>
        <NavBar />
        <h2 className='my-3 p-2'>Your Resume</h2>
        <div className=''>
          {
            isEdit || userData && userData.resume === ""
            ? <>
              <label htmlFor="resumeUpload" className='d-flex gap-2 align-items-center'>
                <p className='btn border px-4 py-2 border rounded bg-primary bg-opacity-25 text-primary my-0'>{resume ? resume.name : "Select Resume"}</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='applications/pdf' type="file" hidden
                className='' />
                <img src={assets.profile_upload_icon} alt="" 
                className='btn'/>
                <button onClick={updateResume}
                  className='btn border rounded bg-success bg-opacity-25'>Save</button>
              </label>
            </>
            : <>
              <a href={userData.resume}
              target='_blank'
              className='text-primary px-4 py-2 border border-primary btn bg-primary bg-opacity-25 rounded link-underline link-underline-opacity-0'>Resume</a>
              <button className='btn border rounded px-4 py-2 ms-2'
              onClick={() => setIsEdit(true)}>Edit</button>
            </>
          }
        </div>
        <div>
          <h2 className='my-3 p-2'>Jobs Applied</h2>
          <table className='bg-white border rounded'>
            <thead>
              <tr>
                <th className='py-3 px-4 border text-start rounded'>Compnay</th>
                <th className='py-3 px-4 border text-start rounded'>Job title</th>
                <th className='py-3 px-4 border text-start rounded'>Location</th>
                <th className='py-3 px-4 border text-start rounded'>Date</th>
                <th className='py-3 px-4 border text-start rounded'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job, index) => (
                true ? (
                  <tr key={index}>  
                    <td className='d-flex align-items-center py-3 px-4 gap-2'>
                      <img src={job.companyId.image} alt="" className='rounded' style={{height: "40px", width: "40px"}}/>
                      {job.companyId.name}
                    </td>
                    <td className='py-2 px-4 text-start'>{job.jobId.title}</td>
                    <td className='py-2 px-4 text-start'>{job.jobId.location}</td>
                    <td className='py-2 px-4 text-start'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4 text-start'>
                      <div className={job.status === "Pending" ? 'bg-info text-white rounded py-2 px-4' : job.status === "Accepted" ? "bg-success text-white rounded py-2 px-4" : "bg-danger text-white rounded py-2 px-4"}>{job.status}</div>
                    </td>
                  </tr>
                ) 
                : ( 
                  <>
                  <h1>hal</h1>
                  </>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Applications