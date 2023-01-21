import React from "react";

const Book = ({ BackgroundImage, BookShelf, BookTitle, BookAuthors }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${BackgroundImage})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select>
              <option value={BookShelf} disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{BookTitle}</div>
        <div className="book-authors">{BookAuthors}</div>
      </div>
    </li>
  );
};

export default Book;
