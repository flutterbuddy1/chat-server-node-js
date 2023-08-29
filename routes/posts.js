// import { route } from './users';

const dbPATH = "./db/chat.db";
import express from "express";
// import { hashPassword } from "../utils/function";

import sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();


const router = express.Router();
const db = new sqlite3.Database(dbPATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(err.message);
});

router.get('/', (req, res) => {
    db.all("SELECT * FROM posts", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});


router.post('/', (req, res) => {
    const { user_id, post, datetime, likes, comments } = req.body;
    db.run("INSERT INTO posts (user_id, post, datetime, likes, comments) VALUES (?,?,?,?,?)", user_id, post, datetime, JSON.stringify(likes), JSON.stringify(comments), function (err, result) {
        if (err) {
            res.status(500).send({
                status: 0,
                message: err.message
            });
        }
        res.status(201).send({
            status: 1,
            id: this.lastID,
            user_id: user_id,
            post: post,
            datetime: datetime,
            message: "Post created successfully"
        });
    });

});

export default router;