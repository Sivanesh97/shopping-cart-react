import React from "react"
import Fetch from '../Fetch'
import Modal from 'react-responsive-modal'

class CheckoutCartProduct extends React.Component {
    

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            quantity: this.props.product.quantity
        }
    }
    
    deleteMe = async () => {
        let { product } = this.props
        if(await Fetch.deleteCartProduct(product.id)) {
            this.props.fetchCartProducts()
            return null
        } else {
            console.error('Issue in DELETION')
            
        }
    }

    updateDB = async () => {
        this.setState({
            open: false
        })
        if (await Fetch.updateCartProduct(this.props.product.id, this.state.quantity)) {
            console.log("Updated the Cart Quantity")
            this.props.fetchCartProducts()
        }
    }

    updateQuantity = event => {
        this.setState({quantity: event.target.value})
    }

    onOpenModal = () => {
        this.setState({open: true})
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    render() {
        let { product, index } = this.props
        return (
            <tr>
                <td>{index}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.company}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.totalPrice}</td>
                <td>
                    <i className="fa fa-times table-icon" aria-hidden="true" onClick={this.deleteMe}></i>
                    <i className="fa fa-pencil table-icon" aria-hidden="true" onClick={this.onOpenModal} ></i>
                </td>
                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="col-md-6 mb-3">
                        <label htmlFor="quantity">Quantity <span>*</span></label>
                        <input type="text" className="form-control" id="quantity" value={this.state.quantity} required
                            onChange={this.updateQuantity} />
                            <br />
                            <button className="btn essence-btn" id="quantity-button" onClick={this.updateDB}>Submit</button>
                    </div>
                </Modal>
            </tr>
        )
    }
}

export default CheckoutCartProduct
