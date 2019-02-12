import React from 'react'
import { Link } from 'react-router-dom'


function LoginRequest() {
    return (
        <div id="login-box">
            <h1> Welcome to my Shopping SPA </h1>
            <h3>Anonymous User 😍</h3>
            <p><b>Sign in (or) Sign up</b> to access our features.</p>
            <Link to="/signin" className="btn essence-btn">Sign in</Link>  
        </div>
    )
}

export default LoginRequest