import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import CartArea from './CartArea';
import Modal from 'react-responsive-modal'
import Common from '../Common'
import Wishlist from "./Wishlist"


class NavBar extends React.Component {
    constructor() {
        super()
        this.state = {
            cartCount: 0,
            open: false,
            username: Common.user.username,
            phone: Common.user.phone,
            isUpdated: false,
            wishlistModal: false
        }
    }
    
    componentDidMount() {
        this.cartCount()
    }

    update() {
        this.refs.cart.update()
    }

    async cartCount(n) {
        console.log("n = ", n)
        if(n === undefined) {
            await this.setState(state => ({
                cartCount: state.cartCount + 1
            }))
        } else {
            await this.setState(state => ({
                cartCount: n
            }))
        }

        document.querySelector('#essenceCartBtn').children[1].textContent = this.state.cartCount
        document.querySelector('#rightSideCart').children[1].textContent = this.state.cartCount
    }

    updateUsername(event) {
        this.setState({username: event.target.value, isUpdated: true})
    }

    updatePhone(event) {
        this.setState({phone: event.target.value, isUpdated: true})
    }

    logout = () => {
        Common.user.username = ''
        Common.user.id = ''
        this.props.history.push('/')
    }

    onOpenModal = () => {
        this.setState({open: true})
    }
    
    onCloseModal = () => {
        this.setState({open: false})
    }

    wishlistOpenModal = () => {
        this.setState({wishlistModal: true})
    }

    wishlistCloseModal = () => {
        this.setState({wishlistModal: false})
    }

    render() {
    return (
    <div id="navbar">
        <CartArea ref="cart" history={this.props.history} updateCartCount={this.cartCount.bind(this)} />
        
        <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            <nav className="classy-navbar" id="essenceNav">
                <Link className="nav-brand" to="/">Shopping Mania</Link>
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
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/sign-in">Sign in</NavLink></li>
                            {/* <li><NavLink to="/contact">Contact</NavLink></li> */}
                            <li><NavLink to="/bills">Bills</NavLink></li>
                            <li><NavLink to="/docs">Docs</NavLink></li>
                        </ul>
                    </div>
                    {/* <!-- Nav End --> */}
                </div>
            </nav>

            {/* <!-- Header Meta Data --> */}
            <div className="header-meta d-flex clearfix justify-content-end">
                
                {/* <!-- Favourite Area --> */}
                <div className="favourite-area" onClick={this.wishlistOpenModal}>
                    <span><img src="img/core-img/heart.svg" alt="" /></span>
                </div>
                {/* <!-- User Login Info --> */}
                <div className="user-login-info" onClick={this.onOpenModal}>
                    <span><img src="img/core-img/user.svg" alt="" /></span>
                </div>
                {/* <!-- Cart Area --> */}
                <div className="cart-area">
                    <span href="#" id="essenceCartBtn">
                        <img src="img/core-img/bag.svg" alt="" /> 
                        <span>3</span>
                    </span>
                </div>
            </div>

        </div>
    </header>
        <Modal open={this.state.open} onClose={this.onCloseModal} >
            <div className="row">
                <h1 className="col-md-6 mb-3">Welcome {this.state.username}</h1>
                <button className="btn essence-btn"
                    onClick={this.logout}
                    >Log out</button>
                <div className="col-md-6 mb-3">
                    <label htmlFor="first_name">User Name <span>*</span></label>
                    <input type="text" className="form-control" id="first_name" value={this.state.username} required
                        onChange={this.updateUsername.bind(this)} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="phone">Password <span>*</span></label>
                    <input type="text" className="form-control" id="phone" required
                        value={this.state.phone} onChange={this.updatePhone.bind(this)} />
                </div>

                <button className={`btn essence-btn ${this.state.isUpdated ? '': ''}`} id="update-user-button" style={{margin: '0 auto', color: 'white'}}>Update</button>
            </div>
        </Modal>

        <Modal open={this.state.wishlistModal} onClose={this.wishlistCloseModal} >
            <Wishlist />
        </Modal>
    </div>
    )
    }
}

export default NavBar