// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     title: "Book One",
    //     author: "John Depp",
    //     isbn: "425553",
    //   },
    //   {
    //     title: "Book Two",
    //     author: "Chris Gayle",
    //     isbn: "4254765",
    //   },
    // ];
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      // Remove Book from Store
      Store.removeBook(el.parentElement.previousElementSibling.textContent);
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    // div.innerHTML = `${message}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form  = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(),
    3000);
  }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(isbn /*primary key */) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
                localStorage.setItem("books", JSON.stringify(books));
            }
        })
    }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form"),
  addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const isbn = document.getElementById("isbn");

    // Validate
    if (title.value === "" || author.value === "" || isbn.value === "") {
        // Alert
      UI.showAlert("Please fill in all fields!", "danger");
    } else {
      const book = new Book(title.value, author.value, isbn.value);
      // console.log(book);
      UI.addBookToList(book);
      // Add Book to Store
      Store.addBook(book);
      // Alert
      UI.showAlert("Book Added", "success")
      // Clearing Fields
      title.value = "";
      author.value = "";
      isbn.value = "";
    }
  });

//Event: Remove a Book
document.getElementById("book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  /* // Remove Book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent); */
  //   -> added in UI.deletebook because only works when it is delete btn

  // Alert
  UI.showAlert("Book Removed", "success");
});