import express from 'express';
import mysql from 'mysql';

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'wimpydb'
});

export default connection;