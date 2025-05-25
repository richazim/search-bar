import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { User } from "../../types/users";

const SearchBar = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [selectedName, setSelectedName] = useState("")

  const fetchData = (value: string) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user: User) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  const handleSelect = (selected: string) => {
    setSelectedName(selected)
    alert(`You selected ${selectedName}!`);
}

  return (
    <>
      <div className={styles.input_wrapper}>
        <FaSearch className={styles.search_icon} />
        <input
          placeholder="Type to search..."
          className={styles.input}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>{" "}
      {results && results.length > 0 ? (
        <div className={styles.results_list}>
          {results.map((result: User, id: number) => {
            return (
              <div key={id} className={styles.search_result} onClick={() => {handleSelect(result.name)}}>
                {result.name}
              </div>
            );
          })}
        </div>
      ) : (
        (input && input.length > 0) &&<div className={styles.no_results}>Résultats introuvables</div>
      )}
    </>
  );
};

export default SearchBar;
