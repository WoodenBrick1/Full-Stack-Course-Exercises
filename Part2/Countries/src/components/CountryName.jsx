
const CountryName = ({ name, onClick }) => {
    return <p>{name} <button onClick={onClick}>Show</button></p>
}

export default CountryName