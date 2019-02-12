class Html {
    constructor() {

    }

    static CartProducts() {
        return `
        {/* <!-- Single Cart Item --> */}
            <div className="single-cart-item">
                <a href="#" className="product-image">
                    <img src="img/product-img/product-3.jpg" className="cart-thumb" alt="" />
                    {/* <!-- Cart Item Desc --> */}
                    <div className="cart-item-desc">
                    <span className="product-remove"><i className="fa fa-close" aria-hidden="true"></i></span>
                        <span className="badge">Mango</span>
                        <h6>Button Through Strap Mini Dress</h6>
                        <p className="size">Size: S</p>
                        <p className="color">Color: Red</p>
                        <p className="price">$45.00</p>
                    </div>
                </a>
            </div>        
`
    }


}

export default Html