import React from "react"
import { Link } from "react-router-dom"

function SplitPage() {
    

    return (
        <div id="split-page">
            <Link to="/vendor/sign-in">
                <div className="split left">
                    <div className="centered">
                        <img src="/img/vendor.png" alt="Avatar woman" />
                        <h2>Vendor</h2>
                        <p>Sell Products</p>
                    </div>
                </div>
            </Link>

            <Link to="/sign-in">
                <div className="split right">
                    <div className="centered">
                        <img src="/img/customer.png" alt="Avatar man" />
                        <h2>Customer</h2>
                        <p>Buy Products</p>
                    </div>
                </div>
            </Link>
        </div>
       
    )
}

export default SplitPage