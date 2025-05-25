import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { User } from "../../types/users";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleInputTextChange = (inputText: string) => {
    setInputText(inputText);
    fetchData(inputText);
  };
  
  const fetchData = (text: string) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const matchingUsers = json.filter((user: User) => {
          return (
            text && user && user.name && user.name.toLowerCase().includes(text.toLowerCase())
          );
        });
        setMatchingUsers(matchingUsers);
      });
  };

  const handleUserNameSelection = (userName: string) => {
    setSelectedUserName(userName);
    alert(`You selected ${selectedUserName}!`);
  };

  return (
    <>
      <div className={styles.input_wrapper}>
        <FaSearch className={styles.search_icon} />
        <input
          placeholder="Type to search..."
          className={styles.input}
          value={inputText}
          onChange={(e) => handleInputTextChange(e.target.value)}
        />
      </div>
      {matchingUsers && matchingUsers.length > 0 ? (
        <div className={styles.results_list}>
          {matchingUsers.map((user: User, id: number) => {
            return (
              <div
                key={id}
                className={styles.search_result}
                onClick={() => {
                  handleUserNameSelection(user.name);
                }}
              >
                {user.name}
              </div>
            );
          })}
        </div>
      ) : (
        inputText &&
        inputText.length > 0 && (
          <div className={styles.no_results}>Résultats introuvables</div>
        )
      )}
    </>
  );
};

export default SearchBar;
