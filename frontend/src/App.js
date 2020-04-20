import React , {useState, useEffect} from 'react';
import Layout from './main/layout';
import{getProducts} from './main/apiMain';
import {Card} from './main/card';
import Search from './main/search';



const App = ()=>{

  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setProductsBySell(data);
        }
    });
};

const loadProductsByArrival = () => {
  getProducts("createdAt").then(data => {
      if (data.error) {
          setError(data.error);
      } else {
          setProductsByArrival(data);
      }
  });
};

useEffect(()=>{
  loadProductsByArrival()
  loadProductsBySell()
},[])

  return (<Layout title="Home Page" description="My React Ecommnerce app" className="container-fluid">

<Search/>
  <h2 className="mb-4">Best Sellers</h2>
<div className="row">
{productsBySell.map((product, i)=>{
  return (<div key={i} className="col-4 mb-3">
  <Card  product={product}/>
  </div>)
})}
</div>


<h2 className="mb-4">New Arrivals</h2>
<div className="row">
{productsByArrival.map((product, i)=>{
  return (<div key={i} className="col-4 mb-3">
    <Card  product={product}/>
    </div>)
})}
</div>

  </Layout>);
}

export default App;
