
const FilterSearch = ({ filter, onChange }) => {
    return (
        <div>
            find countries <input onChange={onChange} value={filter} />
        </div>)
}

export default FilterSearch