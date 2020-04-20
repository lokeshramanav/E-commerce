import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { read , listRelated } from "./apiMain";
import {Card} from "./card";

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState({});
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                listRelated(data.product._id)
                .then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data);
                    }
                });
                setProduct(data.product);
                
            }
        });
    };

    

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <div className="row">
            <div className="col=8">
                { product && product.description && (
                    <Card product={product} showViewProductButton={false} />
                )}
                </div>
                <div className="col=4">
                <h4>Related Products</h4>
                {
                    // relatedProduct.map((p, i) => (
                    //     <div className="mb-3">
                    //         <Card key={i} product={p} />
                    //     </div>
                    // ))
                    // console.log("this is related product", relatedProduct)
                }
                   
                
                </div>
            </div>
        </Layout>
    );
};

export default Product;
