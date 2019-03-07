import React from "react"
import Common from "../../Common"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

 export default class VendorLogin extends React.Component{

     constructor() {
         super()

         this.state = {
             username: '',
             password: ''
         }
     }

     updateUsername(event) {
         this.setState({
             username: event.target.value
         })
     }

     updatePassword(event) {
         this.setState({
             password: event.target.value
         })
     }

     validate() {
         console.log('works')
         console.log(JSON.stringify(this.state))

         fetch('http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/sign-in/', {
             method: 'post',
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(this.state)
         }).then(res => res.json())
             .then(res => {
                 console.log(res)
                 if(res !== -1) {
                    Common.vendor.username = this.state.username
                    Common.vendor.id = res
                    this.props.history.push("/vendor")
                 } else {
                     toast.error("Incorrect username or password")
                     console.log("Wrong Credentials")
                 }
             });
     }

    render() {
        return (
            <div className="App">
                <Link to={{pathname: '/sign-up', state: {person: 'vendor'}}} className="btn essence-btn" id="sign-up-sender">Sign Up</Link>
                <div className="checkout_details_area mt-50 clearfix" id="login-box">

                    <div className="cart-page-heading mb-30">
                        <h5>Vendor Login</h5>
                    </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="first_name">User Name <span>*</span></label>
                                <input type="text" className="form-control" id="first_name" value={this.state.username} required
                                    onChange={this.updateUsername.bind(this)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="last_name">Password <span>*</span></label>
                                <input type="password" className="form-control" id="last_name" required
                                    value={this.state.password.bin} onChange={this.updatePassword.bind(this)} />
                            </div>

                            <button className="btn essence-btn" id="sign-in-button" onClick={this.validate.bind(this)}>Login</button>
                        </div>
                </div>
            </div> 
        )
    }
}
