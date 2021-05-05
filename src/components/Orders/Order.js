import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import "./Order.css"

const Order = () => {
    const[loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderHistory, setOrderHistory] = useState({});
    useEffect(() => {
        fetch("https://cryptic-plateau-80947.herokuapp.com/orders?email=" + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrderHistory(data))
    }, [loggedInUser])

    // console.log(orderHistory) 
    
    let price = 0;
    orderHistory && orderHistory.length > 0?
    orderHistory.forEach(product => {
        price += parseFloat(product[0].price);
    }) : price = 0;

    return (
        <div className="history-body">
            <Header></Header>
            <div className="history-container">
                <div><h3>Order History</h3></div>
                <div className="head-table">
                    <p className="history-name-head">Product</p>
                    <p className="history-Qnty-head">Warranty</p>
                    <p className="history-price-head">Price</p>
                    <p className="history-date-head">Order Date</p>
                </div>

                {
                 orderHistory && orderHistory.length > 0? 
                	orderHistory?.map(product =>
                    <div key={product._id}>
                        <p className="history-name">{product?.[0]?.name}</p>
                        <p className="history-Qnty">{product?.[0]?.warranty}</p>
                        <p className="history-price">{product?.[0]?.price}</p>
                        <p className="history-date">{product.date}</p>
                    </div>
                )  : <span></span>
                }
                <div className="bottom-table">
                    <p className="history-name-head">Total</p>
                    <p className="history-Qnty-head"></p>
                    <p className="history-price-head">{price}</p>
                </div>
            </div>
        </div>
    );
};

export default Order;