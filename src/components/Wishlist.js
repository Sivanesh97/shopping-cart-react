import React, { Component } from "react"
import Fetch from "../Fetch";
import Product from "./Product";
import Common from '../Common'

class Wishlist extends Component { 
    constructor() {
        super()

        this.state = {
            products: []
        }

    }

    async componentDidMount() {
        let products = await Fetch.getWishlist()
        console.log('[Wishlist] ', products)
        this.setState({products})
    }

    render() {
        let { products } = this.state

        if(products.length === 0) return (<h1>No Products Present</h1>)

        return (
            <div id="wish-list">
                <h1>{Common.user.username}'s Wishlist</h1>        
                <div className="row">
                    {products.map((product, index) => 
                        <Product key={index}
                        id={product.id}
                        name={product.name}
                        img={product.img}
                        price={product.price}
                        favourite={true}
                        />
                    )}                
                </div>
            </div>
        )
    }
}

export default Wishlist