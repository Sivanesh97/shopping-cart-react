import React from 'react'
import CartProduct from './CartProduct'
import Common from '../Common'

class CartArea extends React.Component {
    constructor() {
        super()

        this.state = {
            products: []
        }

        this.fetchAlreadyPresentCart()

    }

    fetchAlreadyPresentCart() {
        fetch(`http://localhost:5000/Shopping-Cart-API/api/customer/cart/${Common.username}`)
            .then(res => res.json())
            .then(json => {
                let obj = this.clearFormat(json)
                console.log('Prefetched from Cart', obj)
                this.setState(
                    {products: obj}
                )
                this.props.updateCartCount(this.state.products.length)
            }
        )
    }

    clearFormat(json) {
        let obj = json.map(item => {
            let product = item.products
            product.totalPrice = item.totalPrice
            product.company = item.company
            return product
        })
        return obj
    }

    update() {
        this.fetchAlreadyPresentCart()
    }

    componentDidMount() {
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
                        <a href="#" id="rightSideCart"><img src="img/core-img/bag.svg" alt="" /> <span>3</span></a>
                    </div>

                    <div className="cart-content d-flex">

                        {/* <!-- Cart List Area --> */}
                        <div className="cart-list">
                            
                            {this.state.products.map(item => {
                                console.log("Creating cartProduct Component", item)
                                 return <CartProduct obj={item} key={item.id} update={this.update.bind(this)} />
                            })}

                            
                        </div>

                        {/* <!-- Cart Summary --> */}
                        <div className="cart-amount-summary">

                            <h2>Summary</h2>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>$274.00</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>discount:</span> <span>-15%</span></li>
                                <li><span>total:</span> <span>$232.00</span></li>
                            </ul>
                            <div className="checkout-btn mt-100">
                                <a href="checkout.html" className="btn essence-btn">check out</a>
                            </div>
                        </div>
                    </div>
                </div>

    </div>

        )
    }
}

export default CartArea