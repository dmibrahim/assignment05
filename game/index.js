const express = require('express');
const router = require('./api/route');
const app = express();
require('dotenv').config();
require('../shared/db/shared-connection').openConnection(process.env.GAMES_DB);



app.use(express.json());
app.use(router);
app.use(function(req, res, next) {
    if (!req.route)
        res.json({status:404, message:'Path is not found!'});  
    next();
});
app.listen(process.env.GAMES_PORT,() =>{
    console.log(`listening at port ${process.env.GAMES_PORT}`)
})