import React from 'react'
import Navbar from './Navbar'
import SideNav from './Sidenav'
import Product from './Product'
import Common from '../Common'
import Header from './Header'
import LoginRequest from './gateways/LoginRequest'
import Fetch from '../Fetch'

class Shop extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            loading: true,
            products: [],
            category: 'All Products'
        }
    }

    async componentDidMount() {

        let products = await Fetch.getProducts()
        console.log("Shop > componentDidMount: Fetching Products from Fetch class", products)
        this.setState({loading: false, products: products})
        console.log('Runs')
        document.querySelector('#productsDiv').addEventListener('click', event => {
            if(event.target.className.split(" ")[0] == 'btn') {
                console.log(event.target.parentNode.children[1].textContent)
                this.addToCart(event.target.parentNode.children[1].textContent)
            }
        })
    }

    addToCart(id) {
        let index =  this.state.products.findIndex(product => {
            if(id == product.id) return product
        })

        this.addToCartDB(this.state.products[index])
        // this.addToCartUI()
    }
    
    addToCartDB(obj) {
        console.log(`Add to Cart DB`)
        if(Fetch.addToCart(obj.id)) {
            console.log('Updated Cart DB')
            this.addToCartUI(obj)
        } else {
            console.log("Already present")
        }
       
    }
    
    addToCartUI(obj) {
        this.refs.child.cartCount()
        this.refs.child.dataSender(obj)
        console.log('Updated CartArea UI')
    }
    
    render() {
        if(this.state == null) {
            return null        
        } else if(Common.username == '') {
            return (<LoginRequest />)
        }
        return (
            <div id="shop">
                <Header category={this.state.category} />
                <Navbar ref="child"/>
                <SideNav />
                <h1>Shop</h1>
                <div className="col-12 col-md-8 col-lg-9">
                    <div className="shop_grid_product_area">
                        <div className="row" id="productsDiv">

                {this.state.loading ? <h1>Loading...</h1>: this.state.products.map(item => 
                    <Product key={item.id} id={item.id} name={item.name} quantity={item.quantity} img={item.img}
                        price={item.price} saledCount={item.saledCount} rating={item.rating} company={item.company} />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shop
