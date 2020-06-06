const express = require('express');
const app = express();
require("./mongoose");

const User = require("../models/user");
const Task = require("../models/task");
const port = process.env.PORT || 3000

// Parse the JSON data 
app.use(express.json())

// For creating the data 
// ================================================================== //

// CONVERT IT INTO ASYNC FUNCTION

// ================================================================== //


app.post('/users', async (req, res) => {
    // User Model 
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// For Reading the data 
app.get('/users', async (req, res) => {
try{
const users = await User.find({})
res.status(201).send(users)
}
catch (e){
res.status(400).send(e);
}

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// By Id 
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
const user = await User.findById(_id)
if(!user){
    res.status(400).send("Not a User")
}
res.status(201).send(user)
    }
    catch(e){
res.status(400).send(e)
    }
    // User.findById(_id)
    
    
    // .then((user) => {
    //     if (!user) {
    //         res.status(400).send()
    //     }
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})



app.post('/tasks', async (req, res) => {
    // Task Model 
    const task = new Task(req.body);
    try{
const user = await task.save();
res.status(201).send(user)
    }
    catch(e){
res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// This is for getting all by it's a particular task by it's ID 

app.get('/tasks', async (req, res) => {
    const task = await Task.find({})
try{
res.status(201).send(task)
}
catch (e){
res.status(400).send(e)
}
    // Task.find({}).then((task) => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
try{
const users = await Task.findById(_id)
if(!users){
    return res.status(404).send()
}
res.send(users)
}
catch(e){
res.status(400).send(e)
}

    // Task.findById(_id).then((task) => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // }
    // )

})




app.listen(port, () => {
    console.log("Server is started now");
})
