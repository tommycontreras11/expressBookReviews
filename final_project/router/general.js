const express = require('express');
const { books, filterBookByProperty, getBookByISBN } = require("./booksdb.js")
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    //Write your code here
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: "Please, fields are required" })

    if(isValid(username)) return res.status(400).json({ message: `Sorry, this ${username} is already is use`})

    users.push({ "username": username , "password": password })

    return res.status(300).json({ message: `User ${username} register successfully` });
});

// Get the book list available in the shop
public_users.get('/', function (_req, res) {
    //Write your code here
    return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const { isbn } = req.params

    if (!isbn) return res.status(400).json({ message: "Please, provide a valid isbn" })

    const findBook = getBookByISBN(isbn)

    return res.status(300).json(findBook);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const { author } = req.params

    if (!author) return res.status(400).json({ message: "Please, provide a valid author" })

    const findAuthor = filterBookByProperty("author", author).book

    return res.status(300).json(findAuthor);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const { title } = req.params

    if (!title) return res.status(400).json({ message: "Please, provide a valid title" })

    const findTitle = filterBookByProperty("title", title).book

    return res.status(300).json(findTitle);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const { isbn } = req.params

    if (!isbn) return res.status(400).json({ message: "Please, provide a valid isbn" })

    const findBook = getBookByISBN(isbn)

    return res.status(200).json(findBook.reviews);
});

module.exports.general = public_users;
module.exports.getBookByISBN = getBookByISBN;
