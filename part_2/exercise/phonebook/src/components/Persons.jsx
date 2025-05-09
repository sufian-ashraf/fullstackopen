const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map((person, index) => (
      <li key={index}>
        {person.name}: {person.number} 
        <button type="submit" onClick={() => deletePerson(person.id)}>delete</button>
      </li>
    ))}
  </ul>
);

export default Persons;
