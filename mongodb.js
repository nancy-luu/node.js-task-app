// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// destructuring properties out from mongodb object 
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId()


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectId('622b94f39540724b9e7d772a') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 29 }).toArray((error, users) => {
    //     console.log(users) 
    // })

    // db.collection('users').find({ age: 29 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectId('622b8a6c14918548a099329a')}, (error, user) => {
    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(user)
    // })

    // db.collection('tasks').find({ completed: false }).count((error, count) => {
    //     console.log(count)
    // })
    
    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })


    // db.collection('users').updateOne({ 
    //     _id: new ObjectId('622b86c886eb64463abc6e2a')
    // }, { 
    //     $set: { 
    //         name: 'Willow'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({ 
    //     _id: new ObjectId('622b86c886eb64463abc6e2a')
    // }, {
    //     $inc: { 
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({ 
        completed: false
     }, { 
         $set: { 
             completed: true
         }
     }).then((result) => {
         console.log(result.modifiedCount)
     }).catch((error) => {
         console.log(error)
     })

})

