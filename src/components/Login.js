import React from "react"
import Common from "../Common"

 export default class Login extends React.Component{

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
         console.log(this.state)

         console.log(JSON.stringify(this.state))

         fetch('http://localhost:5000/Shopping-Cart-API/api/customer/signin/', {
             method: 'post',
             headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(this.state)
         }).then(res => res.json())
             .then(res => {
                 if(res) {
                    Common.username = this.state.username
                    this.props.history.push("/")
                 } else {
                     console.log("Wrong Credentials")
                 }
             });
     }

    render() {
        return (
            <div className="App">
                <div className="checkout_details_area mt-50 clearfix" id="login-box">

                    <div className="cart-page-heading mb-30">
                        <h5>Login</h5>
                    </div>

                    <form action="#" method="post">
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

                            <a className="btn essence-btn" id="sign-in-button" onClick={this.validate.bind(this)}>Login</a>
                        </div>

                    </form>
                </div>
            </div> 
        )
    }
}
