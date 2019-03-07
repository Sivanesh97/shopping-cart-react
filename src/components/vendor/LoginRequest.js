import React from 'react'
import { Link } from 'react-router-dom'


function LoginRequest() {
    return (
        <div id="login-box">
            <h1> Welcome Vendor </h1>
            <h3>Anonymous User <span role="img" aria-label="emoji">😍</span></h3>
            <p><b>Sign in (or) Sign up</b> to access our features.</p>
            <Link to="/vendor/sign-in" className="btn essence-btn">Sign in</Link>  
        </div>
    )
}

export default LoginRequest