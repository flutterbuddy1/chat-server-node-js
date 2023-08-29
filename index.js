// import express from "express";
// import http from 'http';
// import users from "./routes/users.js";
// import sqlite3 from "sqlite3";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import auth from './middleware/api.js';
import users from './routes/users.js';
import posts from './routes/posts.js';
import socket from './routes/socket.js';
import http from "http";

// const express = require('express');
// const http = require('http');
// const users = require('./routes/users');
// const posts = require('./routes/posts');
// const socket = require('./routes/socket');




const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
// const io = require('socket.io')(server);
import {Server} from 'socket.io';
const io = new Server(server);
const dotenv = require('dotenv');
dotenv.config();



// API
app.use(express.json());
app.use('/users', auth(), users);
app.use('/posts', auth(),posts);
app.get('/', (req, res) => {
    res.send('Server is Running on Port ' + PORT);
});

io.on('connection', socket);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})