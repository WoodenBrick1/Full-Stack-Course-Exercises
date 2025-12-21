const Field = ({ onChange, newInput, name }) => <div>
    {name}: <input onChange={onChange} value={newInput} />
</div>

const PersonForm = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <Field onChange={props.handleNameChange} newInput={props.newName} name="name" />
            <Field onChange={props.handleNumberChange} newInput={props.newNumber} name="number" />

            <div>
                <button type="submit">add</button>
            </div>
        </form>)
}

export default PersonForm;