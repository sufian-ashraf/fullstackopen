import { useState, useEffect } from "react";
import personService from "./services/personService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [eventMessage, setEventMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'
  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (newPerson) => {
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (
      existingPerson &&
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      return personService
        .update(existingPerson.id, {
          ...existingPerson,
          number: newPerson.number,
        })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== updatedPerson.id ? person : updatedPerson
            )
          );
          setEventMessage(`Updated ${newPerson.name}`);
          setMessageType("succes");
          setTimeout(() => {
            setEventMessage(null);
            setEventMessage(null);
          }, 1000);
        })
        .catch(() => {
          setEventMessage(
            `${newPerson.name} has already been removed from server`
          );
          setMessageType("error");
          setTimeout(() => {
            setEventMessage(null);
            setMessageType(null);
          }, 1000);
        });
    }

    return personService.create(newPerson).then((returnedPerson) => {
      setEventMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setEventMessage(null);
      }, 1000);
      setPersons([...persons, returnedPerson]);
    });
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={eventMessage} type={messageType} />
      <Filter
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm persons={persons} onAddPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
