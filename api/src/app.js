import express from 'express';
import cors from 'cors';
import connection from './db/db.js';
import userRouter from './routes/user.route';

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

require('./routes/user.route')(app);
app.listen(port,()=>{
    console.log(`App running at port : ${port}`);    
});

connection.connect((err)=>{
    err? console.error({'error':err}) : console.log('Connected to the MySQL server.'+" {Connection id :"+ connection.threadId+"}");
});
