const mongoose = require('mongoose');


const dbconnection = {  
openConnection(dbUrl){
  mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
  const db = mongoose.connection;
  db.on('error', (error)=> {
    console.log('Error connecting to database',error);
  })
  db.once('open',() =>{
      console.log('------------Connected to Mongo db-----------')
  })
},

closeConnection(){
 mongoose.connection.close();
 console.log('-----------Closed mongo connection--------')
}
};

module.exports = dbconnection;