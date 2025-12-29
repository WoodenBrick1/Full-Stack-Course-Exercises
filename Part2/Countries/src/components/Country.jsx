import { useEffect, useState } from "react"
import weatherService from "../services/weather"


const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2)
}

const WeatherInfo = ({ temp, wind, icon }) => {

    const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (
        <div>
            <p>Temperature {toCelsius(temp)} Celsius</p>
            <img src={imgUrl} alt="weather icon" />
            <p>Wind {wind} m/s</p>
        </div>
    )
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
            .getCountryWeather(country.latlng[0], country.latlng[1])
            .then(initialWeather => {

                setWeather(initialWeather)
            })
    }, [country])

    return (
        <div className="country">
            <h1>{country.name.common}</h1>

            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(value =>
                    <li key={value}>{value}</li>
                )}
            </ul>
            <img src={country.flags.png} />

            <h2>Weather in {country.name.common}</h2>
            {weather == null ? null : <WeatherInfo temp={weather.main.temp} wind={weather.wind.speed}
                icon={weather.weather[0].icon} />}
        </div>
    )
}



export default Country