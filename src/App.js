import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from './components/Login'
import Shop from './components/Shop'
import VendorMain from './components/vendor/VendorMain';
import VendorLogin from './components/vendor/VendorLogin'
import ProductFields from './components/vendor/ProductFields';
import Checkout from "./components/Checkout";
import Bills from './components/Bills';
import Docs from './Docs';
import SignUp from './components/sign-up';
import { ToastContainer } from "react-toastify"

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <div className="App">
            <Switch>
                <Route exact path='/' component={Shop} />
                <Route path={`/vendor/sign-in`} component={VendorLogin} />
                <Route exact path="/vendor" component={VendorMain} />
                <Route path='/sign-in' component={Login} />
                <Route path={`/product-fields`} component={ProductFields} />
                <Route path={`/checkout`} component={Checkout} />
                <Route path={`/bills`} component={Bills} />
                <Route path={`/docs`} component={Docs} />
                <Route path={`/sign-up`} component={SignUp} />
                {/* <Route path='/signup' component={SignUp} /> */}
            </Switch>
            </div>

        </BrowserRouter>
        <ToastContainer />
      </div>
    );
  }
}

export default App;

