import React from 'react'
import Navbar from './Navbar'
import SideNav from './Sidenav'
import Product from './Product'
import Common from '../Common'
import Header from './Header'
import Fetch from '../Fetch'
import SplitPage from './Split-page';
import { ToastContainer } from "react-toastify"
import InfiniteScroll from 'react-infinite-scroll-component'

class Shop extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            loading: true,
            products: [],
            category: 'All Products',
            isUpdated: false,
            offset: 0,
            limit: 20,
            hasMore: true,
            minPrice: undefined,
            maxPrice: undefined,
        }
    }

    async componentDidMount() {
        if(Common.user.username !== '') {
            this.fetcher()
        }


    }

    fetcher = async () => {
        let length = this.state.products.length
        let { offset, limit, category, minPrice, maxPrice, sortBy } = this.state
        let products 
        console.log("Ender ", this.state.category)
        products = await Fetch.getCategoryProducts(offset, limit, category, minPrice, maxPrice, sortBy)
        console.log(products)
        console.log("Shop > componentDidMount: Fetching Products from Fetch class", products)
        await this.setState(prevState => ({loading: false, products: prevState.products.concat(products), offset: prevState.offset + limit + 1}))
        console.log('Runs')
        if(length === this.state.products.length) {
            this.setState({hasMore: false})
        }
    }

    updateUI = (product) => {
        console.log("[SHOP] WORKS UI Passing", product)
        this.refs.navChild.update()
    }

    fetchCategoryProducts = async (category, minPrice, maxPrice, sortBy) => {
        await this.setState({products: [], 
            hasMore: true, 
            offset: 0, 
            category: category, 
            loading: true, 
            minPrice: minPrice, 
            maxPrice: maxPrice, 
            sortBy: sortBy})
        console.log(this.state)
        this.fetcher()
    }
    
    render() {
        if(this.state == null) {
            console.error('Shop: State is NULL')
            return null        
        } else if(Common.user.username === '') {
            console.debug('Shop: No username is present')
            return (<SplitPage />)
        } 

        return (
            <div id="shop">
                <Header category={this.state.category} />
                <Navbar ref="navChild" history={this.props.history} />
                <section className="shop_grid_area section-padding-80">
                    <div className="container">
                        <div className="row">
                            <SideNav updateProducts={this.fetchCategoryProducts} />
                                <div className="col-12 col-md-8 col-lg-9">
                                    <h1>Shop</h1>
                                    <div className="shop_grid_product_area">
                                        <InfiniteScroll
                                            dataLength={this.state.products.length}
                                            next={this.fetcher}
                                            hasMore={this.state.hasMore}
                                            loader={<h3>Loading ...</h3>}
                                            endMessage={<h3>No More Products <span role="img" aria-label="emoji">💔</span></h3>}
                                        >
                                            <div className="row" id="productsDiv">
                                                {this.state.loading ? <h1>Loading...</h1>: this.state.products.map((item, index) => 
                                                    <Product key={index} 
                                                        updateUI={this.updateUI}
                                                        id={item.id} 
                                                        name={item.name} 
                                                        quantity={item.quantity} 
                                                        img={item.img} 
                                                        price={item.price} 
                                                        saledCount={item.saledCount} 
                                                        rating={item.rating} 
                                                        company={item.company}
                                                        favourite={this.isFavourite}    
                                                    />)
                                                }
                                            </div>
                                        </InfiniteScroll>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <ToastContainer />

                </div>
        )
    }
}

export default Shop
