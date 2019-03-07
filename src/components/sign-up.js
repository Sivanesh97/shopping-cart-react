import React from "react"
import Fetch from "../Fetch";

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            person: this.props.location.state.person,
            username: '',
            phone: '',
            company: '',
            password: '',
            confirmPassword: ''
        }

        console.log('props', this.props.location.person)
    }

    decider = () => {
        return this.state.person === 'user' ? 'phone': 'company'
    }

    updateUsername = event => {
        this.setState({username: event.target.value})
    }

    updatePassword = event => {
        this.setState({password: event.target.value})
    }

    updateConfirmPassword= event => {
        this.setState({confirmPassword: event.target.value})
    }

    updateDecider = event => {
        if(this.state.person === 'user') {
            this.setState({phone: event.target.value})
        } else {
            this.setState({company: event.target.value})
        }
    }

    confirmPassword = () => {
        if(this.state.password === this.state.confirmPassword) return true;
        return false;
    }

    validate = async () => {
        if(this.confirmPassword()) {
            if(this.state.person === 'user') {
                let res = await Fetch.addUser(this.state)
                if(res) {
                    this.props.history.push("/sign-in")
                }
            } else {
                let res = await Fetch.addVendor(this.state)
                if(res) {
                    this.props.history.push('/vendor/sign-in')
                } else {
                    console.error('Issue in adding a Vendor')
                }
            }
        } else {
            console.error('Password is Not Same')
            // TODO Create a Notification here
        }
    }
    


    render() {
        let decider = this.decider()
        return (
            <div id="sign-up">
                <h2>{this.state.person} Sign Up</h2>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="first_name">First Name <span>*</span></label>
                        <input type="text" onChange={this.updateUsername} className="form-control" id="first_name" value={this.state.username} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor={decider}>{decider} <span>*</span></label>
                        <input type="text" onChange={this.updateDecider} className="form-control" id={decider} value={this.state[decider]} required />
                    </div>

                    <div className="col-md-12 mb-3">
                        <label htmlFor="password">Password <span>*</span></label>
                        <input type="password" onChange={this.updatePassword} className="form-control" id="password" value={this.state.password} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="confirm-pwd">Confirm password <span>*</span></label>
                        <input type="password" onChange={this.updateConfirmPassword} className="form-control" id="confirm-pwd" value={this.state.confirmPassword} required />
                    </div>
                    <button onClick={this.validate} className="btn essence-btn" id="sign-up-button">Sign Up</button>
                </div>
            </div>
        )
    }
}

export default SignUp