import { useState, useEffect } from 'react'
import "./index.css"
import personsService from "./services/persons"
import Search from "./components/Search"
import PersonForm from "./components/PersonForm"
import Numbers from "./components/Numbers"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      id: (persons.length + 1).toString()
    }

    const existingPerson = persons.find(person => person.name == newName)

    if (existingPerson) {
      if (window.confirm(`${newName} has already been added to the notebook, replace the old number with the new one?`)) {
        personsService.update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNotification({
              message: `Changed ${returnedPerson.name}`,
              isError: false
            })
          })
          .catch(error => {
            setNotification({
              message: `Information of ${newName} has already been removed from the server`,
              isError: true
            })

            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
      return
    }

    personsService.create(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNotification({
          message: `Added ${newPerson.name}`,
          isError: false
        })
        setNewName('')
        setNewNumber('')
      })


  }

  const getFilteredPersons = () => {
    // Filter the people based on the filter provided, making it lower case so its case insensitive
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  }

  if (addName != null) {
    setTimeout(() => {
      setNotification(null)
    }, 10000)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification === null ? null : notification.message} isError={notification === null ? null : notification.isError} />
      <Search onChange={handleFilterChange} filter={filter} />
      <PersonForm onSubmit={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Numbers persons={getFilteredPersons()} handleOnClick={handleDelete} />
    </div>
  )
}

export default App