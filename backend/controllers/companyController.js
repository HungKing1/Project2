import Company from "../models/Company.js"
import bcrypt, { hash } from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js"
import Job from "../models/Job.js"

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
    res.json({success: true, message: "Succescful "})
}

//get company job applicants
export const getCompanyJobApplicants = async(req, res) => {

}

//get company posted jobs
export const getCompanyPostedJobs = async(req, res) => {

}

//change job application status 
export const ChangeJobApplicationStatus = async(req, res) => {

}

//change job visibility
export const changeVisibility = async(req, res) => {
    
}


