import React from "react"
import Navbar from "./components/Navbar"
import Header from "./components/vendor/Header";

function Docs (props) {
    return (<div id="docs">
        <Navbar history={props.history} />
        <Header category="Documentations" />
        <h1>Rest API Links</h1>
<h2>Customer Links</h2>
<ul>
<li><del>Strike through</del> - Not used now.</li>
<li>Highlighted - Not implemented up-to now.</li>
<li>
<table className="table container table-striped thead-dark">
<thead>
<tr>
<th><strong>Complete Route</strong></th>
<th><strong>Method</strong></th>
<th><strong>Link</strong></th>
<th><strong>Resource</strong></th>
<th><strong>JSON</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/<del>customers</del></td>
<td>All customers details</td>
<td>ALL</td>
</tr>
<tr>
<td>POST</td>
<td><strong>/customers</strong></td>
<td>Add a Customer</td>
<td>ALL</td>
</tr>
<tr>
<td>POST</td>
<td><strong>/customer/sign-in</strong></td>
<td>Authenticate a Customer</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/{`{user-id}`}</strong></td>
<td>Get Details of a Customer</td>
<td></td>
</tr>
<tr>
<td>PUT</td>
<td>/customer/{`{user-id}`}</td>
<td>Update details of Customer</td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td><del>/customer/{`{user-id}`}</del></td>
<td>Delete a Customer</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/cart/{`{user-id}`}/</strong></td>
<td>Get products in his Cart <strong>(View Cart)</strong></td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td><strong>/customer/cart/{`{user-id}`}/</strong></td>
<td>Delete all Products from Cart<strong>(Clear)</strong></td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td><strong>/customer/cart/{`{user-id}`}/{`{p-id}`}/</strong></td>
<td>Add a Product (of p-id) to his cart.</td>
<td>quantity</td>
</tr>
<tr>
<td>PUT</td>
<td><strong>/customer/cart/{`{user-id}`}/{`{p-id}`}</strong></td>
<td>Update Quantity of the Product in cart</td>
<td>quantity</td>
</tr>
<tr>
<td>DELETE</td>
<td><strong>/customer/cart/{`{user-id}`}/{`{p-id}`}</strong></td>
<td>Delete a Product from his Cart</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/wish-list/{`{user-id}`}</strong></td>
<td>Get products from Wishlist</td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td><strong>/customer/wish-list/{`{user-id}`}</strong></td>
<td>Delete all products from wishlist</td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td><strong>/customer/wish-list/{`{user-id}`}/{`{p-id}`}</strong></td>
<td>Add a product to wishlist</td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td><strong>/customer/wish-list/{`{user-id}`}/{`{p-id}`}</strong></td>
<td>Delete a product from wishlist</td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td><strong>/customer/buy/{`{user-id}`}</strong></td>
<td>Implement buy function <strong>(Little abstract)</strong></td>
<td>addressId</td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/bills/{`{user-id}`}</strong></td>
<td>Get a list of his bills</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/bill/{`{user-id}`}/{`{bill-id}`}</strong></td>
<td>Get a bill</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/address/{`{user-id}`}</strong></td>
<td>Get userâ€™s all Address</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/customer/address/{`{user-id}`}?permanent=true</strong></td>
<td>Get permanent Address</td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td><strong>/customer/address/{`{user-id}`}</strong></td>
<td>Add a address to User</td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td>/customer/address/{`{user-id}`}/{`{id}`}</td>
<td>DELETE a Address.</td>
<td></td>
</tr>
</tbody>
</table>
</li>
</ul>
<h2>Product</h2>
<table className="table container table-striped thead-dark">
<thead>
<tr>
<th><strong>Method</strong></th>
<th><strong>Link</strong></th>
<th><strong>Resource</strong></th>
<th><strong>Rule</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td><strong>/products</strong></td>
<td>Get all Products</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td>/products?filters</td>
<td>Filtering and other stuffs using <strong>Query Strings</strong></td>
<td></td>
</tr>
</tbody>
</table>
<h2>Vendor</h2>
<table className="table container table-striped thead-dark">
<thead>
<tr>
<th><strong>Method</strong></th>
<th><strong>Link</strong></th>
<th><strong>Resource</strong></th>
<th><strong>JSON</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td><del>/vendor</del></td>
<td>Get all Vendor details</td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td><strong>/vendor</strong></td>
<td>Add a Vendor</td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td><strong>/vendor/sign-in</strong></td>
<td>Sign in a Vendor</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/vendor/{`{v-id}`}</strong></td>
<td>Get a Vendor detail</td>
<td></td>
</tr>
<tr>
<td>PUT</td>
<td><strong>/vendor/{`{v-id}`}</strong></td>
<td>Update a Vendor</td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td><del>/vendor/{`{user-id}`}</del></td>
<td>Delete that Vendor</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><del>/vendor/{`{user-id}`}/{`{p-id}`} As use QS in /products</del></td>
<td>Get a product of that Vendor</td>
<td></td>
</tr>
<tr>
<td>POST</td>
<td>/vendor/product/{`{v-id}`}</td>
<td>Add a Product to that Vendor</td>
<td></td>
</tr>
<tr>
<td>PUT</td>
<td>/vendor/product/{`{v-id}`}</td>
<td>Update a product</td>
<td></td>
</tr>
<tr>
<td>DELETE</td>
<td><strong>/vendor/product/{`{v-id}`}/{`{p-id}`}</strong></td>
<td>Delete the product</td>
<td></td>
</tr>
<tr>
<td>GET</td>
<td><strong>/vendor/products/{`{v-id}`}</strong></td>
<td>Get all products From Vendor</td>
<td></td>
</tr>
</tbody>
</table>
</div>
    )
}

export default Docs