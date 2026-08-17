const books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        category: "Fiction",
        available: true,
        icon: "📕"
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        available: true,
        icon: "📘"
    },
    {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        available: false,
        icon: "📗"
    },
    {
        id: 4,
        title: "The Pragmatic Programmer",
        author: "David Thomas",
        category: "Technology",
        available: true,
        icon: "📙"
    },
    {
        id: 5,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "History",
        available: true,
        icon: "📕"
    },
    {
        id: 6,
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        available: false,
        icon: "📘"
    },
    {
        id: 7,
        title: "The Selfish Gene",
        author: "Richard Dawkins",
        category: "Science",
        available: true,
        icon: "📗"
    },
    {
        id: 8,
        title: "Design Patterns",
        author: "Erich Gamma",
        category: "Technology",
        available: true,
        icon: "📙"
    },
    {
        id: 9,
        title: "Educated",
        author: "Tara Westover",
        category: "Fiction",
        available: true,
        icon: "📕"
    }
];

const bookGrid = document.getElementById("book-grid");
const searchInput = document.getElementById("search-input");
const filters = document.querySelectorAll(".filter");
const emptyState = document.getElementById("empty-state");
const bookCount = document.getElementById("book-count");

let selectedCategory = "All";

function renderBooks() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    bookGrid.innerHTML = "";

    bookCount.textContent =
        `${filteredBooks.length} book${filteredBooks.length === 1 ? "" : "s"}`;

    if (filteredBooks.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    filteredBooks.forEach(book => {
        const card = document.createElement("article");

        card.className = "book-card";

        card.innerHTML = `
            <div class="book-cover">${book.icon}</div>

            <span class="category">${book.category}</span>

            <h3>${book.title}</h3>

            <p class="author">by ${book.author}</p>

            <div class="availability">
                <span class="${book.available ? "available" : "unavailable"}">
                    ${book.available ? "● Available" : "● Unavailable"}
                </span>

                <button
                    class="borrow-button"
                    data-id="${book.id}"
                    ${book.available ? "" : "disabled"}
                >
                    ${book.available ? "Borrow" : "Unavailable"}
                </button>
            </div>
        `;

        bookGrid.appendChild(card);
    });

    document.querySelectorAll(".borrow-button").forEach(button => {
        button.addEventListener("click", borrowBook);
    });
}

function borrowBook(event) {
    const bookId = Number(event.target.dataset.id);

    const book = books.find(item => item.id === bookId);

    if (!book || !book.available) {
        return;
    }

    book.available = false;

    alert(`"${book.title}" has been borrowed successfully.`);

    renderBooks();
}

searchInput.addEventListener("input", renderBooks);

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));

        filter.classList.add("active");

        selectedCategory = filter.dataset.category;

        renderBooks();
    });
});

renderBooks();