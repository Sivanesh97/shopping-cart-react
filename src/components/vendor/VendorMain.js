import React, { Component } from 'react';
import Header from "./Header"
import NavBar from "./Navbar"
import Product from './Product'
import Fetch from '../../Fetch'
import Common from '../../Common'
import LoginRequest from './LoginRequest'

class VendorMain extends Component {
    constructor() {
        super()

        this.state = {
            isLoggedIn: () => Common.vendor.username !== '',
            products: []
        }

    }

    componentDidMount() {
        this.getProducts()
    }

    async getProducts() {
        let products = await Fetch.getVendorProducts()

        this.setState({products})
    }

    render() {
        console.log("Logs ", this.state)
        if(!this.state.isLoggedIn()) {
            console.warn("Not Logged in. No User details")
            return <LoginRequest />
        }

        return (
                    <div id="vendor-main">
                        <Header category="Welcome "/> 
                        <NavBar history={this.props.history} />
                        <div className="row" >
                            {this.state.products.map(item => <Product obj={item} key={item.id} />)}
                        </div>
                    </div>

        )
    }
}

export default VendorMain