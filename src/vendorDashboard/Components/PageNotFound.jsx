import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <marquee><h2>Page Not Found.Please Enter correct URL</h2></marquee>
        <Link to="/" >
            <button>Go Home</button>
        </Link>
    </div>
  )
}

export default PageNotFound