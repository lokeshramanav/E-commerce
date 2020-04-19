import React from 'react';

export const ShowImage = ({item})=>{
    return (<div className="productImage">
        <img src={`/api/product/product/photo/${item._id}`} alt={item.name} className="mb-3" style={{maxHeight:"100%", maxWidth: "100%"}}/>
    </div>);
}