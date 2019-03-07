import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <div className="breadcumb_area bg-img" style={{backgroundImage:  "url(img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="page-title text-center">
                                <h2>{this.props.category}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header