import { Route , Switch , BrowserRouter}  from "react-router-dom"

import Home from "./components/Home"
import Product from "./components/Product"

import './App.css';

const App = () => {
  return(<BrowserRouter>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/product/:Id" component={Product}/>
  </Switch>
  </BrowserRouter>)
}
  


export default App;
