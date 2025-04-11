import Person from "./Person.jsx";

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          <Person person={person} />
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
