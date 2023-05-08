const express = require('express')
const usersApp = express.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mclient = require('mongodb').MongoClient
const DBurl = process.env.DATABASE_CONNECTION_URL;


usersApp.use(express.json())

async function getCollection(s) {
    const client = await mclient.connect(DBurl)
    let dbObj = client.db("Treasure_Hunt")
    let collectionObj = dbObj.collection(s)
    return collectionObj
}

//GET ALL USERS
usersApp.get('/getusers', expressAsyncHandler(async (request, response) => {
    let usersCollection = await getCollection("users")

    let usersObj = await usersCollection.find().toArray()
    response.send({ message: "all users", payload: usersObj })
}))

//create user
usersApp.post('/createuser', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let usersCollection = await getCollection("users")
    let userObjDb = await usersCollection.findOne({ email: userObj.email })
    if (userObjDb !== null) response.send({ message: "email already exists" })
    else {
        let hashedPassword = await bcryptjs.hash(userObj.password, 5)
        userObj.password = hashedPassword
        await usersCollection.insertOne(userObj)
        response.send({ message: "User added succesfully" })
    }
}))


//login
usersApp.post('/login', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let usersCollection = await getCollection("users")
    let userObjDb = await usersCollection.findOne({ email: userObj.email, account: userObj.account })

    if (userObjDb == null) response.send({ message: "Wrong user name" })
    else {
        let validUser = await bcryptjs.compare(userObj.password, userObjDb.password)
        if (validUser == false) {
            response.send({ message: "incorrect password" })
        }
        else {
            let token = jwt.sign({ email: userObjDb.email }, process.env.SECRET_KEY , { expiresIn: "1d" })
            response.send(token)
        }
    }
}))

//leaderboard
usersApp.post('/updatearray', expressAsyncHandler(async (request, response) => {
    let leaderboardCollection = await getCollection("leaderboard")
    let email = request.body.email
    // let f1 = request.body.first
    // let f2 = request.body.second
    // let f3 = request.body.third
    // let f4 = request.body.fourth
    // let tot = request.body.total
    let res = await leaderboardCollection.findOne({email : email})
    let userObj = request.body
    // const update = { $set : {first : f1, second : f2, third : f3, fourth : f4, total : tot}}
    console.log(res)
    if(res==null) await leaderboardCollection.insertOne(userObj)
    response.send({message : "updated "})
}))


//get user leaderboard
usersApp.post('/getuserscore', expressAsyncHandler(async (request, response)=> {
    let leaderboardCollection = await getCollection("leaderboard")
    let un = request.body.username
    let res = await leaderboardCollection.findOne({username : un})
    response.send(res)
}))

//get all users
usersApp.get('/getallusersscore', expressAsyncHandler(async (request, response) => {
    let leaderboardCollection = await getCollection("leaderboard")

    let usersObj = await leaderboardCollection.find().toArray()
    response.send({ message: "all users", payload: usersObj })
}))


module.exports = usersApp;