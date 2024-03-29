import React , {useState, useEffect} from 'react';
import Layout from './layout';
import {Card} from './card';
import {getCategories} from './apiMain';
import Checkbox from './checkbox';
import {prices} from './fixedPrices';
import RadioBox from './radioBox'
import {getProductsByFilter} from './apiMain';


const Shop = ()=>{
    const [myFilters, setMyFilters]= useState({
        filters: {category: [], price:[]}
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = ()=>{
        getCategories().then(data=>{
            if(data.error){
                setError(data.error)
            }
            else {setCategories(data.data)}
        });
    };

    useEffect(()=>{
        init();
        loadFilteredResults(skip , limit, myFilters)
    },[])

    const loadFilteredResults = (newFilters)=>{
        getProductsByFilter(skip, limit, newFilters)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        });
    }
    const loadMore = () => {
        let toSkip = skip + limit;
        getProductsByFilter(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters);
        setMyFilters(newFilters);

    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    

    return (
        <Layout title="Shop Page"
            description="Shop and find pens"
            className="container-fluid">
            <div className="row">
                <div className="col-4">
                <h4>Filter by Categories</h4>
                <ul>
                   <Checkbox categories={categories}  handleFilters={filters =>
                    handleFilters(filters, "category")
                }/>
                   </ul>

                   <h4>Filter by Price</h4>
                   <div>
                      <RadioBox prices={prices}  handleFilters={filters =>
                       handleFilters(filters, "price")
                   }/>
                      </div>
                </div>
                <div className="col-8">
                <h2 className="mg-4"></h2>
                <div className="row">
                {
                    filteredResults.map((product, i)=>{
                    return (
                        <div key={i} className="col-4 mb-3">
                            <Card  product={product}/>
                            </div>
                        )
                })}
                </div>
                <hr/>
                {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
}

export default Shop;