const mongoose  = require('mongoose')
const {Game,Publisher} = require('../model')





const publisherController = {
   getAllPublishers(req,res){
   Game.find({},{publisher:true}).exec((error,data) =>{
    
      if(error){
        res.json({status:500, msg:'Internal server error'})
      }
      else {
        res.json({status:200, result:data})
      }
    })
},
 getGamePublisher(req,res){
    let gameid = req.params.gameId;
   Game.find({_id:gameid},{publisher:true}).exec((error,data) =>{
       
         if(error){
           res.json({status:500, msg:'Internal server error'})
         }
         else {
           res.json({status:200, result:data})
         }
       })
   },

   addPublisher(req,res){
    let gameid = req.params.gameId;
       let _lng = req.body.lng;
       let _lat = req.body.lat;
       let _coordinate =[];
       _coordinate.push(_lng);
       _coordinate.push(_lat);
 
    let publisher = new Publisher({
        name: req.body.name?req.body.name:'',
        country:req.body.country?req.body.country:'',
        location: {type:undefined,coordinates:_coordinate}
    })

  console.log(publisher);
    Game.findById(gameid).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                data.publisher = publisher;
              //  Game.updateOne({_id:gameid},{$set:{publisher:publisher}}).exec((err, data)=>{
                  data.save(err => {
                    if(err){
                        res.json({status:500, result:'Internal server error'});  
                    }
                    else{
                        res.json({status:201, result:`Publisher for game with id ${gameid} updated`});
                    }
                });

            }
            else{ res.json({status:201, result:`No game data found`});}
          
        }
    })
   },
   updatePublisher(req,res){
    let gameid = req.params.gameId;
    let _lng;
    let _lat ;
    if(req.body.lng)
       lng = req.body.lng;
    if(req.body.lat)
       lat = req.body.lat;

    let _coordinate =[];
    if(_lat && lng){
     _coordinate.push(_lng);
     _coordinate.push(_lat);
    }
 
  let publisher = new Publisher();
    if(req.body.name)
        publisher.name = req.body.name;
    if(req.body.country)
        publisher.country = req.body.country;
     if(Object.keys(locat).length >0)
        publisher.location= {type:undefined,coordinates:_coordinate}
  
    Game.findById(gameid).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                data.publisher = publisher;
                Game.updateOne({_id:gameid},data).exec((err, data)=>{
                    if(err){
                        res.json({status:500, result:'Internal server error'});  
                    }
                    else{
                        res.json({status:204, result:`Publisher for game with id ${gameid} updated`});
                    }
                });

            }
            else{
                res.json({status:406, result:'No data found'});
            }
         
        }
    })
   },
   partialPublisherUpdate(req,res){
    let gameid = req.params.gameId;
    let _lng = req.body.lng;
    let _lat = req.body.lat;
    let _coordinate =[];
    _coordinate.push(_lng);
    _coordinate.push(_lat);

 let publisher = new Publisher({
     name: req.body.name?req.body.name:'',
     country:req.body.country?req.body.country:'',
     location: {type:undefined,coordinates:_coordinate}
 })

 
    Game.findById(gameid).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                let _publisher = data.publisher;
                if(publisher.name)
                   _publisher[0].name = publisher.name;
                  
                if(publisher.country)
                   _publisher[0].country = publisher.country;
                if(publisher.location)
                   _publisher[0].location.type = publisher.location.type;                 
                   _publisher[0].location.coordinates = publisher.location.coordinates;  
                   data.publisher = _publisher;
                   console.log(_publisher);
                   let _data = {
                       publisher: _publisher
                   }
                 Game.updateOne({_id:gameid}, {'publisher':publisher}).exec((err, result)=>{
                    if(err){
                        console.log(err)
                        res.json({status:500, result:'Internal server error'});  
                    }
                    else{
                        res.json({status:201, result:'Update was successfull'}); 
                    }
                });

            }
            else{
                res.json({status:406, result:'No data found'});
            }
        
        }
    })
   },


 deletePublisher(req,res){
    let gameid = req.params.gameId;
    let publisherid = req.params.publisherId; 
     Game.findById(gameid).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
             
                let temp = data.publisher[0]._id;
                if(data.publisher[0]._id &&(publisherid == data.publisher[0]._id)){
                    data.publisher =[];
                    Game.updateOne({_id:gameid},data).exec((err, data)=> {
                        if(err){

                        }
                        else{
                            res.json({status:data !=null?201:204, result:data !=null?`Deleted a publisher with id ${temp}`:'No data found'});
                        }
                    })
                }
                else{
                  
                    res.json({status:201, result:'No publisher was found'});
                }
            }
            
        }
    })

 },
 }

module.exports = publisherController;