const bookList = document.getElementById("bookList");

function displayBooks() {
    fetch("/books")
        .then(response => response.json())
        .then(books => {
            bookList.innerHTML = "";
            books.forEach(book => {
                const bookElement = document.createElement("div");
                bookElement.classList.add("book");
                bookElement.innerHTML = `
                    <strong>Title:</strong> ${book.title} <br>
                    <strong>Author:</strong> ${book.author} <br>
                    <strong>Status:</strong> ${book.status} <br>
                    <button onclick="borrowBook('${book._id}')">${book.status === "available" ? "Borrow" : "Return"}</button>
                    <button onclick="deleteBook('${book._id}')">Delete</button>
                `;
                bookList.appendChild(bookElement);
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}

function addBook(event) {
    event.preventDefault();
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    fetch("/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(() => {
        displayBooks();
        document.getElementById("addBookForm").reset();
    })
    .catch(error => console.error("Error adding book:", error));
}

function borrowBook(id) {
    fetch(`/books/${id}/borrow`, { method: "PUT" })
        .then(() => displayBooks())
        .catch(error => console.error("Error borrowing book:", error));
}

function deleteBook(id) {
    fetch(`/books/${id}`, { method: "DELETE" })
        .then(() => displayBooks())
        .catch(error => console.error("Error deleting book:", error));
}

displayBooks();
document.getElementById("addBookForm").addEventListener("submit", addBook);
