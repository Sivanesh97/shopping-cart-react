import React, { Component } from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import Fetch from '../Fetch'

class Bills extends Component {
    constructor() {
        super()

        this.state = {
            bills: [],
            products: [],
            isProductsAssigned: false
        }
        
    }

    componentDidMount() {
        this.fetcher()
    }

    fetcher = async () => {
        let bills = await Fetch.getUserBills()
        await this.setState({bills: bills})
        console.log("bills", bills)
        let products = await Promise.all(this.state.bills.map(async (bill) => await Fetch.getBillProducts(bill.billId)))
        await this.setState({products: products, isProductsAssigned: true})
    }

    showBillProducts = async event => {
    }

    render() {
        return (
        <div id="bills">    
            <Header category="Bills"/>
            <Navbar history={this.props.history}/>
            <div className="inline-block" style={{textAlign: 'center'}}>
                <div>#</div>
                <div>Timestamp</div>
                <div>Total</div>
            </div>
            <div id="accordion" role="tablist" className="mb-4">
                <div className="card">
                    <div role="tab" id="headingOne">
                        <h6 className="mb-0">
                                {this.state.bills.map((bill, index) => 
                                    (<a style={{display: 'block', padding: '20px'}} 
                                        key={index}

                                        data-toggle="collapse" 
                                        href={`#collapse${index}`} 
                                        aria-expanded="false" 
                                        aria-controls={`collapse${index}`}>
                                    <BillList key={index} 
                                        index={index} 
                                        timestamp={bill.timestamp}
                                        total={bill.total} onClick={this.showBillProducts} />
                                        <div id={`collapse${index}`} className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="card-body">
                                            <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Company</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Price</th>
                                                        </tr>
                                                    </thead>
                                                        {this.state.isProductsAssigned && <BillProducts key={index + 500} index={index} products={this.state.products[index]}/>}
                                            </table>
                                            </div>
                                        </div>
                                    </a>)
                                )}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

function BillList(props) {
    
    return (
        <div className="inline-block" style={{textAlign: 'center'}} onClick={props.onClick}>
            <div>{props.index + 1}</div>
            <div>{props.timestamp}</div>
            <div>{props.total}</div>
        </div>
    )
}

function BillProducts(props) {
    console.log('props', props)
    return (
    <tbody>
        {props.products.map((product, index) =>
            (<tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.company}</td>
                <td>{product.quantity}</td>
                <td>{product.totalPrice}</td>
            </tr>)
        )}
    </tbody>)
}

export default Bills