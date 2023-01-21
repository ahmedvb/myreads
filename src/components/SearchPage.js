import React, { useEffect, useState } from "react";
import { search } from "../BooksAPI.js";
import Book from "./Book.js";
const SearchPage = ({ showSearchPage, setShowSearchpage }) => {
  const [SearchedWord, SetSearchedWord] = useState("");
  const [NoResult, SetNoResult] = useState(false);
  const [IsSearching, SetIsSearching] = useState(false);
  const [Results, SetResults] = useState([]);
  useEffect(() => {
    ToSearch();
  }, [SearchedWord]);
  const ToSearch = () => {
    if (SearchedWord.trim().length > 0) {
      SetIsSearching(true);
      SetResults([]);
      SetNoResult(false);
      search(SearchedWord)
        .then((data) => {
          SetIsSearching(false);
          if (!data.error) {
            SetNoResult(false);
            SetResults(data);
          } else {
            SetNoResult(true);
            SetResults([]);
          }
        })
        .catch((e) => {
          SetNoResult(true);
          SetIsSearching(false);
          SetResults([]);
        });
    } else {
      SetIsSearching(false);
      SetResults([]);
      SetNoResult(false);
      /*
      getAll().then((data) => {
        SetIsSearching(false);
        SetNoResult(false);
        if (data) SetResults(data);
        else SetResults([]);
      });
*/
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button
          className="close-search"
          onClick={() => setShowSearchpage(!showSearchPage)}
        >
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={SearchedWord}
            onChange={(e) => {
              SetSearchedWord(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        {NoResult && (
          <h3 style={{ textAlign: "center", color: "#0000aa" }}>
            No Search Results Found
          </h3>
        )}
        {IsSearching && (
          <h3 style={{ textAlign: "center", color: "red" }}>Getting Data...</h3>
        )}
        <ol className="books-grid">
          {Results !== undefined &&
            Results !== null &&
            Results.map((b, i) => {
              let bg = "";
              if (b.imageLinks)
                if (b.imageLinks.thumbnail) bg = b.imageLinks.thumbnail;
              return (
                <Book
                  BackgroundImage={bg}
                  BookTitle={b.title}
                  BookAuthors={b.authors}
                  key={i}
                />
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
