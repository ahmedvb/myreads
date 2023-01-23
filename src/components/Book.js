import React, { useState } from "react";

const Book = ({
  Id,
  BackgroundImage,
  BookShelf,
  BookTitle,
  BookAuthors,
  UpdateShelf,
}) => {
  const [SelectedValue, SetSelectedValue] = useState(BookShelf);
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
            <select
              defaultValue={SelectedValue}
              onChange={(e) => UpdateShelf(Id, e.value)}
            >
              <option value="move" disabled>
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
