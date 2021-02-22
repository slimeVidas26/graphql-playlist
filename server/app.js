const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/Schema');
const mongoose = require('mongoose')
const cors = require('cors')




// DB Config
const db = require("./config/keys").mongoURI;
//connection to db
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mern-basic:<password>@cluster0.tmbr7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app = express();

//allow cross-origin
app.use(cors())

app.use('/graphql' , graphqlHTTP({
schema,
graphiql : true
}))

app.listen(4000 , ()=>{
    console.log('Listen on port 4000')
})