import React from 'react'
import { NavLink } from 'react-router-dom'
import CartArea from './CartArea';
import Common from '../Common'

class NavBar extends React.Component {
    constructor() {
        super()
        this.state = {
            cartCount: 0
        }
    }
    
    componentDidMount() {

        this.cartCount()
        console.log(Common)
    }

    dataSender() {
        this.refs.cart.update()
    }

    async cartCount(n) {
        console.log("n = ", n)
        if(n == null) {
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

    render() {
    return (
    <div id="navbar">
        <CartArea ref="cart" updateCartCount={this.cartCount.bind(this)} />
        
        <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            <nav className="classy-navbar" id="essenceNav">
                <a className="nav-brand" href="index.html">Shopping Mania</a>
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
                            <li><NavLink to="/signin">Sign in</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                    {/* <!-- Nav End --> */}
                </div>
            </nav>

            {/* <!-- Header Meta Data --> */}
            <div className="header-meta d-flex clearfix justify-content-end">
                {/* <!-- Search Area --> */}
                <div className="search-area">
                    <form action="#" method="post">
                        <input type="search" name="search" id="headerSearch" placeholder="Type for search" />
                        <button type="submit"><i className="fa fa-search" aria-hidden="true" ></i></button>
                    </form>
                </div>
                {/* <!-- Favourite Area --> */}
                <div className="favourite-area">
                    <a><img src="img/core-img/heart.svg" alt="" /></a>
                </div>
                {/* <!-- User Login Info --> */}
                <div className="user-login-info">
                    <a><img src="img/core-img/user.svg" alt="" /></a>
                </div>
                {/* <!-- Cart Area --> */}
                <div className="cart-area">
                    <a href="#" id="essenceCartBtn">
                        <img src="img/core-img/bag.svg" alt="" /> 
                        <span>3</span>
                    </a>
                </div>
            </div>

        </div>
    </header>
    </div>
    )
    }
}

export default NavBar