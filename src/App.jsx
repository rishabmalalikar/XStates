import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");


  useEffect(() => {
    axios
      .get("https://location-selector.labs.crio.do/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);


  useEffect(() => {
    if (country) {
      axios
        .get(`https://location-selector.labs.crio.do/country=${country}/states`)
        .then((res) => {
          setStates(res.data);
          setState("");   
          setCities([]);  
        })
        .catch((err) => console.error(err));
    }
  }, [country]);

 
  useEffect(() => {
    if (country && state) {
      axios
        .get(
          `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setCity(""); // reset
        })
        .catch((err) => console.error(err));
    }
  }, [state]);

  return (
    <>
      <h1>Select Location</h1>


      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

     
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}

export default App;