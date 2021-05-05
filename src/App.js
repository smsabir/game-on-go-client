import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import CheckOut from './components/Checkout/CheckOut';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import Order from './components/Orders/Order';

export const UserContext = createContext();
export const ProductContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [buyProducts, setBuyProducts] = useState({});
  return (
    <ProductContext.Provider value={[buyProducts, setBuyProducts]}>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/inventory">
              <Inventory></Inventory>
            </PrivateRoute>
            <PrivateRoute path="/checkout">
              <CheckOut></CheckOut>
            </PrivateRoute>
            <PrivateRoute path="/order">
              <Order></Order>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </ProductContext.Provider>

  );
}

export default App;
