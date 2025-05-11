import { useState } from "react";
import ShowCountry from "./ShowCountry";

const Display = ({ countries }) => {
  const [expanded, setExpanded] = useState({});

  const toggleShow = (countryName) =>
    setExpanded((prev) => ({ ...prev, [countryName]: !prev[countryName] }));

  if (!countries || countries.length === 0) {
    return null;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => {
          const name = country.name.common;
          const isExpanded = expanded[name];
          return (
            <div key={name} style={{ marginBottom: "1em" }}>
              <strong>{name}</strong>{" "}
              <button onClick={() => toggleShow(name)}>
                {isExpanded ? "Hide" : "Show"}
              </button>
              {isExpanded && (
                <div style={{ marginTop: "0.5em", paddingLeft: "1em" }}>
                  <ShowCountry country={country} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <ShowCountry country={countries[0]} />;
  }
};

export default Display;
