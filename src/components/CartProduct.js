import React from 'react'
import Common from '../Common'
import Fetch from '../Fetch'
import Modal from 'react-responsive-modal'

class CartProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.obj.id,
            name: this.props.obj.name,
            delete: false,
            open: false,
            quantity: ''
        }
    }


    productRemove() {
        this.setState({delete: true})
        this.productRemoveDB()
    }

    productRemoveDB() {
        console.log(`${Common.user.username}/${this.state.id}`)
        Fetch.deleteCartProduct(this.state.id)
    }

    updateQuantity = event => {
        this.setState({quantity: event.target.value})
    }

    onOpenModal = event => {
        if (event.target.localName === 'i') {
            console.log("checks")
        } else {
            this.setState({open: true})
    
            // UI Alterations
            var cartOverlay = window.$(".cart-bg-overlay");
            var cartWrapper = window.$(".right-side-cart-area");
            var cartOverlayOn = "cart-bg-overlay-on";
            var cartOn = "cart-on";
    
                cartOverlay.toggleClass(cartOverlayOn);
                cartWrapper.toggleClass(cartOn);
                window.$(this).removeClass(cartOverlayOn);
                cartWrapper.removeClass(cartOn);
                cartOverlay.removeClass(cartOverlayOn);
                cartWrapper.removeClass(cartOn);
        }
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

     updateDB = async () => {
        this.setState({open: false})
        if(await Fetch.updateCartProduct(this.props.obj.id, this.state.quantity)) {
            console.log("Updated the Cart Quantity")
            this.props.fetchAlreadyPresentCart()
        }
    }


    render() {
        if(this.state.delete) {
            console.log(this.state.name, 'deleted from cart')
            this.props.update()
            // return null
        }
        return (
            <div className="single-cart-item">
                <span className="product-image" onClick={this.onOpenModal}>
                    <img src={this.props.obj.img} className="cart-thumb" alt="" />
                    {/* <!-- Cart Item Desc --> */}
                    <div className="cart-item-desc">
                        <span className="product-remove">
                            <i className="fa fa-close" 
                                aria-hidden="true"
                                onClick={this.productRemove.bind(this)}
                            ></i>
                        </span>
                        <span className="badge">{this.props.obj.category}</span>
                        <h6>{this.props.obj.name}</h6>
                        <span className="badge">₹{this.props.obj.price}</span>
                        <p className="size">Quantity <span>{this.props.obj.quantity}</span></p>
                    </div>
                </span>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="quantity">Quantity <span>*</span></label>
                        <input type="text" className="form-control" id="quantity" value={this.state.quantity} required
                            onChange={this.updateQuantity} />
                            <br />
                            <button className="btn essence-btn" id="quantity-button" onClick={this.updateDB}>Submit</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default CartProduct