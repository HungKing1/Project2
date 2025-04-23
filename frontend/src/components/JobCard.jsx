import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { assets} from '../assets/assets'

const JobCard = ({job}) => {

  const navigate = useNavigate()

  return (
    <div className='col-3 border shadow p-4 rounded' style={{width: '300px'}}>
        <img src={job.companyId.image} alt="" className='my-3' style={{ maxWidth: '40px', height: 'auto' }}/>
        <h4 className='fs-5 mb-3'>{job.title}</h4>
        <div className='d-flex gap-2'>
            <button className='btn btn-outline-success text-nowrap my-4 p-2'>{job.location}</button>
            <button className='btn btn-outline-info text-nowrap my-4 p-2'>{job.level}</button>
        </div>
        <p dangerouslySetInnerHTML={{__html:job.description.slice(0, 150)}}></p>
        <div className='d-flex gap-2'>
            <button className='btn btn-primary text-nowrap my-4 p-2'
            onClick={() => {navigate(`/apply-job/${job._id}`), scrollTo(0,0)}}>Apply now</button>
            <button className='btn border text-nowrap my-4 p-2'>Learn more</button>
        </div>
    </div>
  )
}

export default JobCard