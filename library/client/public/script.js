const searchInput = document.querySelector("#searchInput");
const toggleAddBookSectionBtn = document.querySelector("#toggleAddBookSectionBtn");
const toggleAddAuthorSectionBtn = document.querySelector("#toggleAddAuthorSectionBtn");
const booksTableBody = document.querySelector("#books tbody");
const addBookForm =  document.querySelector("#addBookForm");
const addAuthorForm =  document.querySelector("#addAuthorForm");
const deleteAuthorForm =  document.querySelector("#deleteAuthorForm");
let authorSelectInput = document.querySelector('#delete_author_select');

// Fetch books on page load
fetchBooks();

toggleAddBookSectionBtn.addEventListener('click', toggleAddBookSection)
toggleAddAuthorSectionBtn.addEventListener('click', toggleAddAuthorSection)

// update on searchInput change
searchInput.addEventListener("input", () => {
  fetchBooks(searchInput.value);
});

booksTableBody.addEventListener('click', async (evt) => {
  // if clicked element is button, or clicked elements parent is button (needed in case of clicks on icon instead of button)
  if (evt.target.nodeName === 'BUTTON' || evt.target.parentNode.nodeName === 'BUTTON') {


    let authors = await fetchAuthors();

    console.log(authors)


    const target = evt.target.nodeName === 'BUTTON' ? evt.target : evt.target.parentNode;
    // convert array-like to array
    const typeOfBtn = [...target.classList].includes('editBtn') ? 'editBtn' : 'deleteBtn';
    const tr = target.parentNode.parentNode;

    let bookTitleInput = tr.querySelector('.edit-book-title');
    let bookAuthorInput = tr.querySelector('.edit-book-author');
    let bookGenreInput = tr.querySelector('.edit-book-genre');
    let bookYearInput = tr.querySelector('.edit-book-year');
    let bookLoanCountInput = tr.querySelector('.edit-book-loan-count');
    let bookAmountInput = tr.querySelector('.edit-book-amount');

    const book_id = tr.querySelector('.book_id').textContent;

    const bookTitleElement = tr.querySelector('td.title');
    const bookAuthorElement = tr.querySelector('td.author');
    const bookGenreElement = tr.querySelector('td.genre');
    const bookYearElement = tr.querySelector('td.year');
    const bookLoanCountElement = tr.querySelector('td.loan-count');
    const bookAmountElement = tr.querySelector('td.amount');

    const bookTitle = bookTitleElement.textContent;
    const bookAuthor = bookAuthorElement.textContent;
    const bookGenre = bookGenreElement.textContent;
    const bookYear = bookYearElement.textContent;
    const bookLoanCount = bookLoanCountElement.textContent;
    const bookAmount = bookAmountElement.textContent;

    if (typeOfBtn === 'editBtn') {

      if (!bookTitleInput) {

        bookTitleElement.innerHTML = `<input class="edit-book-title form-control" type="text" value="${bookTitle}"/>`
        bookGenreElement.innerHTML = `<input class="edit-book-genre form-control" type="text" value="${bookGenre}"/>`
        bookYearElement.innerHTML = `<input class="edit-book-year form-control" type="number" value="${bookYear}"/>`
        bookLoanCountElement.innerHTML = `<input class="edit-book-loan-count form-control" type="number" value="${bookLoanCount}"/>`
        bookAmountElement.innerHTML = `<input class="edit-book-amount form-control" type="number" value="${bookAmount}"/>`

        let author_options = ``;
        authors.forEach((author) => {
          author_options += `<option value="${author.author_id}">${author.author_name}</option>`;
        })
        bookAuthorElement.innerHTML = `<select class="edit-book-author form-control">${author_options}</select>`

        bookTitleInput = tr.querySelector('.edit-book-title');

        // Better UX, focus on bookTitleInput so that user doesn't need to click on it to start typing
        bookTitleInput.focus();

        tr.classList.add('table-warning');

        return;
      }

      editBook(book_id, bookTitleInput.value, bookAuthorInput.value, bookGenreInput.value, bookYearInput.value, bookLoanCountInput.value, bookAmountInput.value);

    } else {
      deleteBook(book_id);
    }

  }
}, false);
addBookForm.addEventListener('submit', async (evt) => {

  evt.preventDefault();

    let bookTitleInput = document.querySelector('#add_book_title');
    let bookAuthorInput = document.querySelector('#add_book_author');
    let bookGenreInput = document.querySelector('#add_book_genre');
    let bookYearInput = document.querySelector('#add_book_year');
    let bookLoanCountInput = document.querySelector('#add_book_loan_count');
    let bookAmountInput = document.querySelector('#add_book_amount');

      addBook(bookTitleInput.value, bookAuthorInput.value, bookGenreInput.value, bookYearInput.value, bookLoanCountInput.value, bookAmountInput.value);
});
addAuthorForm.addEventListener('submit', async (evt) => {

  evt.preventDefault();

  let authorNameInput = document.querySelector('#add_author_name');
  addAuthor(authorNameInput.value);
});

