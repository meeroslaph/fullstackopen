import Person from "./Person.jsx";

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          <Person person={person} handleDelete={handleDelete} />
        </div>
      ))}
    </>
  );
};

export default Persons;
