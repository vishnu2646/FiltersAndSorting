import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Genders = (props) => {

    const url = "https://mocki.io/v1/787c827f-0465-40bd-899c-16c5c4a3d0e1"
    const [genders, setGenders] = useState([]);
    const [selectGenders, setSelectgenders] = useState('');

    const fetchGender = async() => {
        const categoriesResponse = await axios.get(url)
        const categoriesGender = await categoriesResponse.data.filters.primaryFilters[3].filterValues
        setGenders(categoriesGender)
    }

    useEffect(() => {
        fetchGender()
    },[]);

    const handleToggle = (value) => {
        const newChecked = value
        setSelectgenders(value)
        props.handleGenderFilter(newChecked)
    }

    return (
        <div>
            {
                genders && genders.length > 0 ? genders.map((gender, index) => (
                    <div className='form-check' key={index} style={{textTransform:"capitalize"}}>
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="exampleRadios" 
                            id={gender.id} 
                            onChange={() => handleToggle(gender.id)}
                        />
                        <label className="form-check-label" htmlFor={gender.id}>
                            {gender.id}
                        </label>
                    </div>
                )) : <></>
            }
        </div>
    )
}

export default Genders