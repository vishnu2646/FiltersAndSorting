import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './ProductList.css'
import Product from '../Product'
import Genders from '../sections/Genders'
import Brands from '../sections/Brands'
import Category from '../sections/Category'
import { parseCurrencyString } from '../../utils/utils'

const ProductList = () => {

    const url = "https://mocki.io/v1/787c827f-0465-40bd-899c-16c5c4a3d0e1";
    const [products, setProducts] = useState([]);
    const [allProducts,setAllproducts] = useState([]);
    const [productPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [sortdata, setSortData] = useState([]);
    const [sortOption, setSortOption] = useState();
    const [suggestions, setSuggestions] = useState([]);

    const fetchProducts = async() => {
        const response = await axios.get(url)
        const data = await response.data.products
        setProducts(data)
        setAllproducts(data)
        setTotalProducts(data.length);
    }

    const fetchSort = async() => {
        const sortResponse = await axios.get(url)
        const sortCategory = await sortResponse.data.sortOptions
        setSortData(sortCategory)
    }

    useEffect(() => {
        fetchProducts()
        fetchSort()
    },[]);

    // pagination
    const indexOfLastProduct = currentPage + productPerPage;
    const indexOfFirstProduct = indexOfLastProduct- productPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginationNumber = (pageNum) => setCurrentPage(pageNum);
    const previousPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);

    const showPagination = () => {
        return(
            <Product
                productPerPage={productPerPage}
                totalProducts={totalProducts}
                currentPage={currentPage}
                paginate={paginationNumber}
                previousPage={previousPage}
                nextPage={nextPage}
            />
        );
    }

    // Brand Filters
    const handleFilters = (filters) => {
        if (filters.length === 0){
            setProducts([...allProducts])
        }
        else{
            const temp = allProducts.filter((product)=>{

                return (filters.includes(product.brand) || filters.includes(product.category))
                // for(const filter of filters){
                //     if (filter === product.brand){
                //         return true;
                //     }else if(filter === product.category){
                //         return true
                //     }
                // }
            })
            setProducts([...temp])
        }
    }

    // Gender Filters
    const handleGenderFilter = (value) => {
        if(value === null){
            setProducts([...allProducts])
        }else if(value === "boys girls" || value === "men women"){
            const temp = allProducts.filter((product) => {
                let flag = false
                if(product.gender === 'Unisex'){
                    return true
                }
            })
            setProducts([...temp])
        }else{
            const temp = allProducts.filter((product) => {
                let flag = false;
                if(value === product.gender.toLowerCase()){
                    return true
                }
            })
            // sets the filtered data and helps to renders the data
            setProducts([...temp])
        }
    }

    // Sorting
    useEffect(()=>{
        switch (sortOption) {
            case "popularity": // sort based on rating
                allProducts.sort((a,b)=>{
                    if(a.rating > b.rating)
                        return -1
                    if (a.rating < b.rating)
                        return 1
                    return 0; 
                })
                break;
            case "new": // sort based on the Year
                allProducts.sort((a,b) => {
                    return parseInt(b.year) - parseInt(a.year)
                })
                break;

            case "price_desc": // sort based on the price in Descending Order
                allProducts.sort((a,b) => {
                    return b.price - a.price
                })
                break;

            case "price_asc": // sort based on the price in Ascending Order
                allProducts.sort((a,b) => {
                    return a.price - b.price
                })
                break;

            // case "discount":
            //     allProducts.sort((a,b) => {
            //         return b.discount - a.discount
            //     })
            //     break;

            case "discount":
                allProducts.sort((a,b) => {
                    return parseCurrencyString(a.discountDisplayLabel).value - parseCurrencyString(b.discountDisplayLabel).value
                })
                break;
    
            default:
                break;
        }
        setProducts([...allProducts])
    },[sortOption])

    // Product name Filter
    const handleNameFilter = (text) => {
        let matches = []
        if(text.length > 0){
            matches = allProducts.filter(item => {
                const regex = new RegExp(`${text}`,"gi");
                return item.productName.match(regex)
            })
        }
        setSuggestions(matches)
    }

    return (
        <main>
            <Navbar handleNameFilter={val => handleNameFilter(val)}/>
            <div className="content">
                <div className="midsize">Home / <span>Casual Shirts For Men</span></div>
                <div className="midsizeplus padding">
                    Total Products <span> - {products.length} items</span>
                </div>
            </div>
            <div className='product-cateloge'>
                <div className="filter-left">
                    <div className="midsizeplus" style={{padding: "20px 20px"}}>FILTERS</div>
                    <div className="filters">
                        <div className='filter-categories'>
                            <p>Gender</p>
                            <Genders 
                                handleGenderFilter={value => handleGenderFilter(value)}
                            />
                        </div>
                        <div className="filter-categories">
                            <p>Catrories</p>
                            <Category handleFilters={value => handleFilters(value)}/>
                        </div> 
                        <div className="filter-categories">
                            <p>Brands</p>
                            <Brands 
                                handleFilters={filters => handleFilters(filters)}
                            />
                        </div>
                    </div>
                </div>
                <div className="right" style={{width:"100%"}}>
                    <div className="sort">
                            <select name="type" id="type" onChange={e => setSortOption(e.target.value)} className="form-select" style={{height:"40px", width:"220px"}}>
                                <option selected disabled>Sort by : Recommended</option>
                                {
                                    sortdata.length > 0 ? 
                                        sortdata.map((option, index) => <option value={sortdata[index]} key={index} 
                                        selected={sortOption === sortdata[index]}>{sortdata[index]}</option>)
                                    : 
                                    <></>
                                }
                            </select>
                        </div>
                    <div id="products-right">
                        {
                            (suggestions && suggestions.length > 0) ? suggestions.map((suggestion, index) => (
                                <div className="each-product" key={index}>
                                    <div>
                                        <img
                                            src= {suggestion.searchImage}
                                            alt="vnfk"

                                        />
                                        <div className="brand">{suggestion.brand}</div>
                                        <div className="name">{suggestion.productName}</div>
                                        <div className="price">
                                            Rs. {suggestion.price} <span className="line-through">Rs. 649</span>
                                            <span className="discount">{suggestion.discountDisplayLabel}</span>
                                        </div>
                                        <div>
                                            <span>rating: {(suggestion.rating).toFixed(2)}</span>
                                        </div>
                                        <div>
                                            {suggestion.year}
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            currentProducts && currentProducts.length > 0 ? currentProducts.map((item, index) => (
                                <div className="each-product" key={index}>
                                    <div>
                                        <img
                                            src= {item.searchImage}
                                            alt="vnfk"

                                        />
                                        <div className="brand">{item.brand}</div>
                                        <div className="name">{item.productName}</div>
                                        <div className="price">
                                            Rs. {item.price} <span className="line-through">Rs. 649</span>
                                            <span className="discount">{item.discountDisplayLabel}</span>
                                        </div>
                                        <div>
                                            <span>rating: {(item.rating).toFixed(2)}</span>
                                        </div>
                                        <div>
                                            {item.year}
                                        </div>
                                    </div>
                                </div>
                            )) : 
                            <>Loading...</>
                        }
                        <div 
                            className='pagination-container' 
                            style={{
                                margin:"0 auto"
                            }}
                        >
                            {showPagination()}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductList