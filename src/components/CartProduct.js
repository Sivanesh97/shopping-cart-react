import React from 'react'
import Common from '../Common'

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
        fetch(`http://localhost:5000/Shopping-Cart-API/api/customer/products/${Common.username}/${this.state.id}`, 
            {
                method: 'DELETE',
            }
        ).then(res => {
            if(res == 'true') {
                console.log('DELETED FROM CART SUCCESSFULLY')
            } else {
                console.log('DELETION FAILS')
            }
        })
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