import React from "react";

const Book = ({
  //Id,
  //BackgroundImage,
  //BookShelf,
  //BookTitle,
  //BookAuthors,
  Book,
  UpdateShelf,
}) => {
  //const [SelectedValue, SetSelectedValue] = useState(Book.BookShelf);
  //console.log("the book is : ", Book);
  let bg = "";
  if (Book.imageLinks)
    if (Book.imageLinks.thumbnail) bg = Book.imageLinks.thumbnail;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${bg})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={Book.shelf}
              onChange={(e) => UpdateShelf(Book, e.target.value)}
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
        <div className="book-title">{Book.title}</div>
        <div className="book-authors">{Book.authors}</div>
      </div>
    </li>
  );
};

export default Book;
