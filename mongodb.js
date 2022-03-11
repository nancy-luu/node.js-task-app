// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// destructuring properties out from mongodb object 
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId()
// console.log(id)
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({ 
    //     _id: id,
    //     name: 'Bosco',
    //     age: 25,
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     // .ops is an array of documents
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     { 
    //         name: 'Nancy', age: 29 
    //     },
    //     { 
    //         name: 'Gunther', age: 40
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     { 
    //         description: 'Coding', 
    //         completed: true
    //     },
    //     { 
    //         description: 'Running', 
    //         completed: false
    //     },
    //     {
    //         description: 'Groceries',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) { 
    //         return console.log('Unable to insert documents!')
    //     } 

    //     console.log(result.ops)
    // })


})

