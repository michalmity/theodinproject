const myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    let str = title + ", " + author + ", " + pages + ", ";

    if (!read) {
      return str + "not read yet";
    }
    else {
      return str + "already red";
    }
  };
}

function addBookToLibrary(title, author, pages, read) 
{
  let id = crypto.randomUUID();
  let book = new Book(id, title, author, pages, read)
  myLibrary.push(book);
  //console.log(book.info());
  //console.log(myLibrary.length);
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);


function displayBooks() {
  console.log("Triggered displayBooks function");
  let table = document.getElementById("table");

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let newRow = table.insertRow();

    // Insert cells for each book property
    let idCell = newRow.insertCell(0);
    let titleCell = newRow.insertCell(1);
    let authorCell = newRow.insertCell(2);
    let pagesCell = newRow.insertCell(3);
    let readCell = newRow.insertCell(4);
    let deleteCell = newRow.insertCell(5);

    // Populate cells with book data
    idCell.textContent = book.id;
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    // Add read button
    let readButton = document.createElement("button");
    readButton.textContent = book.read ? "Read" : "Not Read";
    readButton.onclick = function () {
      changeBookStatus(book.id);
      readButton.textContent = book.read ? "Read" : "Not Read";
    };
    readCell.appendChild(readButton);


    // Add delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteBook(book.id);
      table.deleteRow(newRow.rowIndex);
    };
    deleteCell.appendChild(deleteButton);
  }
}

function openModal()
{
  console.log("Triggered openModal function")
  const modal = document.getElementById("modal");
  if(window.getComputedStyle(modal).display === "none")
  {
    modal.style.display = "flex";
  }
  else
  {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form");

  if (formElement) {
    formElement.onsubmit = function (e) {
      addBookFromModal(e);
    };
  } else {
    console.error("Form element with ID 'form' not found.");
  }
});

function addBookFromModal(e)
{
  e.preventDefault();

  const i_Title = document.getElementById("i-title").value;
  const i_Author = document.getElementById("i-author").value;
  const i_Pages = document.getElementById("i-pages").value;
  const i_Read = document.getElementById("i-read").checked;

  console.log(i_Read);

  addBookToLibrary(i_Title, i_Author, i_Pages, i_Read);
}

function deleteBook(id) 
{
  let position = myLibrary.findIndex((book) => book.id === id);
  if (position !== -1) 
    {
    myLibrary.splice(position, 1);
    console.log(`Book with ID ${id} deleted.`);
  } else 
  {
    console.error(`Book with ID ${id} not found.`);
  }
}

function changeBookStatus(id)
{
  let bookIndex = myLibrary.findIndex((book) => book.id === id);
  if (bookIndex !== -1) 
  {
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    console.log(`Book with ID ${id} read status changed to ${myLibrary[bookIndex].read ? "Read" : "Not Read"}.`);
  }
  else 
  {
    console.error(`Book with ID ${id} not found.`);
  }
}