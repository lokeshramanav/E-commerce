import queryString from 'query-string';

  export const getProducts =( sortBy ) =>{
    return fetch(`/api/product//product/listProducts?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET"})
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log( "there is an error in Product Creation: " + err);
      });
  } ;

  export const getCategories = ()=>{

    return fetch ("/api/category/listCategories", {
        method: "GET",
      headers:{
        Accept: "application/json"
      } })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log( "there is an error in listing category: " + err);
        })
}

export const getProductsByFilter = (skip, limit, filters = {}) => {
  const data = {
      limit,
      skip,
      filters
  };
  return fetch("/api/product//products/by/search", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};

export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`/api/product/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (productId)=>{
    return fetch(`/api/product/${productId}`,{
        method:"GET"
    })
    .then(response=>{return response.json()})
    .catch(err=>console.log(err))
}

export const listRelated = (productId)=>{

    return fetch (`/api/product/product/relatedProducts/${productId}`, {
        method: "GET"
     })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log( "there is an error in related Products: " + err);
        })
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`api/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`api/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {


            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`api/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
