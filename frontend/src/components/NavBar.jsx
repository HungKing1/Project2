import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const NavBar = () => {
  const {openSignIn} = useClerk()
  const {user} = useUser()

  const {setShowRecruiterLogin, theme, toggleTheme} = useContext(AppContext)
  return (
    <div className='shadow bg-body app-fade-in'>
      <div className='container '>
        <div className='row'>
          <div className='col-auto me-auto py-3'>
            <Link to={'/'}><img src={assets.logo} alt="" /></Link>
          </div>
          {
            user
            ?
            (<div className='col-auto d-flex py-3  gap-3 align-items-center'>
              <Link to={'/applications'} className='m-0 link-underline link-underline-opacity-0 nav-theme-link'>Applied Jobs</Link>
              <p className='m-0 d-none d-sm-inline-block'>| Hi, {user.firstName+ ' ' + user.lastName}</p>
              <button onClick={toggleTheme} className='btn btn-outline-secondary'>
                <i className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-sun"}`}></i>
              </button>
              <UserButton/> 
            </div>)
            :
            (<div className='col-auto py-3 d-flex gap-2'>
              <button onClick={() =>  setShowRecruiterLogin(true)} className='btn btn-primary mx-2'>Recruiter Login</button>
              <button onClick={() => openSignIn()} className='btn btn-primary'>Login</button>
              <button onClick={toggleTheme} className='btn btn-outline-secondary'>
                <i className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-sun"}`}></i>
              </button>
            </div> )           
          }
          {/* <div className='col-auto py-3'>
              <button onClick={signOut} className='btn btn-primary mx-2'>Recruiter Login</button>
              <button onClick={() => openSignIn()} className='btn btn-primary'>Login</button>
            </div>  */}
        </div>
      </div>
    </div>
  )
}
