import React from 'react';
import './Cards.css'
const Cards = (props) => {
    const{name, warranty, price, imgURL} = props.product;
    return (
        <div className="cards">
            <div>
            <img src={imgURL} alt=""/>
            </div>
            <div className="product-info">
            
            <p className="productName"><b>{name}<br/> WTY: {warranty} Yrs</b></p>
                <p id="price">${price} <input type="submit" style={{ cursor: 'pointer' }} onClick={() =>props.handleBuyNow(props.product)} value="Buy Now" id="buy-button"></input></p>
            </div>
        </div>
    );
};

export default Cards;