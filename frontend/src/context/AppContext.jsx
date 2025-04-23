import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        tilte: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])

    //recuiter login 
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false) //tạm là true 
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    //fetch jobs data
    const fetchJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl + "api/jobs")
            if(data.success) {
               setJobs(data.jobs) 
            } else {
                toast.error(data.message)
            }
        } catch (error) {   
            toast.error(error.message)
        }
    }

    //fetch company data
    const fetchCompanyData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "api/company/company", {headers: {token: companyToken}})
            
            if(data.success) {
                setCompanyData(data.company)
                console.log(data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem("companyToken")
        if(storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])

    useEffect(()=> {
        if(companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])
     
    const value = {
        searchFilter, setSearchFilter, 
        isSearched, setIsSearched, 
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
              {/*children các phần tử nằm trong */}
        </AppContext.Provider>
    )
}

