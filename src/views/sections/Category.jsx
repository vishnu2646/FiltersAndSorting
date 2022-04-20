import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Category = (props) => {

    const url = "https://mocki.io/v1/787c827f-0465-40bd-899c-16c5c4a3d0e1"
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [checked, setChecked] = useState([])
    const [visibility, setVisibility] = useState(10);

    const fetchCategories = async() => {
        const categoriesResponse = await axios.get(url)
        const categoriesData = await categoriesResponse.data.filters.primaryFilters[6].filterValues;
        setCategories(categoriesData.slice(1,visibility));
        setAllCategories(categoriesData);
    }

    useEffect(() => {
        fetchCategories()
    },[])

    useEffect(() => {
        setCategories(allCategories.slice(1,visibility));
    },[visibility]);

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked);

        props.handleFilters(newChecked);
    }

    return (
        <div>
            {
                categories && categories.length > 0 ?
                categories.map((category, index) => (
                    <div className='form-check' key={index}>
                        <input
                            className='form-check-input'
                            type="checkbox"
                            id={category.id}
                            onChange={() => handleToggle(category.id)}
                            checked={(checked.indexOf(category.id) === -1) ? false : true}
                        />
                        <label htmlFor={category.id}>{category.id} <span>({category.count})</span></label>
                    </div>
                )):
                <></>
            }
            <p 
                className='more' 
                onClick={()=>setVisibility(visibility => visibility + 10)}
                style={{
                    color:"red",
                    cursor:"pointer"
                }}
            >
                + {allCategories.length - visibility} More
            </p>
        </div>
    )
}

export default Category