import Person from "./Person.jsx";

const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
};

export default Persons;
