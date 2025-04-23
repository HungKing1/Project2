import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import moment from 'moment'
import JobCard from '../components/JobCard'
import axios from 'axios'
import { toast } from 'react-toastify'

const ApplyJob = () => {
  const {id} = useParams()
  const [jobData, setJobData] = useState(null)
  const {jobs, backendUrl} = useContext(AppContext)

  const fetchJob = async () => {
    try {
      const {data} = await axios.get(backendUrl + `api/jobs/${id}`)
      if(data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  } 

  useEffect( () => {
    if(jobs.length > 0) fetchJob()
  }, [id, jobs]) //jobs load async

  return jobData ? (
    <div>
      <NavBar />
      <div>
        <div className='container shadow rounded border mt-2' style={{backgroundColor: '#8BC3FF'}}> 
          <div className='row mt-2' style={{height:'auto'}}>
            <div className='col-auto me-auto d-flex flex-wrap gap-4 align-self-center ms-4'>
              <div className='p-4 border rounded'
              style={{backgroundColor: 'white'}}>
                <img src={jobData.companyId.image} alt="" 
                style={{transform: 'scale(1.5)', maxWidth: '40px', height: 'auto'}}/>
              </div>
              <div>
                <h3 className='fs-2'>{jobData.title}</h3>
                <div className='gap-2 d-flex flex-xs-column flex-wrap'>
                  <div>
                    <img src={assets.suitcase_icon} alt="" />
                    <span className='fs-6' style={{marginLeft: '5px'}}>{jobData.companyId.name}</span>
                  </div>
                  <div>
                    <img src={assets.location_icon} alt="" />
                    <span className='fs-6' style={{marginLeft: '5px'}}>{jobData.location}</span>
                  </div>
                  <div>
                    <img src={assets.person_icon} alt="" />
                    <span className='fs-6' style={{marginLeft: '5px'}}>{jobData.level}</span>
                  </div>
                  <div>
                    <img src={assets.money_icon} alt="" />
                    <span className='fs-6' style={{marginLeft: '5px'}}>{jobData.salary}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-auto align-self-center me-5 d-flex flex-column my-4'>
              <button className='btn btn-primary'>Apply now</button>
              <p className='mt-2'>Posted {moment(jobData.data).fromNow()}</p>
            </div>
          </div>
        </div>
        <div className='container shadow mt-5'>
          <div className='row'>
            <div className='col-12 col-lg-8 rich-text mx-auto mt-5'>
              <h2 className=''>Job Description</h2>
              <div dangerouslySetInnerHTML={{__html:jobData.description}} 
              className='rich-text'></div>
              <button className='btn btn-primary'>Apply now</button>
            </div>
            <div className='col-lg-3 rich-text mt-5'>
                <h2>More jobs from {jobData.companyId.name}</h2>
                <div className='my-3 d-flex flex-wrap gap-2'>
                  {jobs.filter(job => job._id !== id && job.companyId._id === jobData.companyId._id)
                  .filter(job => true ).slice(0, 2)
                  .map((job, index) => <JobCard key={index} job={job}/>)}
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Loading />
    </div>
  )
}

export default ApplyJob