import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ProductContext, UserContext } from '../../App';
import Header from '../Header/Header';
import './CheckOut.css';

const CheckOut = () => {
    const [buyProducts, setBuyProducts] = useContext(ProductContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [condition, setCondition] = useState(false);
    const history = useHistory();
    console.log(loggedInUser)
    const handleClick = () => {
        if (loggedInUser.email) {
            let newOrder = { ...buyProducts };
            newOrder.email = loggedInUser.email;
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            newOrder.date = date;
            console.log(newOrder)
            fetch('https://cryptic-plateau-80947.herokuapp.com/addOrders', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newOrder)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setCondition(true);
                    setBuyProducts('');
                })
        }
    }
    console.log(buyProducts);


    let price = 0;
    
     
    if (buyProducts && buyProducts.length > 0) {
        for (let i = 0; i < buyProducts.length || 0; i++) {
            price = price + parseFloat(buyProducts[i].price);
        }
    }
    else{
        
        if(!condition){
            history.push('/');
        }
    }

    // console.log(buyProducts[0].price)
    return (
        <div className="checkout-body">
            <Header></Header>
            <div className="checkout-container" style={condition? {display: "none"} : {display: 'block'}}>
                <div className="head-table" >
                    <p className="buyPro-name-head">Product</p>
                    <p className="buyPro-Qnty-head">Quantity</p>
                    <p className="buyPro-price-head">Price</p>
                </div>
                {
                    buyProducts && buyProducts.length > 0 ?
                        buyProducts.map(product =>
                            <div key={product._id}>
                                <p className="buyPro-name">{product.name}</p>
                                <p className="buyPro-Qnty">1</p>
                                <p className="buyPro-price">{product.price}</p>
                            </div>
                        ) : <span></span>
                }
                <div className="bottom-table">
                    <p className="buyPro-name-head">Total</p>
                    <p className="buyPro-Qnty-head"></p>
                    <p className="buyPro-price-head">{price}</p>
                </div>
            </div>
            <div className="success" style={condition? {display: "block"} : {display: 'none'}}>
                <img src="https://media.giphy.com/media/26DOMeaD2gdGE44LK/giphy.gif" alt=""/>
            </div>
                {
                    condition? <button type="submit" style={{marginLeft: '45%', marginRight: 'auto'}} onClick={() => history.push('/order')}>Order History</button> : 
                    <button type="submit" onClick={() => handleClick()}>CheckOut</button>
                }
            
        </div>
    );
};

export default CheckOut;