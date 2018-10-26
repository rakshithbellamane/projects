const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('./todoList/public'))
app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient
var uri = 'mongodb+srv://rakshith:Design32INFY@crucible-bvg5f.mongodb.net/crucibledb'
var initialList = []
var listDatabase
var listTable

function getMongoConnection(callback){
  MongoClient.connect(uri,function(err,db){
    if (err){
      callback(err,null)
    } else {
      listDatabase = db.db('crucibledb')
      callback(null,listDatabase)
    }
  })
}

function getInitialList(callback){
  getMongoConnection(function(error,listDatabase){
    listTable = listDatabase.collection('listCollection')
    var cursor = listTable.find()
    cursor.toArray(function(err,list){
      initialList = list
      callback(null, initialList)
  })
})
}

app.get('/first-list',(req,res) =>{
  getInitialList(function(error, firstList){
    res.send(firstList)
  })
})


app.post('/newList',(req,res) =>{
  console.log('processed POST')
  listTable.insertOne(req.body)
  res.json(req.body)
})

app.put('/listUpdate',function(req,res){
  console.log('processed PUT')
  listTable.updateOne(
    {
      "listID":req.body.listID
    },
      {
        $set:{
          "listDetail":req.body.listDetail
      }
    }
  )
  res.json(req.body)
})

app.delete('/deleteListItems',function(req,res){
  console.log('processed DELETE')
  listTable.deleteMany(
    {
      "listID": {$in : req.body}
    }
  )
  res.json(req.body)
})


app.listen(8000,()=>{
  console.log('express based node app is listening on port 8000')
})