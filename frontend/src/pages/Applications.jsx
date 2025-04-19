import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <div>
      <div className='container'>
        <NavBar />
        <h2 className='my-3 p-2'>Your Resume</h2>
        <div className=''>
          {
            isEdit
            ? <>
              <label htmlFor="resumeUpload" className='d-flex gap-2 align-items-center'>
                <p className='btn border px-4 py-2 border rounded bg-primary bg-opacity-25 text-primary my-0'>Select Resume</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='applications/pdf' type="file" hidden
                className='' />
                <img src={assets.profile_upload_icon} alt="" 
                className='btn'/>
                <button onClick={() => setIsEdit(false)}
                  className='btn border rounded bg-success bg-opacity-25'>Save</button>
              </label>
            </>
            : <>
              <a href=""
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
              {jobsApplied.map((job, index) => (
                true ? (
                  <tr>
                    <td className='d-flex align-items-center py-3 px-4 gap-2'>
                      <img src={job.logo} alt="" className='w-8 h-8'/>
                      {job.company}
                    </td>
                    <td className='py-2 px-4 text-start'>{job.title}</td>
                    <td className='py-2 px-4 text-start'>{job.location}</td>
                    <td className='py-2 px-4 text-start'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4 text-start'>{job.status}</td>
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