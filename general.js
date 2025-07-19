const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({message: "Username and password are required"});
    }
  
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({message: "Username already exists"});
    }
  
    users.push({username, password});
    return res.status(200).json({message: "User registered successfully"});
  });
  



// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
      const response = await axios.get('http://localhost:5000/'); // Replace with actual server if needed
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching books" });
    }
  });
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
      const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching book by ISBN" });
    }
  });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
      const response = await axios.get(`http://localhost:5000/author/${author}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching books by author" });
    }
  });
  
  
// Get all books based on title

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
      const response = await axios.get(`http://localhost:5000/title/${title}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching books by title" });
    }
  });
  
  
//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn].reviews);
  });
  

module.exports.general = public_users;
