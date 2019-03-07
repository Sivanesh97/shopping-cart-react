import React from "react"
import Fetch from "../../Fetch"
import { Link } from "react-router-dom"

class Product extends React.Component {
    constructor() {
        super()

        this.state = {
            isDeleted: false
        }
    }

    componentDidMount() {
        console.log(this.props.obj)
    }

    async delete() {
        let status = await Fetch.deleteVendorProduct(this.props.obj.id)
        console.log(status, "status")
        if (status) {
            this.setState({isDeleted: true})
        } else {
            console.error("Issue in Deleting the Product")
        }
        console.log('Is product deleted', this.state.isDeleted)
    }

    

    render() {
        if(this.state.isDeleted) {
            return null
        }
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <div className="single-product-wrapper">
                    {/* <!-- Product Image --> */}
                    <div className="product-img">
                        <img src={this.props.obj.img} alt="" />
                        {/* <!-- Favourite --> */}
                        <div className="product-favourite" onClick={this.delete.bind(this)} >
                            <span className="favme fa fa-times"></span>
                        </div>
                    </div>

                    {/* <!-- Product Description --> */}
                    <div className="product-description">
                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-5 col-sm-5">
                                <span>{this.props.obj.company}</span>
                                <a href="single-product-details.html">
                                    <h6>{this.props.obj.name}</h6>
                                </a>
                                <p> <span>{this.props.obj.quantity}</span> Available </p>
                            
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-sm-6">
                                <p className="prod-price" style={{fontSize: "2em", textAlign: "right"}}>₹{this.props.obj.price}</p>
                            </div>
                        </div>

                        {/* <!-- Hover Content --> */}
                        <div className="hover-content">
                            {/* <!-- Add to Cart --> */}
                            <div className="add-to-cart-btn">
                                <Link className="btn essence-btn" 
                                    to={
                                        {
                                            pathname: "/product-fields", 
                                            state:{
                                                obj: this.props.obj,
                                                toCreate: false
                                            } 
                                        }
                                    }>View / Update</Link>
                                <span className="hidden">{this.props.obj.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default Product