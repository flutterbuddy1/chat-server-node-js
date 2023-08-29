// const express = require('express');
// const hashPassword = require('../utils/function');
const dbPATH = "./db/chat.db";
import express from "express";
import _function from "../utils/function.js";
import sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();
const { hashPassword } = _function;

const router = express.Router();
const db = new sqlite3.Database(dbPATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(err.message);
});

router.get('/', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});


router.post('/login', (req, res) => {
    const { username, password, token } = req.body;

    if (username && password && token) {
        var hashPass = hashPassword(password);

        db.all("SELECT * FROM users WHERE username=? AND password=?", username, hashPass, (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
            }
            if (rows[0] != null) {
                console.log("USER ID    ",rows[0].id);
                db.run("UPDATE users SET token=? WHERE id=?", token,rows[0].id, (err) => {
                    if (err) {
                        res.status(500).send({
                            status: 0,
                            message: err.message
                        });
                    }
                    res.status(200).send({
                        message: "Login Successful",
                        status: 1,
                        ...rows[0]
                    });
                });

            } else {
                res.status(200).send({
                    message: "Login Failed",
                    status: 0
                });
            }
        });
    } else {
        res.status(400).send({
            status: 0,
            message: "Username and password are required"
        });
    }
});





router.post('/', (req, res) => {
    const { username, password, name, token } = req.body;
    if (username && password && name && token) {
        db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
            console.log(row);
            if (row) {
                res.status(400).send({
                    status: 0,
                    message: "Username already exists"
                });
            } else {
                var hashPass = hashPassword(password);
                db.run("INSERT INTO users (name,username, password,followers,followings,token) VALUES (?,?,?,?,?,?)", name, username, hashPass, JSON.stringify([]), JSON.stringify([]), token, function (err, result) {
                    if (err) {
                        res.status(500).send({
                            status: 0,
                            message: err.message
                        });
                    }
                    res.status(201).send({
                        status: 1,
                        name: name,
                        username: username,
                        id: this.lastID,
                        message: "User created successfully"
                    });
                });
            }
        });
    } else {
        res.status(400).send({
            status: 0,
            message: "Name, Username , token and password are required"
        });
    }

});

export default router;