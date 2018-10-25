const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('./public'))
app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/listDB'
var initialList = []
var listDatabase
var listTable

function getMongoConnection(callback){
  MongoClient.connect(url,function(err,db){
    if (err){
      callback(err,null)
    } else {
      listDatabase = db.db('listDB')
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
    },
    function(error,result){
      console.log(req.body.listID)
      console.log(req.body.listDetail)
      console.log(error)
      console.log(result.matchedCount)
    }
  )
  res.json(req.body)
})

app.listen(8000,()=>{
  console.log('express based node app is listening on port 8000')
})