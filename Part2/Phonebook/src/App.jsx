import { useState, useEffect } from 'react'
import personsService from "./services/persons"
import Search from "./components/Search"
import PersonForm from "./components/PersonForm"
import Numbers from "./components/Numbers"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleDelete = person => {
    if (!window.confirm(`Do you want to delete ${person.name}?`)) {
      return
    }

    personsService.deletePerson(person.id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
  }

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const existingPerson = persons.find(person => person.name == newName)
    if (existingPerson) {
      if (window.confirm(`${newName} has already been added to the notebook, replace the old number with the new one?`)) {
        personsService.update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          })
      }
      return
    }

    personsService.create(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
      })


  }

  const getFilteredPersons = () => {
    // Filter the people based on the filter provided, making it lower case so its case insensitive
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onChange={handleFilterChange} filter={filter} />
      <PersonForm onSubmit={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Numbers persons={getFilteredPersons()} handleOnClick={handleDelete} />
    </div>
  )
}

export default App