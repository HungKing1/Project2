import express from "express"
import { ChangeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"
import upload from "../config/multer.js"
import { protectCompany } from "../middlewares/authMiddleware.js"

const router = express.Router()

//Register a company 
router.post("/register", upload.single("image") ,registerCompany)

//Company login 
router.post("/login", loginCompany)

//Get company data
router.get("/company", protectCompany, getCompanyData)

//Post a job
router.post("/post-job",protectCompany , postJob)

//Get applicants Data of company 
router.get("/applicants", protectCompany, getCompanyJobApplicants)

//Get company job list 
router.get("/list-jobs", protectCompany, getCompanyPostedJobs)

//Change applications status
router.post("/change-status", protectCompany, ChangeJobApplicationStatus)

//Change applications visibility 
router.post("/change-visibility", protectCompany, changeVisibility)

export default router