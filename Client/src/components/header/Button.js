import React from 'react'
import './Button.css'
import {Link} from 'react-router-dom'
 
function Button() {
    return (
        <Link to='/Signin'>
            <button className='Signbtn'>Sign In
            </button>
        </Link>
    )
}

export default Button
