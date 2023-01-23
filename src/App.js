//Ahmad Hammouda app
import "./App.css";
import { useEffect, useState } from "react";
import SearchPage from "./components/SearchPage";
import ListBooksPage from "./components/ListBooksPage";
import { getAll } from "./BooksAPI.js";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [IsSearching, SetIsSearching] = useState(true);
  const [Results, SetResults] = useState([]);
  const UpdateShelf = (Book, shelf) => {
    const newResults = Results.map((b) => {
      if (b.id === Book.id) {
        Book.shelf = shelf;
        SetIsSearching(true);
        /*
        update(Book, shelf)
          .then((data) => {
            SetIsSearching(false);
            if (data) {
              SetResults(data);
              SetResults_currentlyReading(
                Results.filter((book) => book.shelf === "currentlyReading")
              );
              SetResults_wantToRead(
                Results.filter((book) => book.shelf === "wantToRead")
              );
              SetResults_read(Results.filter((book) => book.shelf === "read"));
            }
          })
          .catch(() => {
            SetIsSearching(false);
          });
*/
        return Book;
      } else {
        //update(Book, shelf);
        return b;
      }
    });
    SetResults(newResults);
  };
  //const [Results_currentlyReading, SetResults_currentlyReading] = useState([]);
  //const [Results_wantToRead, SetResults_wantToRead] = useState([]);
  //const [Results_read, SetResults_read] = useState([]);
  useEffect(() => {
    getAll()
      .then((data) => {
        SetIsSearching(false);
        if (data) {
          SetResults(data);
          //SetResults_currentlyReading(
          //Results.filter((book) => book.shelf === "currentlyReading")
          //);
          //SetResults_wantToRead(
          //Results.filter((book) => book.shelf === "wantToRead")
          //);
          //SetResults_read(Results.filter((book) => book.shelf === "read"));
        }
      })
      .catch(() => {
        SetIsSearching(false);
        SetResults([]);
      });
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
        />
      ) : (
        <ListBooksPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
          IsSearching={IsSearching}
          Results={Results}
          UpdateShelf={UpdateShelf}
        />
      )}
    </div>
  );
}

export default App;
