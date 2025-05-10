import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useAuth, useUser} from "@clerk/clerk-react"

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const {user} = useUser()
    const {getToken} = useAuth()

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
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //fetch jobs data
    const fetchJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/jobs")
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
            const {data} = await axios.get(backendUrl + "/api/company/company", {headers: {token: companyToken}})
            
            if(data.success) {
                setCompanyData(data.company)
                //console.log(data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    //fetch lientuc 
    const fetchUserData = async () => {
        try {
            const token = await getToken() 

            const {data} = await axios.get(backendUrl + "/api/users/user", {
                headers: {Authorization: `Bearer ${token}`}
            })

            if(data.success) {
                //console.log(data.user)
                setUserData(data.user)
            } else {
                toast(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast(error.message)
        }
    }

    //fetch user's applied applications data 
    const fetchUserApplications = async () => {
        try {
            const token = await getToken()
            
            const {data} = await axios.get(backendUrl + "/api/users/applications", 
                {headers: {Authorization: `Bearer ${token}`}}
            )

            if(data.success) {
                setUserApplications(data.application)
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

    useEffect(() => {
        if(user) {
            fetchUserData()
            fetchUserApplications()
        }
    }, [user])
     
    const value = {
        searchFilter, setSearchFilter, 
        isSearched, setIsSearched, 
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        fetchUserData,
        fetchUserApplications,
        userData, setUserData,
        userApplications, setUserApplications
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
              {/*children các phần tử nằm trong */}
        </AppContext.Provider>
    )
}

