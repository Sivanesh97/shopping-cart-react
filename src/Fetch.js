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