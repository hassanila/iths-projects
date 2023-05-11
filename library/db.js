const pgp = require('pg-promise')()
const db = pgp('postgres://postgres:test@localhost:5432/library')

async function getAllBooks() {

  return await db.any("SELECT * FROM book JOIN author ON book.author_id = author.author_id")
}

async function getAllAuthors() {

  return await db.any("SELECT * FROM author")
}

// search for book by title or author
async function getBookByKeyword (keyword) {

  if (!keyword || keyword === 'undefined') {
    return await db.any(`SELECT * FROM book JOIN author ON book.author_id = author.author_id`);
  }

  return await db.any(`SELECT * FROM book JOIN author ON book.author_id = author.author_id WHERE book.title LIKE '%${keyword}%' OR author.author_name LIKE '%${keyword}%'`);

}

async function updateBook(id, title, author_id, year, genre, loan_count, amount) {

  return await db.any(`UPDATE book SET title = '${title}', author_id = '${author_id}', year = '${year}', genre = '${genre}', loan_count = '${loan_count}', amount = '${amount}' WHERE book_id = ${id}` );
}

async function addBook(title, author_id, year, genre, loan_count, amount) {

  return await db.any(`INSERT INTO book (title, author_id, year, genre, loan_count, amount)
           VALUES ('${title}', '${author_id}', '${year}', '${genre}', '${loan_count}', '${amount}')`);

}

async function addAuthor(author_name) {

  return await db.any(`INSERT INTO author (author_name)
           VALUES ('${author_name}')`);

}

async function deleteAuthor(author_id) {

  return await db.any(`DELETE FROM author WHERE author_id = '${author_id}'`);

}

async function deleteBook(id) {

  return await db.none(`DELETE FROM book WHERE book_id = '${id}'`);
}

async function increaseLoanCount(book_id) {

  return await db.none(`UPDATE book SET loan_count = loan_count + 1 WHERE book_id = ${book_id}`)
}

async function decreaseLoanCount(book_id) {

  return await db.none(`UPDATE book SET loan_count = loan_count - 1 WHERE book_id = ${book_id}`)
}


module.exports = {
  getAllBooks,
  getAllAuthors,
  getBookByKeyword,
  updateBook,
  addBook,
  addAuthor,
  deleteAuthor,
  deleteBook,
  increaseLoanCount,
  decreaseLoanCount
}
