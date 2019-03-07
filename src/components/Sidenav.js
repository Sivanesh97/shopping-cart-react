import React from "react"
import { Link } from "react-router-dom"
import Fetch from "../Fetch"

class Sidenav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            minPrice: undefined,
            maxPrice: undefined,
            updateFlag: false,
            message: 'Press enter to Apply this Filter.',
            color: '#787878',
            category: undefined,
            sortBy: undefined
        }

        this.categoryFetcher()
    }

    categoryFetcher = async () => {
        let categories = await Fetch.getCategories()
        this.setState({categories})
    }

    updateLowPrice = event => {
        let price = event.target.value === '' ? undefined: event.target.value
        this.setState({minPrice: price, updateFlag: true})
    }

    updateHighPrice = event => {
        let price = event.target.value === '' ? undefined: event.target.value
        this.setState({updateFlag: true, maxPrice: price})
    }

    validateAndFetch = event => {
        let { minPrice, maxPrice } = this.state
        console.log('current max price', maxPrice)
        if(event.which === 13) {
            if(Number(minPrice) > Number(maxPrice)) {
                this.setState({message: 'Invalid Range', color: 'crimson'})
            } else {
                this.setState({message: 'Filter Applied', color: 'green'})
                this.fetcher()
            }          
        }
    }

    updateProducts = async event => {
        let { minPrice, maxPrice } = this.state
        await this.setState({category: await event.target.textContent})

        console.log('Checking args before fetching from SideNav',this.state.category, minPrice, maxPrice)
        this.fetcher()
    }

    async assignSorter(event) {
        let sorter = await event.target.value

        if (sorter === '-- Select --') {
            sorter = undefined
            this.setState({sortBy: undefined})
        } else {
            this.setState({sortBy: sorter})
        }
        console.log('SORT PARAMETER', sorter)

        this.fetcher()
    }

    fetcher = () => {
        let { category, minPrice, maxPrice, sortBy } = this.state
        console.log('Checking args before fetching from SideNav',category, minPrice, maxPrice, sortBy)
        this.props.updateProducts(category, minPrice, maxPrice, sortBy)
    }

    render() {
        return (
            <div className="col-12 col-md-4 col-lg-3">
                    <div className="shop_sidebar_area">
                        <h5 className="widget-title mb-30">Filter by</h5>
                        {/* Price Filtering */}
                        {/* <!-- Sorting --> */}
                        <div className="product-sorting d-flex">
                            <div className="form-group">
                                <h6 htmlFor="exampleFormControlSelect1">Sort by</h6>
                                <select onChange={this.assignSorter.bind(this)} 
                                    className="form-control" 
                                    id="exampleFormControlSelect1"
                                    value={this.state.sortBy}    
                                >
                                    <option>-- Select --</option>
                                    <option value="price">Price - Low to High</option>
                                    <option value="price DESC">Price - High to Low</option>
                                    <option value="saledCount DESC">Most Selled</option>
                                    <option value="Rating DESC">High Rated</option>
                                </select>
                            </div>
                        </div>
                        <h6>Price</h6>
                        {this.state.updateFlag && <p id="price-filter-msg" style={{color: this.state.color}}>{this.state.message}</p> }
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <input type="number" 
                                    placeholder="Min Price"
                                    className="form-control" 
                                    id="low_price" 
                                    value={this.state.lowPrice}
                                    onChange={this.updateLowPrice}
                                    onKeyPress={this.validateAndFetch} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="number" 
                                    placeholder="Max Price"
                                    className="form-control" 
                                    id="high_price"
                                    value={this.state.highPrice} 
                                    onChange={this.updateHighPrice}
                                    onKeyPress={this.validateAndFetch} />
                            </div>
                        </div>

                        {/* <!-- ##### Single Widget ##### --> */}
                        <div className="widget catagory mb-50">
                            {/* <!--  Catagories  --> */}
                            <div className="catagories-menu">
                                <ul id="menu-content2" className="menu-content collapse show">
                                    {/* <!-- Single Item --> */}
                                    <li data-toggle="" data-target="#clothing">
                                        <span href="#">Categories</span>
                                        <ul className="sub-menu collapse show" id="clothing">
                                            <li><Link to="/">All</Link></li>
                                            {this.state.categories.map((item, index) => 
                                                <li key={index}><span className="nav-categories" onClick={this.updateProducts}>{item}</span></li>    
                                            )}
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Sidenav