deleteAuthorForm.addEventListener('submit', async (evt) => {

  evt.preventDefault();


  deleteAuthor(authorSelectInput.value);
});


function fetchBooks(searchQuery) {

  fetch('http://localhost:3000/api/search?' + new URLSearchParams({
    query: searchQuery}), {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
  })
    .then(async (resp) => {
      const books = await resp.json();

      console.log(books)

      booksTableBody.innerHTML = '';

      books.forEach((book, i) => {
        booksTableBody.innerHTML += `
  <tr>
    <td class="book_id">${book.book_id}</td>
    <td class="title">${book.title}</td>
    <td class="author">${book.author_name} </td>
    <td class="genre">${book.genre}</td>
    <td class="year">${book.year}</td>
    <td class="loan-count">${book.loan_count}</td>
     <td class="amount">${book.amount}</td>
     <td><button type="button" class="btn btn-warning editBtn"><i class="fa fa-edit"></i></button>
     <button type="button" class="btn btn-danger deleteBtn"><i class="fa fa-trash"></i></button></td>
  </tr>
        `;
      });

      if (!books.length) {
        booksTableBody.innerHTML = `<p style="color: black">No Books Were Found...</p>`;
      }
    })
    .catch((err) => {
      console.error(err);
    })

}

async function toggleAddBookSection() {

  if (addBookForm.style.display !== 'none' && addBookForm.style.display !== '') {
    return addBookForm.style.display = 'none';
  }

  let authors = await fetchAuthors();
let  author_select_container = addBookForm.querySelector('#add_book_author');

  let author_options = ``;
  authors.forEach((author) => {
    author_options += `<option value="${author.author_id}">${author.author_name}</option>`;
  })

 author_select_container.innerHTML = author_options;

  addAuthorForm.style.display = 'none';
  deleteAuthorForm.style.display = 'none';
  addBookForm.style.display = 'block';
}

async function toggleAddAuthorSection() {

  if (addAuthorForm.style.display !== 'none' && addAuthorForm.style.display !== '') {
   addAuthorForm.style.display = 'none';
    deleteAuthorForm.style.display = 'none';

    return
  }

  let authors = await fetchAuthors();

  let author_options = ``;
  authors.forEach((author) => {
    author_options += `<option value="${author.author_id}">${author.author_name}</option>`;
  })

  authorSelectInput.innerHTML = author_options;

  addBookForm.style.display = 'none';
  addAuthorForm.style.display = 'block';
  deleteAuthorForm.style.display = 'block';

}

async function fetchAuthors() {

  return await fetch('http://localhost:3000/api/getAuthors?', {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
  })
    .then(async (resp) => {
      const authors = await resp.json();

      console.log(authors)

      return authors;

    })
    .catch((err) => {
      console.error(err);
    })

}

function addBook(title, author_id, genre, year, loan_count, amount) {
  // Show error and stop fetch from running if any of the inputs are invalid
  if (!title) {
    return console.error("Title can't be empty!");
  }

  fetch('http://localhost:3000/api/add', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author_id,
      genre,
      year,
      loan_count,
      amount
    }),
  })
    .then((resp) => {
      if (resp.status === 200) {
        addBookForm.style.display = 'none';
        fetchBooks()
      }
    })
    .catch((err) => {
      console.error(err);
    })
}

function addAuthor(author_name) {

  fetch('http://localhost:3000/api/addAuthor', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author_name
    }),
  })
    .then((resp) => {
      if (resp.status === 200) {
        addAuthorForm.style.display = 'none';
        deleteAuthorForm.style.display = 'none';

      }
    })
    .catch((err) => {
      console.error(err);
    })
}

function deleteAuthor(author_id) {

  fetch('http://localhost:3000/api/deleteAuthor', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author_id
    }),
  })
    .then((resp) => {
      if (resp.status === 200) {
        addAuthorForm.style.display = 'none';
        deleteAuthorForm.style.display = 'none';

      }
    })
    .catch((err) => {
      console.error(err);
    })
}

function editBook(book_id, title, author_id, genre, year, loan_count, amount) {

  // PUT
  fetch('http://localhost:3000/api/edit', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      book_id,
      title,
      author_id,
      genre,
      year,
      loan_count,
      amount
    }),
  })
    .then((resp) => {
      if (resp.status === 200) {
        fetchBooks()
      }
    })
    .catch((err) => {
      console.error(err);
    })
}

function deleteBook(book_id) {

  fetch('http://localhost:3000/api/delete', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      book_id: book_id
    })
  }).then(async (resp) => {
      // update list

    fetchBooks()
    })
}
