//need to send the user id token and category


export const createCategory =( userId, token, category ) =>{
    return fetch(`/api/category/create/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(category)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log( "there is an error in Category: " + err);
      });
  } ;


  export const createProduct =( userId, token, product ) =>{
    return fetch(`/api/product/create/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          Authorization:`Bearer ${token}`
      },
      body: product
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log( "there is an error in Product Creation: " + err);
      });
  } ;


export const getCategories = ()=>{

    return fetch ("/api/category/listCategories", {
        method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log( "there is an error in listing category: " + err);
        })
}

export const listOrders = (userId, token) => {
    return fetch(`api/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
    return fetch(`api/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`api/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
