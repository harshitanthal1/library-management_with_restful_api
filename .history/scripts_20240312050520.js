let books = [
    { id: 1, title: "Book 1", author: "Author 1", status: "available" },
    { id: 2, title: "Book 2", author: "Author 2", status: "borrowed" },
    { id: 3, title: "Book 3", author: "Author 3", status: "available" }
];

function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <strong>Title:</strong> ${book.title} <br>
            <strong>Author:</strong> ${book.author} <br>
            <strong>Status:</strong> ${book.status} <br>
            <button onclick="borrowReturnBook(${book.id})">${book.status === "available" ? "Borrow" : "Return"}</button>
            <button onclick="updateBook(${book.id})">Update</button>
            <button onclick="deleteBook(${book.id})">Delete</button>
        `;
        bookList.appendChild(bookElement);
    });
}

function addBook(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const newBook = { id: books.length + 1, title: bookTitle, author: bookAuthor, status: "available" };
    books.push(newBook);
    displayBooks();
    document.getElementById("addBookForm").reset();
}

function borrowReturnBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        book.status = book.status === "available" ? "borrowed" : "available";
        displayBooks();
    }
}

function updateBook(bookId) {
    alert("Update book with ID: " + bookId);
}

function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    displayBooks();
}

displayBooks();

document.getElementById("addBookForm").addEventListener("submit", addBook);
