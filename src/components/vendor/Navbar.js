import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Modal from 'react-responsive-modal'
import VendorDetails from './VendorDetails'


class NavBar extends React.Component {

    constructor() {
        super()

        this.state = {
            open: false
        }
    }

    componentDidMount() {
        console.log("Whether history here is undefined or not", this.props.history)
    }

    onCloseModal() {
        this.setState({open: false})
    }

    onOpenModal() {
        this.setState({open: true})
    }


    render() {
    return (
    <div id="navbar">      

        
        <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            <nav className="classy-navbar" id="essenceNav">
                <Link className="nav-brand" to="/vendor">Shopping Mania</Link>
                <div className="classy-navbar-toggler">
                    <span className="navbarToggler"><span></span><span></span><span></span></span>
                </div>
                {/* <!-- Menu --> */}
                <div className="classy-menu">
                    {/* <!-- close btn --> */}
                    <div className="classycloseIcon">
                        <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                    </div>
                    {/* <!-- Nav Start --> */}
                    <div className="classynav">
                        <ul>
                            <li><NavLink to="/vendor">Products</NavLink></li>
                            <li><NavLink to="/docs">Docs</NavLink></li>
                            <li><NavLink to="/vendor/sign-in">Sign in</NavLink></li>
                        </ul>
                    </div>
                    {/* <!-- Nav End --> */}
                </div>
            </nav>

            {/* <!-- Header Meta Data --> */}
            <div className="header-meta d-flex clearfix justify-content-end">
               
                {/* <!-- Favourite Area --> */}
                <div className="favourite-area">
                    <Link to={
                        {
                            pathname: "/product-fields",
                            state: {
                                toCreate: true
                            }
                        }
                    }><img src="img/core-img/cancel.svg" alt="" /></Link>
                </div>
                {/* <!-- User Login Info --> */}
                <div className="user-login-info" onClick={this.onOpenModal.bind(this)}>
                    <span><img src="img/core-img/user.svg" alt="" /></span>
                </div>
                
            </div>

        </div>
    </header>
    <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)}>
        <VendorDetails history={this.props.history} />
    </Modal>
    </div>
    )
    }
}

export default NavBar