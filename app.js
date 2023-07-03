const express = require('express')
const bodyParser = require('body-parser')
const {getAllTodoList,createTodo,getTodoByID,deteleTodoById,updateTodoByID, filterByPriority} = require('./controller/todo');
const {Login,Register} = require('./controller/userdetails');
const{connectDb} = require('./config/db')

connectDb();
const cors = require('cors')
const app = new express();


app.use(cors())
app.use(bodyParser.json());

app.get('/api/v1/todo',getAllTodoList);
app.post('/api/v1/todo',createTodo);
app.get('/api/v1/todo/:_id',getTodoByID);
app.delete('/api/v1/todo/:_id',deteleTodoById)
app.put('/api/v1/todo/:_id',updateTodoByID)
app.post('/api/v1/todo/filter',filterByPriority)
app.post('/api/v1/todo/signin',Register);
app.post('/api/v1/todo/login',Login);


app.listen(5000,()=>{
    console.log("Connected....")
})
