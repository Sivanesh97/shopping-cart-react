import React from "react"
import Fetch from "../../Fetch";
import NavBar from './Navbar'

class ProductFields extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            toCreate: true,
            id: 0,
            name: '',
            price: 0,
            company: '',    
            category: '',
            quantity: 0,
            saledCount: 0,
            rating: 0,
            img: ''
        }
        

    }

    componentDidMount() {
        let obj = this.props.location.state.obj
        if(this.props.location.state.toCreate) {
            document.querySelector("#sign-in-button").textContent = "Add a Product"
        } else {
            this.setState({
                toCreate: false,
                id: obj.id,
                name: obj.name,
                price: obj.price,
                company: obj.company,
                category: obj.category,
                quantity: obj.quantity,
                saledCount: obj.saledCount,
                rating: obj.rating,
                img: obj.img
            })
        }
    }   

    fetch() {
        if(this.state.toCreate) {
            if (Fetch.addVendorProduct(this.state)) {
                setTimeout(() => {
                    this.props.history.push('/vendor')
                }, 1000)
            } else {
                console.error("There's issue in Adding Vendor Product")
            }
            
        } else {
            if(Fetch.updateVendorProduct(this.state)) {
                this.props.history.push('/vendor')
            } else {
                console.error("There's issue in Updating Vendor Product")
            }
        }
    }

    updateName(event) {
        this.setState({
            name: event.target.value
        })
    }

    
    updateCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    updatePrice(event) {
        this.setState({
            price: event.target.value
        })
    }

    updateQuantity(event) {
        this.setState({
            quantity: event.target.value
        })
    }


    render() {
        return (
            <div>
                        <NavBar />
            <div className="checkout_area section-padding-80" id="login-box">
            <div className="container">
                <div className="row">
    
                        <div className="checkout_details_area mt-50 clearfix">
    
                            <div className="cart-page-heading mb-30">
                                <div className="row">
                                    <div className="col-md-7 mb-3" style={{textAlign: 'left'}}>
                                        <h5>Product</h5>
                                        <h4>{this.state.name}</h4>
                                    </div>
                                    <div className="col-md-5 mb-3" style={{textAlign: 'right', borderRadius: "50%"}}>
                                        <img src={this.state.img} alt="img" style={{width: '100px'}} />
                                    </div>
                                
                                </div>
                            </div>
    
                            <form>
                                <p>Only Product name, Price, Quantity, category are updatable.</p>
                                <div className="row">
                                    <div className="col-md-2 mb-3">
                                        <label htmlFor="id">Id  <span>*</span></label>
                                        <input type="text" className="form-control" id="id" value={this.state.id} required disabled />
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="product-name">Product name <span>*</span></label>
                                        <input type="text" onChange={this.updateName.bind(this)} className="form-control" id="product-name" value={this.state.name} required />
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="price">Price <span>*</span></label>
                                        <input type="text" onChange={this.updatePrice.bind(this)} className="form-control" id="price" value={this.state.price} required />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="company">Company Name</label>
                                        <input type="text" className="form-control" id="company" value={this.state.company} disabled />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="category">Category</label>
                                        <input type="text" onChange={this.updateCategory.bind(this)} className="form-control" id="category" value={this.state.category} />
                                    </div>
                                    
                                   
                                    <div className="col-4 mb-3">
                                        <label htmlFor="quantity">Quantity <span>*</span></label>
                                        <input type="text" onChange={this.updateQuantity.bind(this)} className="form-control" id="quantity" value={this.state.quantity} />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label htmlFor="saled-count">Saled Count <span></span></label>
                                        <input type="text" className="form-control" id="saled-count" value={this.state.saledCount} disabled />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label htmlFor="rating">Rating <span></span></label>
                                        <input type="text" className="form-control" id="rating" value={this.state.rating} disabled />
                                    </div>
                                    <button className="btn essence-btn" id="sign-in-button" onClick={this.fetch.bind(this)} >Update</button>
                                </div>
                            </form>
                        </div>
    
                    
                </div>
            </div>
        </div>
            </div>
        )
    }
}

export default ProductFields