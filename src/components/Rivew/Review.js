import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImages from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState ([]);
    const [orderedPlace, setOrderedPlace] = useState(false);
    const auth = useAuth();

    const haldlePlaceOrder = () => {
        //console.log('order place');
        setCart([]);
        setOrderedPlace(true);
        processOrder();
        
    };

    //Remove buttom
    const removeProduct = (productKey) =>{
        console.log('romove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        
    };

    useEffect (()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartsProducts = productKeys.map( key => {
        const product = fakeData.find(pd =>  pd.key === key);
        product.quantity = savedCart[key];
        return product;
        });
        setCart(cartsProducts);
        
    }, []);
    let thankyou;
    if(orderedPlace){
        thankyou = <img src={happyImages} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
            {
                !cart.length && <h1>Your cart is empty. <a href="/shop">Keep Shopping</a> </h1>
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment" >
                       {
                            auth.user ?
                            <button className="main-button">Procced Checkout</button>
                            :
                            <button className="main-button">LogIn to Procced</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;