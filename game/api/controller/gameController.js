const {Game} = require('../model/')

const gamesController = {
async findAll(req,res){
var offset =0;
var count =5;
 var response = {};      
    if (req.query.offset || req.query.count){
     let queryOffset;
     let queryCount;
        if(req.query.offset && req.query.count){
            queryCount = req.query.count;
            queryOffset = req.query.offset;   
        }
        else if(req.query.offset){
            queryOffset = req.query.offset; 
        }
        else if(req.query.count){
            queryCount = req.query.count; 
        }

        if(queryOffset){
            if(!isNaN(parseInt(queryOffset))){
                offset = parseInt(queryOffset);
               }
               else{
                 response.offsetError ='Offset must be a valid number';
            }
        }
        if(queryCount){
            if(!isNaN(parseInt(queryCount))){
                let _count = parseInt(queryCount);
                if(_count>0 && _count <=7){
                    count = _count;
                }else{
    
                    response.countError ='Count must be between 1 and 7 only '; 
                }    
               } 
            else {
                response.countError ='Count must be a valid number maximum of 7 ';  
            }
        }
        
        if(Object.keys(response).length > 0){
            response.status=500;
            return res.json(response);
        }
    }
    
    


 await  Game.find().skip(offset).limit(count).exec((error,data) =>{
    
      if(error){
        res.json({status:500, msg:'Internal server error'})
      }
      else {
        res.json({status:200, result:data})
      }
    })
},

async findoneGame(req,res){
   let gameid = req.params.gameId;
 
   await Game.findById(gameid).exec((error,data) => {
       if(error){
        console.log('error:',error);
        res.json({status:500, result:'Internal server error'});
       }
       else{
        res.json({status:data !=null?200:204, result:data !=null?data:'No data found'});
       }
   })
},

async deleteGame(req,res){
    let gameid = req.params.gameId;
    await Game.findByIdAndDelete(gameid).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
        else{
            res.json({status:data !=null?201:204, result:data !=null?'Deleted a game with id '+data._id:'No data found'});
        }
    })

 },
 async partialGameUpdate(req,res){
    let gameid = req.params.gameId;
    let updateinfo = {};    
    if(req.body.title)
        updateinfo.title = req.body.title;    
    if(req.body.year)
       updateinfo.year = req.body.year;
    if(req.body.rate)
        updateinfo.rate = req.body.rate;
    if(req.body.price)
        updateinfo.price = req.body.price;
    if(req.body.minPlayers)
        updateinfo.minPlayers = req.body.minPlayers;
    if(req.body.maxPlayers)
        updateinfo.maxPlayers = req.body.maxPlayers;
    if(req.body.reviews)
        updateinfo.reviews = req.body.reviews;
    if(req.body.minAge)
        updateinfo.minAge = req.body.minAge;
    if(req.body.designers)
        updateinfo.designers = req.body.designers;

    await Game.updateOne({'_id':gameid},updateinfo).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
       else {
        res.json({status:data !=null?201:204, result:data !=null?'Updated a game with id '+gameid:`No data found for id  ${gameid}`});
       }
    })
 },

 async updateGameById(req,res){
    let gameid = req.params.gameId;
    let updateinfo = {};     
     updateinfo.title = req.body.title;     
     updateinfo.year = req.body.year;   
     updateinfo.rate = req.body.rate;    
     updateinfo.price = req.body.price;   
     updateinfo.minPlayers = req.body.minPlayers;    
     updateinfo.maxPlayers = req.body.maxPlayers;    
     updateinfo.reviews = req.body.reviews;    
     updateinfo.minAge = req.body.minAge;   
     updateinfo.designers = req.body.designers;

    await Game.updateOne({'_id':gameid},updateinfo).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
        else{
            res.json({status:data !=null?201:204, result:data !=null?'Updated a game with id '+gameid:`No data found for id  ${gameid}`});
        }
    })
    
 },
  createNewGame(req,res){

    let gameinfo =  new Game({     
     title:req.body.title,     
     year:req.body.year,  
     rate:req.body.rate ,   
     price:req.body.price,  
     minPlayers:req.body.minPlayers,   
     maxPlayers:req.body.maxPlayers,   
     reviews:req.body.reviews,    
     minAge:req.body.minAge,   
     designers: req.body.designers
    });
    gameinfo.save( (error,data) => {
        if(error){
            console.log('error:',error);
            if (error.name === "ValidationError") {
                let errors = {};
          
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
          
                return res.status(400).send(errors);
            }
            else{
                res.json({status:500, result:'Internal server error'});
            }    
            
        }
        else
           res.json({status:data !=null?201:204, result:data !=null?'Created a game with id '+data._id:`No data found for id  ${gameid}`});       
    })

 },

}
module.exports = gamesController;