import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

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
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewPhone("");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h3>Add new contact</h3>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
