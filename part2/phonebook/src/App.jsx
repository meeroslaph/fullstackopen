import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification.jsx";
import personsService from "./services/persons.js";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const addPerson = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personsService
          .update(personToUpdate.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Updated number for ${personToUpdate.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(
              `${personToUpdate.name} has already been removed from the server`
            );
            setPersons(
              persons.filter((person) => person.id !== personToUpdate.id)
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added '${personObject.name}'`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(`Failed to add '${personObject.name}'`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Deleted '${name}'`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(`Failed to delete '${name}'`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}
      {errorMessage && <Notification message={errorMessage} type="error" />}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add new contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
