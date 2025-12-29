import { useState, useEffect } from "react"
import countriesService from "./services/countries.js"
import FilterSearch from "./components/FilterSearch"
import Country from "./components/Country"
import CountryName from "./components/CountryName"

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [shownCountries, setShownCountries] = useState([])

    useEffect(() => {
        countriesService
            .getAll()
            .then(initialCountries => {
                console.log("Countries got");

                setCountries(initialCountries)
            })
    }, [])

    const handleFilterChange = event => {
        setFilter(event.target.value)

        const filteredCountries = countries.filter(country => country.name.common.includes(event.target.value))

        setShownCountries(filteredCountries.map(country => {
            return {
                ...country,
                shown: false
            }
        }))
    }

    const switchShown = country => {

        setShownCountries(shownCountries.map(arrayCountry =>
            arrayCountry.name.common == country.name.common ?
                {
                    ...country,
                    shown: !country.shown
                } :
                arrayCountry
        ))
    }

    const showContent = () => {
        if (shownCountries.length == 1) {
            return <Country country={shownCountries[0]} />
        }

        if (shownCountries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }

        return shownCountries.map(country => {

            if (!country.shown)
                return <CountryName key={country.name.common} name={country.name.common} onClick={() => switchShown(country)} />
            else
                return <Country key={country.name.common} country={country} />

        })
    }

    return (
        <div>
            <FilterSearch onChange={handleFilterChange} filter={filter} />

            {showContent()}
        </div>)

}

export default App
