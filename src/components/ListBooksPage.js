//eslint-disable
import { useEffect, useState, React } from "react";
import { getAll, update } from "../BooksAPI.js";
import Book from "./Book.js";

const ListBooksPage = ({ showSearchPage, setShowSearchpage }) => {
  const [IsSearching, SetIsSearching] = useState(true);
  const [Results, SetResults] = useState([]);
  const [Results_currentlyReading, SetResults_currentlyReading] = useState([]);
  const [Results_wantToRead, SetResults_wantToRead] = useState([]);
  const [Results_read, SetResults_read] = useState([]);
  const UpdateTheShelf = (Book, shelf) => {
    console.log(Book, shelf);
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
  useEffect(() => {
    //const controller = new AbortController();
    //const signal = controller.signal;
    getAll()
      .then((data) => {
        SetIsSearching(false);
        if (data) {
          //console.log(data[0]);
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
        SetResults([]);
      });
    //return () => controller.abort();
  }, [Results, Results_currentlyReading, Results_wantToRead, Results_read]);
  return (
    <div className="list-books">
      {IsSearching && (
        <h2 style={{ textAlign: "center", color: "red" }}>Getting Data ...</h2>
      )}
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {Results_currentlyReading.map((book) => {
                  return (
                    <Book
                      Book={book}
                      key={book.id}
                      UpdateShelf={UpdateTheShelf}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {Results_wantToRead.map((book) => {
                  return (
                    <Book
                      Book={book}
                      key={book.id}
                      UpdateShelf={UpdateTheShelf}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {Results_read.map((book) => {
                  return (
                    <Book
                      Book={book}
                      key={book.id}
                      UpdateShelf={UpdateTheShelf}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => setShowSearchpage(!showSearchPage)} href="a">
          Add a book
        </a>
      </div>
    </div>
  );
};

export default ListBooksPage;
