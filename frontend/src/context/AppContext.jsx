import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        tilte: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])

    //recuiter login 
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false) //tạm là true 

    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])
     
    const value = {
        searchFilter, setSearchFilter, 
        isSearched, setIsSearched, 
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
              {/*children các phần tử nằm trong */}
        </AppContext.Provider>
    )
}

