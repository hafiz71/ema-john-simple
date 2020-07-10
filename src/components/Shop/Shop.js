import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import Product from '../Product/Product'
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey =>{
            const product = fakeData.find(pd => pd.key === existingKey);
            //console.log(existingKey, savedCart[existingKey]);
            product.quantity = savedCart[existingKey];
            return product;
            
        });
        //console.log(previousCart);
        setCart(previousCart);
        
    }, []);

    const handleAddProduct = (product) =>{
    //console.log("product add", product);
    const ToBeAddedKey = product.key;
    const smaePorduct = cart.find(pd => pd.key === ToBeAddedKey);

    let count = 1;
    let newCart;
    if(smaePorduct){
        count = smaePorduct.quantity + 1;
        smaePorduct.quantity = count;
        const others = cart.filter(pd => pd.key !== ToBeAddedKey);
        newCart = [...others, smaePorduct];
    }
    else{
        product.quantity = 1;
        newCart = [...cart, product]
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
    };
    return (
        <div className="twin-container">
           <div className="product-container">
             {
                products.map(pd => <Product
                    key = {pd.key}
                    showAddToCart ={true}
                    handleAddProduct = {handleAddProduct}
                    product={pd}>
                </Product>)
             }
           </div>

           <div className="care-container">
              <Cart cart={cart}>
              <Link to="/review"><button className="main-button">Review Order</button></Link>
              </Cart>
           </div>
           
        </div>
    );
};

export default Shop;