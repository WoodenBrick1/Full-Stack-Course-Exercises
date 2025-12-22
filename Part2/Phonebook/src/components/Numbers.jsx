
const Numbers = ({ persons, handleOnClick }) => {
    return (
        <div>
            {persons.map(person => <p key={person.id}>{person.name} {person.number}
                <button onClick={() => { handleOnClick(person) }}>Delete</button>
            </p>)}
        </div>
    )
}

export default Numbers;