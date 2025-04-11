const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id, person.name)}>
        Delete
      </button>
    </div>
  );
};

export default Person;
