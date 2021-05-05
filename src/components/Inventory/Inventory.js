import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Header from '../Header/Header';
import './Inventory.css';
const Inventory = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imgURL, setImgURL] = useState(null);
    const [products, setProducts] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetch('https://cryptic-plateau-80947.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    // console.log(products)

    const onSubmit = data => {
        const productData = {
            name: data.name,
            warranty: data.warranty,
            price: data.price,
            imgURL: imgURL

        };

        console.log(productData);
        axios.post('https://cryptic-plateau-80947.herokuapp.com/addProduct', productData)
            .then((response) => {
                console.log("Result after fetching data:", response)
                setImgURL(null);
            })
            .catch((error) => {
                console.log(error);
            });

    };
    const handleImageUpload = (event) => {
        const addImage = (event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '0bd92f479c83af957a6e242bff39f60e');
        imageData.append('image', addImage);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => {
                setImgURL(response.data.data.display_url);
                console.log(response.data.data.display_url);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteProduct = (event, id) =>{
        event.preventDefault();
        const productId = id.product._id;
        const parentNode = event.target.parentNode.parentNode.parentNode;
        console.log(productId);
        fetch(`https://cryptic-plateau-80947.herokuapp.com/products/delete/${productId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    parentNode.style.display = 'none';
                }
            })
    }

    return (
        <div id="full-body">
            <Header></Header>
            <div className="sidebar">
                <a onClick={() => setToggle(true)}><i className="fa fa-tasks" aria-hidden="true"></i> Manage Products</a>
                <a className="active" onClick={() => setToggle(false)}> <i className="fa fa-plus"></i> Add Products</a>
                <a href="#"><i className="fa fa-pencil"></i> Edit Products</a>
            </div>
            <div className="form-header">
                {
                    toggle ? <h2>Update Product</h2> : <h2>Add Product</h2>
                }

            </div>
            <div className="form-container" style={toggle ? { display: 'none' } : { display: 'block' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-body">
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label htmlFor="name">Product</label>
                                <br />
                                <input name="name" defaultValue="" placeholder="Enter Name" type="text" ref={register({ required: true })} />
                                {errors.name && <span style={{ marginBottom: '10px' }}>This field is required</span>}
                            </div>
                            <div className="form-group right">
                                <label htmlFor="warranty">Warranty</label>
                                <br />
                                <input name="warranty" defaultValue="3" placeholder="Warranty" type="number" ref={register({ required: true })} />
                                {errors.warranty && <span style={{}}>This field is required</span>}
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label htmlFor="price">Price</label>
                                <br />
                                <input name="price" defaultValue="" placeholder="Product Price" ref={register({ required: true })} />
                                {errors.price && <span>This field is required</span>}
                            </div>
                            <div className="form-group right">
                                <label>Upload Photo</label>
                                <br />
                                <label htmlFor="file"><i className="fa fa-upload"></i> Upload Photo</label>
                                <input name="file" type="file" id="file" onChange={handleImageUpload} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={imgURL ? false : true}>Save</button>
                </form>
            </div>
            <div className="product-table" style={toggle ? { display: 'block' } : { display: 'none' }}>
                <div id="header">
                    <p className="product-name-head">Product Name</p>
                    <p className="product-warranty-head">Warranty</p>
                    <p className="product-price-head">Price</p>
                    <p className="product-action-head">Action</p>
                </div>
                {
                    products.map(product => (
                        <div key={product._id}>
                            <p className="product-name">{product.name} </p>
                            <p className="product-warranty">{product.warranty}</p>
                            <p className="product-price">{product.price}</p>
                            <p className="product-action">
                                <a href="#"><i className="fa fa-pencil-square fa-2x" style={{ color: 'green', padding: '5px' }} aria-hidden="true"></i></a>
                                <a href="#" onClick={(event) => deleteProduct(event, {product})}><i className="fa fa-trash fa-2x" style={{ color: '#A41F26', padding: '5px' }} aria-hidden="true"></i></a>

                            </p>
                        </div>

                    ))

                }
            </div>
        </div>
    );
};

export default Inventory;