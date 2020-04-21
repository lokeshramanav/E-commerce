import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Card from "./card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getBraintreeClientToken , processPayment , createOrder } from "./apiMain";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import {emptyCart} from './cartService';


const Checkout = ({ products }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error:'',
        instance:{},
        address:''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            console.log(data);
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };


    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };
    const showDropIn = () => (
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button className="btn btn-success btn-block" onClick={buy}>PAY</button>
                </div>
            ) : null}
        </div>
    );

    let deliveryAddress = data.address;

    const buy = () => {
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                processPayment(userId, token, paymentData)
                    .then(response => {

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };
                        createOrder(userId , token , createOrderData)
                        .then(response=>{console.log(response)
                            setData({ ...data, success: true });
                            emptyCart(()=>{
                                console.log("payment success and empty cart")
                                window.location.reload(false);
                            })
                        })
                        .catch(error => console.log(error))


                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                setData({ ...data, error: error.message });
            });
    };

    const showSuccess = success => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            Thanks! Your payment was successful!
        </div>
    );

    const showError = error => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
