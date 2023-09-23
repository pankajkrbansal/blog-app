import { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from './UserContext'

export default function Header() {
  const {setUserDetails, usrDetails} = useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:1050/api/users/profile', {
      method:'GET',
      credentials:'include'
    }).then((res) => {
      res.json().then(user => {
        setUserDetails(user)
      })
    }).catch((err) => {

    })
  }, [])

  async function logout() {
    fetch('http://localhost:1050/api/users/logout', {
      method:'POST',
      credentials:'include'
    }).then((res)=>{
      setUserDetails({});
    })
  }

  // usrDetails = 

    return(
        <header>
        <Link to="/" className="logo">
          BlogApp
        </Link>
        <nav>
          {
            usrDetails.email && (
              <>
                <span> Welcome {usrDetails.name}</span>
                <Link to = "/create">Create Post</Link>
                <a onClick={logout}>Logout</a>
              </>
            )
          }
          {
            !usrDetails.email && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )
          }
        </nav>
      </header>
    )
}
