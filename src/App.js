import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }

    const countriesToShow = filter
        ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        : []
    
    const countriesToMap = (countriesToShow.length > 10)
        ? [{name: {common: 'Too many matches, specify another filter'}}]
        : countriesToShow

    return (
        <>
            <div>find countries <input value={filter} onChange={handleFilterChange} /></div>
            <div>
                {countriesToMap.map(country =>
                    <p key={countriesToMap.indexOf(country)}>{country.name.common}</p>    
                )}
            </div>
        </>
    )
}

export default App
