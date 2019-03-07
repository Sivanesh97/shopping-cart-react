import React from "react"
import Fetch from "../Fetch"
import Modal from "react-responsive-modal"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false, 
            quantity: 1,
            favourite: this.props.favourite
        }
    }

    addToCart = async () => {
        this.setState({open: false})
        if(await Fetch.addToCart(this.props.id, +this.state.quantity)) {
            console.log("Product added to cart successfully")
        } else {
            console.error('Issue in AddToCart')
        }

        console.groupEnd('Fetch: addToCart()')
        this.props.updateUI(this.props)
    }

    onOpenModal = () => {
        this.setState({open: true})
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    updateQuantity = event => {
        this.setState({quantity: event.target.value})
    }

    updateHeart = async event => {
        event.target.classList.toggle('active')
        event.target.classList.toggle('is_animating')
        await this.setState(prevState => ({favourite: !prevState.favourite}))
        this.fetcher()
    }

    fetcher = async () => {
        if(this.state.favourite) {
            if(await Fetch.addToWishlist(this.props.id)) {
                console.log('[Product] Works')
                toast.success('Added to Wishlist successfully', {autoClose: 3000})
            } else {
                toast.error('Already in Wishlist', {autoClose: 3000})
                console.log('[Product] Issue or already present in cart')
            }
        } else {
            if(await Fetch.deleteWishlist(this.props.id)) {
                toast.warning('Removed from wishlist successfully', {
                    autoClose: 3000
                })
                console.log('[Product] Removed from wishlist')
            } else {
                console.log('[Product] Not Removed from wishlist')
            }
        }
    }

    render() {
        if(this.props.favourite && !this.state.favourite) {
            return null
        }

        return (
            <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-product-wrapper">
                    {/* <!-- Product Image --> */}
                    <div className="product-img">
                        <img src={this.props.img} alt="" />
                        {/* <!-- Favourite --> */}
                        <div className="product-favourite" onClick={this.updateHeart}>
                            <span className={`favme fa fa-heart ${this.state.favourite && 'active'}`} ></span>
                        </div>
                    </div>

                    {/* <!-- Product Description --> */}
                    <div className="product-description">
                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-5 col-sm-5">
                                <span>{this.props.company}</span>
                                <a href="single-product-details.html">
                                    <h6>{this.props.name}</h6>
                                </a>
                                <p> <span>{this.props.quantity}</span> Available </p>
                            
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-sm-6">
                                <p className="prod-price" style={{fontSize: "2em", textAlign: "right"}}>₹{this.props.price}</p>
                            </div>
                        </div>

                        {/* <!-- Hover Content --> */}
                        <div className="hover-content">
                            {/* <!-- Add to Cart --> */}
                            <div className="add-to-cart-btn">
                                <button className="btn essence-btn" onClick={this.onOpenModal}>Add to Cart</button>
                                <span className="hidden">{this.props.id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal open={this.state.open} onClose={this.onCloseModal} >
                    <div className="col-md-6 mb-3">
                        <label htmlFor="quantity">Quantity <span>*</span></label>
                        <input type="text" className="form-control" id="quantity" value={this.state.quantity} required
                            onChange={this.updateQuantity} />
                            <br />
                            <button className="btn essence-btn" id="quantity-button" onClick={this.addToCart}>Submit</button>
                    </div>
                </Modal>
        </div>
        )
    }
}

export default Product