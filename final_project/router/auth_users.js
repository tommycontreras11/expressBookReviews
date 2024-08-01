const express = require('express');
const jwt = require('jsonwebtoken');
const { books } = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    return users.find(x => x.username == username)
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    return users.find(x => x.username == username && x.password == password)
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: "Please, fields are required" })

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: username
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            username,
            accessToken
        }

        return res.status(200).json({ message: `Welcome ${username}` });
    }

    return res.status(400).json({ message: "Username y/o password incorrect" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const { isbn } = req.params
    const { review } = req.body

    if (!isbn) return res.status(400).json({ message: "Please, provide a valid isbn" })
    if (!review) return res.status(400).json({ message: "Please, provide a valid review" })

    const userLogged = req.session.authorization['username']

    books[isbn].reviews[userLogged] = review
     
    return res.status(200).json({ message: "Review added successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const { isbn } = req.params

    if (!isbn) return res.status(400).json({ message: "Please, provide a valid isbn" })

    const userLogged = req.session.authorization['username']

    if(!books[isbn].reviews[userLogged]) return res.status(400).json({ message: "Sorry, you haven't written a review yet" });

    delete books[isbn].reviews[userLogged]
     
    return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
