import Common from './Common'

class Fetch {
    static async getProducts()  {
        let products
        let res = await fetch('http://localhost:5000/Shopping-Cart-API/api/customer/products')
        let json = await res.json()
        products = this.cleanFormatProducts(json)                

        return products
    }

    static async addToCart(id) {
        

        let res = await fetch(`http://localhost:5000/Shopping-Cart-API/api/customer/products/${Common.username}/${id}`, 
            {
                method: 'POST',
                 headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json'
            },
        })
        let json = await res.json()
        if(json) return true
        else return false
    }

    static async getCartProducts() {
        console.log('GET CART PRODUCTS')
        let res = await fetch(`http://localhost:5000/Shopping-Cart-API/api/customer/cart/${Common.username}`)
        let json = await res.json()
        
        console.log(json)

        let obj = this.cleanFormatCartProducts(json)
        console.log('Prefetched from Cart', obj)
        return obj
    }

    static async deleteCartProduct(id) {
        let res = await fetch(`http://localhost:5000/Shopping-Cart-API/api/customer/products/${Common.username}/${id}`, {
            method: 'DELETE',
        })
        
        if (res == 'true') {
            console.log('DELETED FROM CART SUCCESSFULLY')
            return true
        } else {
            console.log('DELETION FAILS')
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

}

export default Fetch