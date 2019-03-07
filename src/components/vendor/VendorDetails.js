import React, { Component } from "react"
import Common from '../../Common'
import Fetch from '../../Fetch'

class VendorDetails extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            isUpdated: false,
            username: '',
            company: ''
        }

    }

    async componentDidMount() {
        let vendorDetails = await Fetch.getVendorDetails()
        this.setState({
            username: vendorDetails.username,
            company: vendorDetails.company
        })
    }

    updateCompany(event) {
        this.setState({company: event.target.value,
            isUpdated: true
        })
    }

    updateUsername(event) {
        this.setState({username: event.target.value,
            isUpdated: true
        })
    }

    updateVendorDetails() {
        Fetch.updateVendorDetails(this.state)
    }

    logOut() {
        Common.vendor.username = ''
        Common.vendor.id = 0
        this.props.history.push('/')
    }



    render() {
        return (
            <div id="vendor-details">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5>Welcome {this.state.username}</h5>

                    </div>
                    <div className="col-md-6 mb-3">
                        <div className={`btn essence-btn`} 
                                    id="log-out" onClick={this.logOut.bind(this)}>
                                    Log out
                                </div>
                    </div>

                </div>


                    <p>Change any field to update your Details.</p>

                    <form>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="first_name">User Name <span>*</span></label>
                                <input type="text" className="form-control" id="first_name" value={this.state.username} required
                                    onChange={this.updateUsername.bind(this)} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="company">Company <span>*</span></label>
                                <input type="text" className="form-control" id="company" required
                                    value={this.state.company} onChange={this.updateCompany.bind(this)} />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="rating">Rating <span>*</span></label>
                                <input type="text" className="form-control" id="rating" required
                                    value={this.state.rating} disabled />
                            </div>

                            <button className={`btn essence-btn ${this.state.isUpdated ? '': 'hidden'}`} 
                                id="sign-in-button" onClick={this.updateVendorDetails.bind(this)}>
                                Update Details
                            </button>
                        </div>

                    </form>
                </div>
            

        )

    }
}

export default VendorDetails