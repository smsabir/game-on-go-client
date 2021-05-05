import { LinearProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ProductContext } from '../../App';
import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import './Home.css';
const Home = () => {
    const [products, setProducts] = useState([]);
    
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [buyProducts, setBuyProducts] = useContext(ProductContext);

    const history = useHistory();

    useEffect(() => {
        fetch('https://cryptic-plateau-80947.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    let newSelection;
    const handleBuyNow = (product) => {
        
        
        newSelection = selectedProducts? [...selectedProducts, product] : [product];
        setSelectedProducts(newSelection);
        setBuyProducts(newSelection);
        history.push('/checkout');
    }
    return (
        <div id="full-container">
            <Header></Header>
            <div id="body-container">
                <div className="search">
                    <form action="">
                        <input type="text" id="filter" placeholder="Search for..." />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="cards-area">
                    {
                        products.length === 0 && <> <LinearProgress /> <LinearProgress color="secondary" /> </>
                    }
                    {
                        products.map(product => <Cards key={product._id} product={product} handleBuyNow={handleBuyNow}></Cards>)
                    }
                </div>

            </div>
        </div>
    );
};

export default Home;