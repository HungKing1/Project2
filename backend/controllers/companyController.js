import Company from "../models/Company.js"
import bcrypt, { hash } from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js"
import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"

//register a new compnay  
export const registerCompany = async(req, res) => {
    const {name, email, password} = req.body
    const imageFile = req.file //

    if(!name || !email || !imageFile || !password) {
        return res.json({success: false, message: "Missing details"})
    }

    try {
        const companyExists = await Company.findOne({email}) 
        if(companyExists) {
            return res.json({success: false, message: "Company already registered"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        
        const company = await Company.create({
            name, 
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//company login 
export const loginCompany = async(req, res) => {
    const {email, password} = req.body

    try {
        const company = await Company.findOne({email})
        if(!company) {
            return res.json({success: false, message: "Invalid email"})
        } else {
            const checkPassword = await bcrypt.compare(password, company.password)
            if(checkPassword) {
                return res.json({
                    success: true,
                    company: {
                        _id: company._id,
                        email: company.email,
                        name: company.name,
                        image: company.image
                    },
                    token: generateToken(company._id)
                })
            } else {
                return res.json({success: false, message: "Invalid password"})
            }
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//get company data
export const getCompanyData = async(req, res) => {
    try {
       const company = req.company
       res.json({success: true, company}) 
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//post a new job
export const postJob = async (req, res) => {
    const {title, location, description, salary, level, category} = req.body

    const companyId = req.company._id//-> dùng save     
    try {
        const newJob = new Job({
            title: title,
            description: description,
            location: location,
            salary: salary,
            companyId: companyId,
            level: level,
            category: category,
            date: Date.now()
        })
        await newJob.save() 
        res.json({success: true, newJob})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
    // res.json({success: true, message: "Succescful "}) //lôix set header 
}

//get company job applicants
export const getCompanyJobApplicants = async(req, res) => {
    try {
        const companyId = req.company._id
        const applicants = await JobApplication.find({companyId})
        .populate("userId", "name image")
        .populate("jobId", "title description location category level salary")
        .exec()

        if(!applicants) {
           return res.json({success: false, message : "No applicant found"}) 
        }
        res.json({success: true, applicants})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//get company posted jobs
export const getCompanyPostedJobs = async(req, res) => {
    try {
        const companyId  = req.company._id
        const jobs = await Job.find({companyId})
        //add no. of applicants info in data
        //??8:37
        const jobsData = await Promise.all((jobs.map(async (job) => {
            const applicants = await JobApplication.find({jobId: job._id})
            return {...job.toObject(), applicants: applicants.length}
        })))

        res.json({success: true, jobsData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//change job application status 
export const ChangeJobApplicationStatus = async(req, res) => {
    try {
        const {id, status} = req.body
        await JobApplication.findOneAndUpdate({_id: id}, {status})

        res.json({success: true, message: "Status changed"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//change job visibility
export const changeVisibility = async(req, res) => {
    try {
        const {id} = req.body
        const companyId = req.company._id
        const job = await Job.findById(id)
        if(companyId.toString() === job.companyId.toString()) {// ? cần thiết 
            job.visible = !job.visible
        }

        await job.save()
        res.json({success: true, job})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


