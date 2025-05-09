import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setCountries([]);
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCountries(filteredCountries);
      })
      .catch(() => setCountries([]));
  }, [searchQuery]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  return (
    <div>
      <div>
        find countries{" "}
        <input value={searchQuery} onChange={handleSearchChange} />
      </div>
      <Display countries={countries} />
    </div>
  );
};

export default App;
