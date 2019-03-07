import React from 'react'
import CartProduct from './CartProduct'
import Fetch from '../Fetch';

class CartArea extends React.Component {
    constructor() {
        super()

        this.state = {
            products: [],
            subTotal: 0
        }

        
    }

    async fetchAlreadyPresentCart() {

        let cartProducts = await Fetch.getCartProducts()
        await this.setState({
            products: cartProducts
        })
        this.props.updateCartCount(this.state.products.length)  
    }

    async update() {
        await this.fetchAlreadyPresentCart()
        let subTotal = this.state.products.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        console.log("Sub TOtal = ", subTotal)
        this.setState({subTotal})
    }

    redirect = () => {
        this.props.history.push('/checkout')
    }

    async componentDidMount() {
        
        await this.update()

        

          var cartbtn1 = window.$('#essenceCartBtn');
          var cartOverlay = window.$(".cart-bg-overlay");
          var cartWrapper = window.$(".right-side-cart-area");
          var cartbtn2 = window.$("#rightSideCart");
          var cartOverlayOn = "cart-bg-overlay-on";
          var cartOn = "cart-on";

          cartbtn1.on('click', function () {
              cartOverlay.toggleClass(cartOverlayOn);
              cartWrapper.toggleClass(cartOn);
          });
          cartOverlay.on('click', function () {
              window.$(this).removeClass(cartOverlayOn);
              cartWrapper.removeClass(cartOn);
          });
          cartbtn2.on('click', function () {
              cartOverlay.removeClass(cartOverlayOn);
              cartWrapper.removeClass(cartOn);
          });
    }

    render() {
        return (
            <div id="cartArea">
                <div className="cart-bg-overlay"></div>

                <div className="right-side-cart-area">

                    {/* <!-- Cart Button --> */}
                    <div className="cart-button">
                        <button href="#" id="rightSideCart"><img src="img/core-img/bag.svg" alt="" /> <span>3</span></button>
                    </div>

                    <div className="cart-content d-flex">

                        {/* <!-- Cart List Area --> */}
                        <div className="cart-list">
                            
                            {this.state.products.map(item => {
                                console.log("Creating cartProduct Component", item)
                                 return <CartProduct obj={item} key={item.id} fetchAlreadyPresentCart={this.fetchAlreadyPresentCart.bind(this)} update={this.update.bind(this)} />
                            })}

                            
                        </div>

                        {/* <!-- Cart Summary --> */}
                        <div className="cart-amount-summary">

                            <h2>Summary</h2>
                            <ul className="summary-table">
                                <li><span>subtotal:</span><span id="sub-total">₹{this.state.subTotal}</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>discount:</span> <span>-15%</span></li>
                                <li><span>total:</span> <span>₹{this.state.subTotal * 85 / 100}</span></li>
                            </ul>
                            <div className="checkout-btn mt-100">
                                <button className="btn essence-btn" id="checkout-button" onClick={this.redirect}>Check out</button>
                            </div>
                        </div>
                    </div>
                </div>

    </div>

        )
    }
}

export default CartArea