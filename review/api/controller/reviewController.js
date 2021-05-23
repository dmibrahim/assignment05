const mongoose  = require('mongoose')
const reviewschema = require('../../../shared/model/review-schema')
const {Game,Review} = require('../model/')




const reviewController = {
    getAllReviews(req,res){
   Game.find({},{reviews:true}).exec((error,data) =>{
    
      if(error){
        res.json({status:500, msg:'Internal server error'})
      }
      else {
        res.json({status:200, result:data})
      }
    })
    },
   getGameReviews(req,res){
    let gameid = req.params.gameId;
   Game.find({_id:gameid},{reviews:true}).exec((error,data) =>{
       
         if(error){
           res.json({status:500, msg:'Internal server error'})
         }
         else {
           res.json({status:200, result:data})
         }
       })
   },

   addPReview(req,res){
        let gameid = req.params.gameId;
      
   
    let review = new Review ({
        name:req.body.name?req.body.name:'',
        review:req.body.review?req.body.review:'',
        date:new Date()
    })

    if(Object.keys(review).length <3){
        res.status(500).json({msg:'Please enter name and review'})
    }

    console.log(review);
  
    Game.findById(gameid).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:error});
        }
        else{
            if(data){
              data.reviews.push(review);
              //  Game.updateOne({_id:gameid},{$set:{publisher:publisher}}).exec((err, data)=>{
                  Game.updateOne({_id:gameid},data).exec(function(err ,data) {
                    if(err){
                        res.json({status:500, result:err});  
                    }
                    else{
                        res.json({status:201, result:`Review for game with id ${gameid} updated`});
                    }
                });

            }
            else{ res.json({status:201, result:`No game data found`});}
          
        }
    })
   },
   updateReview(req,res){
    let gameid = req.params.gameId;
    let reviewId = req.params.reviewId;
    let review = new Review ({
        name:req.body.name?req.body.name:'',
        review:req.body.review?req.body.review:'',
        date:new Date()
    })
    

    Game.findById(gameid)
    .exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
      
            else{
                if(data){
                    data.reviews.forEach(newreview =>{
                        if(newreview._id == reviewId){
                            console.log('They are same')
                        let idx = data.reviews.indexOf(newreview);
                         if(review.name){
                            newreview.name =  review.name;
                         }
                         if(review.review){
                            newreview.review =  review.review;
                         }
                         if(review.date){
                            newreview.date =  review.date;
                         }
                         data.reviews[idx] =newreview;
                        }
                    })
                      console.log(data);
                    Game.updateOne({_id:gameid},data).exec(function(err,data){
                        if(err){
                            console.log('error:',err);
                            res.json({status:500, result:'Internal server error'});
                           }
                           else{
                            res.json({status:204, result:`Review for game with id ${gameid} updated`});   
                           }
                    })
                    
                }
                else{
               
                res.json({status:204, result:`No Data`});
                }
            }
         
        });
 
   },
   partialReviewUpdate(req,res){
    let gameid = req.params.gameId;
    let reviewId = req.params.reviewId;
    let review = new Review ({
        name:req.body.name?req.body.name:'',
        review:req.body.review?req.body.review:'',
        date:new Date()
    })
    

    Game.findById(gameid).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                data.reviews.forEach(newreview =>{
                    if(newreview._id == reviewId){
                        console.log('They are same')
                    let idx = data.reviews.indexOf(newreview);
                     if(review.name){
                        newreview.name =  review.name;
                     }
                     if(review.review){
                        newreview.review =  review.review;
                     }
                     if(review.date){
                        newreview.date =  review.date;
                     }
                     data.reviews[idx] =newreview;
                    }
                });
                 Game.updateOne({_id:gameid},data).exec((err, result)=>{
                    if(err){
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
  deleteReview(req,res){
    let gameid = req.params.gameId;
    let reviewId = req.params.reviewId; 
    Game.findById(gameid).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                data.reviews.forEach(newreview =>{
                    if(newreview._id == reviewId){
                        console.log('They are same')

                        data.reviews.splice(newreview,1);
                    }
                });
                                 
                    Game.updateOne({_id:gameid},data).exec((err, data)=> {
                        if(err){
                            console.log('error:',error);
                            res.json({status:500, result:'Internal server error'});
                        }
                        else{
                            res.json({status:data !=null?201:204, result:data !=null?`Deleted a review with id ${reviewId}`:'No data found'});
                        }
                    })
                }
                else{
                  
                    res.json({status:201, result:'No publisher was found'});
                }
            }
            
        
    })

}
 }

module.exports = reviewController;