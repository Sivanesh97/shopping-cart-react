import React from "react"

class Product extends React.Component {
    constructor() {
        super()

    }

    checker() {
        
    }

    render() {
        return (
            <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-product-wrapper">
                    {/* <!-- Product Image --> */}
                    <div className="product-img">
                        <img src="img/product-img/product-2.jpg" alt="" />
                        {/* <!-- Favourite --> */}
                        <div className="product-favourite">
                            <a href="#" className="favme fa fa-heart"></a>
                        </div>
                    </div>

                    {/* <!-- Product Description --> */}
                    <div className="product-description">
                        <span>{this.props.company}</span>
                        <a href="single-product-details.html">
                            <h6>{this.props.name}</h6>
                        </a>
                        <p className="product-price">₹{this.props.price}</p>

                        {/* <!-- Hover Content --> */}
                        <div className="hover-content">
                            {/* <!-- Add to Cart --> */}
                            <div className="add-to-cart-btn">
                                <button className="btn essence-btn">Add to Cart</button>
                                <span className="hidden">{this.props.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default Product