import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddJob = () => {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("Bangalore")
    const [category, setCategory] = useState("Programming")
    const [level, setLevel] = useState("Beginner Level")
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)
    
    const {backendUrl, companyToken} = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const description = quillRef.current.root.innerHTML
            const {data} = await axios.post(backendUrl + "/api/company/post-job", 
                {title, description, location, salary, category, level}, 
                {headers: {token: companyToken}}
            )

            if(data.success) {
                toast.success(data.message)
                //reset 
                setTitle("")
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        //initiate Quill only one 
        if(!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            })
        }
    }, [])

  return (
    <form onSubmit={onSubmitHandler} className='border rounded p-4'>
        <div className='mt-4'>
            <p>Job Title</p>
            <input type="text" placeholder='Type here'
            onChange={e => setTitle(e.target.value)} value={title} required
            className='form-control outline-none shadow-none border p-2'/>
        </div>
        <div className='mt-4'>
            <p>Job Description</p>
            <div ref={editorRef}>

            </div>
        </div>
        <div className='d-flex gap-5 mt-4'>
            <div>
               <p>Job Category</p>
               <select onChange={e => setCategory(e.target.value)}
                className='form-select shadow-none outline-none border'>
                {JobCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
                </select> 
            </div>
            <div>
               <p>Job Location</p>
               <select onChange={e => setLocation(e.target.value)}
                className='form-select shadow-none outline-none border'>
                {JobLocations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
                </select> 
            </div>
            <div>
               <p>Job Level</p>
               <select onChange={e => setLevel(e.target.value)}
                className='form-select shadow-none outline-none border'>
                    <option value="Beginner level">Beginneer level</option>
                    <option value="Intermidiate level">Intermidiate level</option>
                    <option value="Senior level">Senior level</option>
                </select> 
            </div>
        </div>
        <div className='mt-4'>
            <p>Job salary</p>
            <input type="Number" placeholder='0'
            onChange={e => setSalary(e.target.value)} 
            className='form-control outline-none shadow-none border p-2' style={{width: '20vh'}}/>
        </div>
        <div className='d-flex justify-content-end p-4' style={{width: "70vw"}}>
            <button type='submit' className='btn btn-primary mt-5' style={{width: "7vw"}}>Add</button>
            </div>
    </form>
  )
}

export default AddJob