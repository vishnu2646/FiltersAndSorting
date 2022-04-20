import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Category = (props) => {

    const url = "https://mocki.io/v1/787c827f-0465-40bd-899c-16c5c4a3d0e1"
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [checked, setChecked] = useState([])
    const [visibility, setVisibility] = useState(10);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedState,setCheckedState] = useState([]);

    const fetchCategories = async() => {
        const categoriesResponse = await axios.get(url)
        const categoriesData = await categoriesResponse.data.filters.primaryFilters[6].filterValues;
        const categoryNames  = categoriesData.map(c=>c.id)
        setCategories(categoryNames.slice(0,visibility));
        setCheckedState(new Array(categoryNames.length).fill(false))
        setAllCategories(categoryNames);
    }

    useEffect(() => {
        fetchCategories()
    },[])

    useEffect(() => {
        setCategories(allCategories.slice(0,visibility));
    },[visibility]);

    const handleToggle = (value) => {
        // const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];
        // if(currentIndex === -1){
        //     newChecked.push(value)
        // }else{
        //     newChecked.splice(currentIndex,1)
        // }
        // setChecked(newChecked);

        // props.handleFilters(newChecked);

        checkedState[value] = !checkedState[value]
        const tempChecked = []
        for(let i=0; i<checkedState.length; i++){
            if(checkedState[i]){
                tempChecked.push(allCategories[i])
            }
        }

        setCheckedState([...checkedState])
        setChecked([...tempChecked])
        props.handleFilters(tempChecked)
    }

    useEffect(()=>{
        setCheckedState(new Array(allCategories.length).fill(allChecked))
        const tempChecked = allChecked ? [...allCategories] : []
        setChecked(tempChecked)
        props.handleFilters(tempChecked)
    },[allChecked])

    return (
        <div>
            <div className='form-check'>
                <input
                    className='form-check-input'
                    type="checkbox"
                    id="Select All"
                    checked={allChecked}
                    onChange={()=>setAllChecked(val=>!val)}
                />
                <label htmlFor="Select All">Select All <span> / </span> Clear All</label>
            </div>
            {
                categories && categories.length > 0 ?
                categories.map((category, index) => (
                    <div className='form-check' key={index}>
                        <input
                            className='form-check-input'
                            type="checkbox"
                            id={category.id}
                            onChange={() => handleToggle(index)}
                            checked={checkedState[index]}
                        />
                        <label htmlFor={category}>{category}</label>
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