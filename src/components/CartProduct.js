import React from 'react'
import Common from '../Common'
import Fetch from '../Fetch'

class CartProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.obj.id,
            name: this.props.obj.name,
            delete: false,

        }
    }


    productRemove() {
        this.setState({delete: true})
        this.productRemoveDB()
    }

    productRemoveDB() {
        console.log(`${Common.username}/${this.state.id}`)
        Fetch.deleteCartProduct(this.state.id)
    }

    render() {
        if(this.state.delete) {
            console.log(this.state.name, 'deleted from cart')
            this.props.update()
            // return null
        }
        return (
            <div className="single-cart-item">
                <a href="#" className="product-image">
                    <img src="img/product-img/product-1.jpg" className="cart-thumb" alt="" />
                    {/* <!-- Cart Item Desc --> */}
                    <div className="cart-item-desc">
                    <span className="product-remove" onClick={this.productRemove.bind(this)}><i className="fa fa-close" aria-hidden="true"></i></span>
                        {console.log('In Cart Product', this.props)}
                        <span className="badge">{this.props.obj.category}</span>
                        <h6>{this.props.obj.name}</h6>
                        <span className="badge">₹{this.props.obj.price}</span>

                        <p className="size">Quantity <span>${this.props.obj.quantity}</span></p>
                    </div>
                </a>
            </div>
        )
    }
}

export default CartProduct