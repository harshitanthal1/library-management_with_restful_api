const apiUrl = 'http://localhost:3000/books';

// Function to fetch and display books
async function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();
        
        books.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <strong>Title:</strong> ${book.title} <br>
                <strong>Author:</strong> ${book.author} <br>
                <strong>Status:</strong> ${book.status} <br>
                <button onclick="borrowReturnBook(${book._id}, '${book.status}')">${book.status === "available" ? "Borrow" : "Return"}</button>
                <button onclick="updateBook('${book._id}', '${book.title}', '${book.author}')">Update</button>
                <button onclick="deleteBook('${book._id}')">Delete</button>
            `;
            bookList.appendChild(bookElement);
        });
    } catch (err) {
        console.error(err);
    }
}

// Function to add a book
async function addBook(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: bookTitle, author: bookAuthor })
        });
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        displayBooks();
        document.getElementById("addBookForm").reset();
    } catch (err) {
        console.error(err);
    }
}

// Function to borrow or return a book
async function borrowReturnBook(bookId, currentStatus) {
    const newStatus = currentStatus === "available" ? "borrowed" : "available";

    try {
        const response = await fetch(`${apiUrl}/${bookId}/${newStatus}`, {
            method: 'PUT'
        });
        if (!response.ok) {
            throw new Error('Failed to update book status');
        }
        displayBooks();
    } catch (err) {
        console.error(err);
    }
}

// Function to update a book
async function updateBook(bookId, currentTitle, currentAuthor) {
    const newTitle = prompt("Enter new title:", currentTitle);
    const newAuthor = prompt("Enter new author:", currentAuthor);

    try {
        const response = await fetch(`${apiUrl}/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, author: newAuthor })
        });
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
        displayBooks();
    } catch (err) {
        console.error(err);
    }
}

// Function to delete a book
async function deleteBook(bookId) {
    try {
        const response = await fetch(`${apiUrl}/${bookId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        displayBooks();
    } catch (err) {
        console.error(err);
    }
}

// Initial display of books
displayBooks();

// Event listener for adding a book
document.getElementById("addBookForm").addEventListener("submit", addBook);
