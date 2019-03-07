import Common from './Common'
import { toast } from "react-toastify"
import { Component } from "react"

class Fetch extends Component {

    static async getProducts(offset, limit)  {
        let products
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/products?offset=${offset}&limit=${limit}`)
        let json = await res.json()
        products = this.cleanFormatProducts(json)                
        console.log("IMG => ", products)
        return products
    }
    
    static async addToCart(id, quantity) {
        let json, str
        str = `http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/cart/${Common.user.id}/${id}`
        console.log("The string", str)
        console.count('addToCart')
        console.group("Fetch: addToCart()")

        console.log(quantity)
        try {
            let res = await fetch(str, 
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(+quantity)
                }
            )
            json = await res.json()
            console.log(json)

            if(json) {
                toast.success("Inserted to cart successfully", {autoClose: 2000})
                return true
            } else {
                toast.warning("Already Inserted to cart", {autoClose: 5000})
                return false
            }
        } catch(err) {
            toast.error("Issue in Inserting to cart", {autoClose: 2000})
            console.error('addToCart: Issue in Fetching', err)
            return false
        }
    }

    static async getCartProducts() {
        console.log('GET CART PRODUCTS')
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/cart/${Common.user.id}`)
        let json = await res.json()
        
        console.log(json)

        let obj = this.cleanFormatCartProducts(json)
        console.log('Prefetched from Cart', obj)
        return obj
    }

    static async updateCartProduct(id, quantity) {
        let link = `http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/cart/${Common.user.id}/${id}`
        let res = await fetch(link, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(+quantity)
        })

        let json = await res.json()

        if(json) {
            toast.info('Updated Products quantity', {autoClose: 2000})
            console.log("Updated Cart Product's Quantity Successfully")
        } else {
            console.log("Failed Cart Product's Quantity Update")
        }
        return json
    }

    static async deleteCartProduct(id) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/cart/${Common.user.id}/${id}`, {
            method: 'DELETE',
        })

        let json = await res.json()
        
        if (json) {
            toast.success('Removed product from cart successfully', {autoClose: 3000})
            console.log('DELETED FROM CART SUCCESSFULLY')
            return true
        } else {
            console.error('DELETION FAILS')
            return false
        }
    
    }

    static cleanFormatCartProducts(json) {
        let obj = json.map(item => {
            let product = item.products
            product.totalPrice = item.totalPrice
            product.company = item.company
            return product
        })
        return obj
    }

    static cleanFormatProducts(json) {
        let obj = json.map(item => {
            let product = item.products
            product.company = item.vendor.company
            return product
        })
        return obj
    }

    //Buy
    static async  buy() {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/buy/${Common.user.id}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )

        let json = await res.json()
        if(json) {
            console.log('Products Bought Successfully')

        } else {
            console.error('Issue In Product Buying')
        }
        return json
    }

    // Vendor
    static async getVendorProducts() {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/products/${Common.vendor.id}`)
        let json = await res.json()
        json = this.cleanFormatProducts(json)
        console.log("Vendor Products ", json)
        return json
    }

    static async deleteVendorProduct(p_id) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/product/${Common.vendor.id}/${p_id}`, 
            {
                method: "DELETE"
            }
        )

        let json = await res.json()

        if(json) {
            toast.info('Deleted a product successfully', {autoClose:3000})
            return true;
        } else {
            return false;
        }

        
    }

    static async addVendorProduct(product) {
        console.log(JSON.stringify(product), 'product in stringify state')
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/product/${Common.vendor.id}`, 
            {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }
        )

        let json = await res.json()
        
        if(json) {
            toast.info('Added Vendor Product to Server', {autoClose: 3000})
        }

        return json

    }

    static async updateVendorProduct(product) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/product/${Common.vendor.id}`,
        {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }
        )

        let json = await res.json()

        if(json) {
            toast('Updated Product successfully', {autoClose: 3000})
        }

        console.log("Update vendor Product", json)
        return json

    }

    static async getVendorDetails() {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/${Common.vendor.id}`)
        let json = await res.json()

        console.log("Vendor details", json)
        return json
    }

    static async updateVendorDetails(vendor) {
        const res = await fetch(
            `http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor/${Common.vendor.id}`,
            {
                method: "PUT",
                body: JSON.stringify(vendor),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )

        const json = await res.json()

        if(json) {
            toast.success('updated Details successfully')
        }

        console.log("Update Vendor Details", json)
        
    }

    // Bills
    static async getUserBills() {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/bills/${Common.user.id}`)
        let json = await res.json()
        if(json.length === 0) {
            console.error('No Bills present or Issue occured')
        }
        return json
    }

    static async getBillProducts(billId) {
        let str = `http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/bill/${Common.user.id}/${billId}`
        console.log(str)
        let res = await fetch(str)
        let json = await res.json()

        if(json.length === 0) {
            console.error('Issue occured in getbillProducts')
        }
        return this.cleanBillProducts(json)
    }

    static cleanBillProducts(json) {
        let res = json.map((product) => {
            return {
                id: product.products.id,
                name: product.products.name,
                company: product.vendor.company,
                quantity: product.history.quantity,
                unitPrice: product.products.price,
                totalPrice: product.total
            }

        })
        return res
    }

    static async addUser(user) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer`, 
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )

        let json = await res.json()

        if(json) {
            toast('Welcome User')
            console.log('Added user Successfully')
        } else {
            toast.err('Issue in adding User')
            console.error('Issue in Adding User')
        }
        return json
    }

    static async addVendor(vendor) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/vendor`, 
            {
                method: "POST",
                body: JSON.stringify(vendor),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )

        let json = await res.json()

        if(json) {
            toast.success('Welcome Vendor')
            console.log('Added vendor Successfully')
        } else {
            toast.error('Issue in SignUp')
            console.error('Issue in Adding vendor')
        }
        return json
    }

    static async getCategories() {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/products/categories`)
        let json = await res.json()
        console.log(json)
        return json
    }

    static async getCategoryProducts(offset, limit, category, minPrice, maxPrice, sortBy) {
        const route = `http://sivanesh-pt2774:5000/Shopping-Cart-API/api/products`
        let queryString = `?offset=${offset}&limit=${limit}&`
        if(category !== undefined && category !== 'All Products') {
            queryString += `category=${category}&`
        }

        if(minPrice !== undefined) {
            queryString += `min-price=${minPrice}&`
        }

        if(maxPrice !== undefined) {
            queryString += `max-price=${maxPrice}&`
        }

        if(sortBy !== undefined) {
            queryString += `sort-by=${sortBy}&`
        }

        console.log('Entire Link', route.concat(queryString))
        let res = await fetch(route.concat(queryString))
        let json = await res.json()
        console.log(json)
        toast.info('Products Updated', {autoClose: 2000})
        return this.cleanFormatProducts(json)
    }

    static async getWishlist() {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/wish-list/${Common.user.id}`)
        let json = await res.json()
        console.log(json)
        return json
    }

    static async addToWishlist(pId) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/wish-list/${Common.user.id}/${pId}`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )

        let json = await res.json()
        console.log(`[Fetch] addToWishList`, json)
        return json


    }

    static async deleteWishlist(pId) {
        let res = await fetch(`http://sivanesh-pt2774:5000/Shopping-Cart-API/api/customer/wish-list/${Common.user.id}/${pId}`,
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )

        let json = await res.json()
        console.log('[Fetch]', json)

        return json
    }

}
export default Fetch