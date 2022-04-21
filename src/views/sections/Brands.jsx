import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Brands = (props) => {

    const url = "https://mocki.io/v1/787c827f-0465-40bd-899c-16c5c4a3d0e1"
    const [brands, setBrads] = useState([]);
    const [allBrands,setAllBrands] = useState([]);
    const [checked, setChecked] = useState([])
    const [allChecked, setAllChecked] = useState(false);
    const [visibility,setVisibility] = useState(10);
    const [checkedState,setCheckedState] = useState([]);

    const fetchBrands = async() => {
        const response = await axios.get(url);
        const brandsData = await response.data.filters.primaryFilters[2].filterValues;
        const brandNames  = brandsData.map(b=>b.id)
        setBrads(brandNames.slice(0,visibility));
        setCheckedState(new Array(brandNames.length).fill(false))
        setAllBrands(brandNames);
    }

    useEffect(() => {
        fetchBrands();
    },[]);

    useEffect(() => {
        setBrads(allBrands.slice(0,visibility));
    },[visibility]);
;


    const handleToggle = (value) => {

        // const currentIndex = checked.indexOf(value);
        // const newChecked = [...checked];
        
        // if(currentIndex === -1){
        //     newChecked.push(value)
        // }else{
        //     newChecked.splice(currentIndex,1)
        // }
        // setChecked(newChecked);

        checkedState[value] = !checkedState[value]
        const tempChecked = []
        for(let i=0;i < checkedState.length;i++){
            if(checkedState[i]){
                tempChecked.push(allBrands[i])
            }
        }

        setCheckedState([...checkedState])
        setChecked([...tempChecked])
        props.handleFilters(tempChecked)

    }

    useEffect(()=>{
        setCheckedState(new Array(allBrands.length).fill(allChecked))
        const tempChecked = allChecked ? [...allBrands] : []
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
                brands && brands.length > 0 ? 
                brands.map((brand, index) => (
                    <div className='form-check' key={index}>
                        <input
                            className='form-check-input'
                            type="checkbox"
                            id={brand}
                            onChange={() => handleToggle(index)}
                            checked={checkedState[index]}
                            // checked={checked.indexOf(brand.id) ? false : true}
                        />
                        <label htmlFor={brand}>{brand} </label>
                    </div> 
                ))
                : 
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
                    +{allBrands.length - visibility} More
                </p>
        </div>

    )
}

export default Brands