import React from 'react'
import './ProductList/ProductList.css'

const Product = (props) => {

    const {
        productPerPage,
        totalProducts,
        currentPage,
        paginate,
        previousPage,
        nextPage
    } = props;

    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(totalProducts/productPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <>
            <div className='d-flex justify-content-center flex-wrap'>
                { currentPage !== 1 && (
                    <li 
                        style={{
                            // border:"0px"
                        }}
                    >
                        <button 
                            className='btn btn-primary' 
                            onClick={() => previousPage()} 
                            style={{
                                cursor:"pointer",
                                marginRight: "10px"
                            }}
                        >
                            <i className="fas fa-angles-left"></i>
                        </button>
                    </li>
                )}
                {pageNumbers.map((num) => (
                    <li key={num} className="pgnum ms-2">
                        <p
                            onClick={() => paginate(num)}
                            className="page-link"
                            style={{
                                cursor: 'pointer',
                                backgroundColor: currentPage === num ? "rgba(0,100,255,0.5)" : "",
                                color: currentPage === num ? "#fff" : "#121212"
                            }}
                        >
                            {num}
                        </p>
                    </li>
                ))}
                {pageNumbers.length !== currentPage && (
                    <li 
                        style={{
                            // border:"0px"
                        }}
                    >
                        <button 
                            className='btn btn-primary ms-2' 
                            onClick={() => nextPage()} 
                            style={{
                                cursor:"pointer",
                                marginRight: "10px"
                            }}
                        >
                            <i className="fas fa-angles-right"></i>
                        </button>
                    </li>
                )}
            </div>
        </>
    )
}

export default Product