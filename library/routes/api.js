const express = require('express');
const router = express.Router();
const {
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
} = require("../db.js" );

router.get("/search", async (req, res) => {

  let data = await getBookByKeyword(req.query.query);
  console.log(data)

  return res.json(data)
});

router.get("/getAuthors", async (req, res) => {

  let data = await getAllAuthors();
  console.log(data)

  return res.json(data)
});

router.post("/add", async (req, res) => {

  console.log(req.body);

  await addBook(req.body.title, req.body.author_id, req.body.year, req.body.genre, req.body.loan_count, req.body.amount ).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(err)
    res.status(400).send(err.message)
  });
});

router.post("/addAuthor", async (req, res) => {

  console.log(req.body);

  await addAuthor(req.body.author_name).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(err)
    res.status(400).send(err.message)
  });
});

router.delete("/deleteAuthor", async (req, res) => {

  console.log(req.body);

  await deleteAuthor(req.body.author_id).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(err)
    res.status(400).send(err.message)
  });
});

router.put("/edit", async (req, res) => {

  console.log(req.body);

  await updateBook(req.body.book_id, req.body.title, req.body.author_id, req.body.year, req.body.genre, req.body.loan_count, req.body.amount);

  res.sendStatus(200);
});

router.delete("/delete", async (req, res) => {

  console.log(req.body.book_id)

  console.log(req.body);

  await deleteBook(req.body.book_id);

  res.sendStatus(200);

});

module.exports = router;