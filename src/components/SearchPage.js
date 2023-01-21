import React, { useEffect, useState } from "react";
import { search, getAll } from "../BooksAPI.js";
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
      alert(`a word`);
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
          SetResults([]);
          alert(Results[5].imageLinks.smallThumbnail);
        });
    } else {
      SetIsSearching(true);
      SetResults([]);
      SetNoResult(false);
      getAll().then((data) => {
        SetIsSearching(false);
        SetNoResult(false);
        if (data) SetResults(data);
        else SetResults([]);
      });
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => setShowSearchpage(!showSearchPage)}
        >
          Close
        </a>
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
          <h4 style={{ textAlign: "center" }}>No Search Results Found</h4>
        )}
        {IsSearching && (
          <h4 style={{ textAlign: "center" }}>Getting Data...</h4>
        )}
        <ol className="books-grid">
          {Results !== undefined &&
            Results !== null &&
            Results.map((b, i) => (
              <Book
                BackgroundImage={
                  b !== undefined &&
                  (b !== null) & (b.imageLinks.thumbnail != undefined) &&
                  b.imageLinks.thumbnail != null
                    ? b.imageLinks.thumbnail
                    : ""
                }
                BookTitle={b.title}
                BookAuthors={b.authors}
                key={i}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
