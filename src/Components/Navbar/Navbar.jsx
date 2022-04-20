import React, { useState } from "react";
import './Navbar.css'

const Navbar = (props) => {

    const [searchText, setSearchText] = useState('');
    const handleProductNameSearch = (value) => {
        const searchValue = value
        setSearchText(value)
        props.handleNameFilter(searchValue)
    }
    return (
        <div className="header sticky">
            <div>
                <a href="#">
                    <img
                        src="https://gumlet.assettype.com/afaqs%2F2021-01%2F15f5f827-8e29-4520-af8d-a0f353b8da17%2Fimages.png?auto=format%2Ccompress&w=1200"
                        alt="logo"
                    />
                </a>
            </div>
            <div className="categories">
                <ul>
                    <li className="dropdown-content1 dropdown-content">
                        <a href="">Men</a>
                    </li>
                    <li className="dropdown-content2 dropdown-content">
                        <a href="">Women</a>
                    </li>
                    <li className="dropdown-content3 dropdown-content">
                        <a href="">Kids</a>
                    </li>
                    <li className="dropdown-content4 dropdown-content">
                        <a href="">Home</a>
                    </li>
                    <li className="dropdown-content5 dropdown-content">
                        <a href="">Beauty</a>
                    </li>
                </ul>
            </div>

            <div className="search-div">
                <i className="fas fa-search ms-4"></i>
                <input 
                    type="text" 
                    placeholder="Search for products, brands and more" 
                    onChange={(e) => handleProductNameSearch(e.target.value)}
                />
            </div>

            <div className="nav-last">
                <div>
                    <a href="">
                        <img
                            id="svg"
                            src="https://www.svgrepo.com/show/198180/user-profile.svg"
                            alt=""
                        />
                    </a>

                    <div>Profile</div>
                </div>

                <div>
                    <a href="">
                        <img
                            id="svg"
                            src="https://www.svgrepo.com/show/14970/heart.svg"
                            alt=""
                        />
                    </a>

                    <div>Wishlist</div>
                </div>

                <div>
                    <a href="">
                        <img
                            id="svg"
                            src="https://www.svgrepo.com/show/17522/bag.svg"
                            alt=""
                        />
                    </a>

                    <div>Bag</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
