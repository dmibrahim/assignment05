const express = require('express')
require('dotenv').config();
require('../shared/db/shared-connection').openConnection(process.env.SCHOOL_DB);
const app = express();
const routes = require('./api/routes/index');


app.use(express.json());

app.use(routes);
app.use(function(req, res, next) {
    if (!req.route)
        res.json({status:404, message:'Seems you have lost way! No such path'});  
    next();
});
app.listen(process.env.SCHOOL_PORT,()=>{
    console.log(`Listening to port ${process.env.SCHOOL_PORT}`)
})

