
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
