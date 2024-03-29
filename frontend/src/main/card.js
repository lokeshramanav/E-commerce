import React ,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {ShowImage} from './showImg';
import moment from 'moment';
import {addItem , updateItem , removeItem}from './cartService';

export const Card = ({product, showViewProductButton = true , showAddToCartButton=true , cartCounter=false , showRemoveProductButton = false})=>{
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                    </button>
                </Link>
            )
        );
    };

    const add2Cart = ()=>{
        addItem(product, () => {
            setRedirect(true);
        });
    }
    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = (showAddToCartButton)=>{
        return (showAddToCartButton &&( <button className="btn btn-outline-warning mt-2 mb-2" onClick={add2Cart}>
        Add to Cart</button>));
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2">
                    Remove Product
                </button>
            )

        );
    };

    const showProdcutQuantity = (qty)=>{
        return qty > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span className="badge badge-primary badge-pill">Out of Stock</span>
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate=>{
        return ( cartUpdate && (
            <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
        ) );
    }

    return(

            <div className="card">
                <div className="card-header name">
                {product.name}
                </div>
                <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product}/>
                    <p className="lead mt-2">{product.description.substring(0,50)}</p>
                    <p className="black-10">{product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">
                    Added on {moment(product.createdAt).fromNow()}</p>
                    {showProdcutQuantity(product.quantity)}
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showCartUpdateOptions(cartCounter)}
                    {showRemoveButton(showRemoveProductButton)}
                </div>
            </div>

    );
}