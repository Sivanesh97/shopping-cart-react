import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login'
import Shop from './components/Shop'
import Navbar from './components/Navbar'
import Common from './Common'

class App extends Component {
  constructor() {
     super()    

     console.log(Common)
  }
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route exact path='/' component={Shop} ></Route>
                <Route path='/signin' component={Login} />
                {/* <Route path='/signup' component={SignUp} /> */}
            </div>
        </BrowserRouter>

    );
  }
}

export default App;

