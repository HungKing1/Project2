import React, { useContext } from 'react'
import { NavBar } from '../components/NavBar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import Footer from '../components/Footer'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import NavBarRecruiter from '../components/NavBarRecruiter'

const Home = () => {
  const {companyToken} = useContext(AppContext)
  return (
    <div>
      {companyToken ?
      <NavBarRecruiter />:
      <NavBar/>}
      <Hero />
      <JobListing />
      <Footer />
      {companyToken && (
        <Link to="/dashboard">
          <Button 
            className="nav-button home-button"
          >
            <i className="bi bi-gear"></i>
            Dashboard
          </Button>
        </Link>
      )}
    </div>
    )
  }

export default Home