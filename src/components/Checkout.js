import React, { Component } from "react"
import Header from './Header'
import Fetch from '../Fetch'
import CheckoutCartProduct from './CheckoutCartProduct'
import { toast } from "react-toastify";

class Checkout extends Component {
    constructor() {
        super()

        this.state = {
            products: [],
            total: 0
        }

        
    }

    componentDidMount() {
        this.fetchCartProducts()
    }

    fetchCartProducts = async () => {
        let cartProducts = await Fetch.getCartProducts()
        await this.setState({products: cartProducts})
        console.log(this.state.products)
        this.calculateTotal()
    }

    calculateTotal() {
        let sum = this.state.products.reduce((acc, product) => acc + product.totalPrice, 0)
        this.setState({total: sum})
        console.log("Calculart ", sum)
    }

    buy = async () => {
        let res = await Fetch.buy()
        console.log(res)
        if(res) {
            toast.success('Buyed successfully', {autoClose: 4000})
        }
        this.props.history.push('/')
    }


    render() {
        return (
            <div id="checkout">
                <Header category="Checkout" />
                    <div className="order-details-confirmation">
                        <div className="cart-page-heading">
                            <h5>Your Order</h5>
                            <p>The Details</p>
                        </div>
                        <table className="table">
                              <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Updations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(
                                    (product, index) => <CheckoutCartProduct 
                                        key={index} 
                                        index={index + 1}
                                        product={product}
                                        fetchCartProducts={this.fetchCartProducts} />
                                )}
                            </tbody>
                        </table>
                        <h1 id="total">Total: <span>{this.state.total}</span></h1>
                        <button className="btn essence-btn" id="buy-button" onClick={this.buy}>Buy </button>
                    </div>

            </div>
        )
    }
}


export default Checkout