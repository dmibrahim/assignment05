const {Student,Address} = require('../model');


const studentController = {
    
 async getAll(req,res){    
    var offset =0;
    var count =5;
    if(req.query && req.query.offset){
        var offsetQuery =  req.query.offset;
        if(!isNaN(parseInt(offsetQuery))){
         offset = parseInt(offsetQuery);
        }
    }
    if(req.query && req.query.count){
        var countQuery =  req.query.count;
        if(!isNaN(parseInt(countQuery))){
         let _count = parseInt(countQuery);
         if(_count >0 && _count <=7){
             count = _count;
         }
        }
    }
    

    await Student.find().skip(offset).limit(count).then(data =>{              
       res.json({status:200, result: data})
     })
     .catch(error => {
      console.log('-----Error retrieving student records------');
      res.json({status:500, msg:'Internal server error'})
     })
 },

  registerNew(req, res){
     var student = new Student({
         name:req.body.name?req.body.name:'',
         gpa:req.body.gpa? eq.body.gpa:''
     });
    
     var address = new Address({
        street: req.body.address.street?req.body.address.street:'',
        city: req.body.address.city?req.body.address.city:'',
        state:req.body.address.state?req.body.address.state:'',
        zip:req.body.address.zip?req.body.address.zip:''
    
     });

     student.address.push(address);

      student.save(function(error,data){
          if(error){
              let erroMsg = 'An error occured while trying to save user'; 
            console.log(error);
            if(error.name ='ValidationError'){
                let errors ={};
                Object.keys(error.errors).forEach(key => {
                    errors[key]= error.errors[key].message
                })
                errorMsg = errors;
            }
            res.json({status:500, message:errorMsg});
          }
          else
              res.json({status:200, message:"Saved new user", data:data});
    })
   
 },
 async getOneStudent(req,res){  
     let stId=  req.params.studentid;  
    await Student.findOne({'_id':stId}).then(data =>{              
       res.json({status:200, result: data})
     })
     .catch(error => {
      console.log('-----Error retrieving student records------');
      res.json({status:500, msg:'Internal server error'})
     })
 },
 async getstudentAddress(req,res){  
    let stId=  req.params.studentid;  
   await Student.findOne({'_id':stId,'address':{$exists:true}},'address').then(data =>{              
      res.json({status:200, result: data})
    })
    .catch(error => {
     console.log('-----Error retrieving student records------');
     res.json({status:500, msg:'Internal server error'})
    })
},
async getOneStudentAddress(req,res){  
    let stId=  req.params.studentid;  
    let addrId=  req.params.addressid;  
   await Student.findOne({'_id':stId,'address._id':addrId},'address').then(data =>{              
      res.json({status:data !=null? 200:204, result: data !=null? data:'No data found'})
    })
    .catch(error => {
     console.log('-----Error retrieving student records------');
     res.json({status:500, msg:'Internal server error'})
    })
},
fullUpdateStudent (req,res){
    let studentId = req.params.studentid;
    let updateinfo = {}; 
       if(req.body && req.body.name)
           updateinfo.name = req.body.name;
       if(req.body && req.body.name)   
            updateinfo.gpa = req.body.gpa;

       if(Object.keys(updateinfo).length ==0){
           res.status(500).json({msg: 'Please supply information to update'})
           return;
       }
     Student.updateOne({'_id':studentId},updateinfo).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
        else{
            res.json({status:data !=null?201:204, result:data !=null?'Updated a student with id '+studentId:`No data found for id  ${studentId}`});
        }
    })
    
 },
 partiaUupdateStudent (req,res){
    let studentId = req.params.studentid;
    let updateinfo = {}; 
       if(req.body && req.body.name)
           updateinfo.name = req.body.name;
       if(req.body && req.body.name)   
            updateinfo.gpa = req.body.gpa;

       if(Object.keys(updateinfo).length ==0){
           res.status(500).json({msg: 'Please supply information to update'})
           return;
       }
     Student.updateOne({'_id':studentId},updateinfo).exec( (error,data) => {
        if(error){
            console.log('error:',error);
            res.json({status:500, result:'Internal server error'});
        }
        else{
            res.json({status:data !=null?201:204, result:data !=null?'Updated a student with id '+studentId:`No data found for id  ${studentId}`});
        }
    })
    
 },
 fullUpdateStudentAddress(req,res){
    let studentId = req.params.studentid;
    let addressId = req.params.addressid;
    var address = {};
    if(req.body && req.body.street)
         address.street = req.body.street;
    if(req.body && req.body.city)
          address.city = req.body.city;
    if(req.body && req.body.state)
          address.state = req.body.state;
    if(req.body && req.body.zip)
          address.zip = req.body.zip;
    
  
     if(Object.keys(address).length  <4){
         let msg = `Please supply all address information, if you need to update part of the address then use patch`;

         res.status(500).json({msg:msg})
         return;
     }
    

    Student.findById(studentId).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                data.address.forEach(addr =>{
                    if(addr._id == addressId){
                        console.log('They are same')
                    let idx = data.address.indexOf(addr);
                     if(address.street){
                        addr.street =  address.street;
                     }
                     if(address.city){
                        addr.city =  address.city;
                     }
                     if(address.city){
                        addr.city =  address.city;
                     }
                     if(address.zip){
                        addr.zip =  address.zip;
                     }
                     data.address[idx] = addr;
                    }
                });
                 Student.updateOne({_id:studentId},data).exec((err, result)=>{
                    if(err){
                        console.log(err);
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
 PartialUpdateStudentAddress(req,res){
    let studentId = req.params.studentid;
    let addressId = req.params.addressid;
    var address = {};
    if(req.body && req.body.street)
         address.street = req.body.street;
    if(req.body && req.body.city)
          address.city = req.body.city;
    if(req.body && req.body.state)
          address.state = req.body.state;
    if(req.body && req.body.zip)
          address.zip = req.body.zip;
    
  console.log('length',Object.keys(address).length)
     if(Object.keys(address).length <= 0){
         let msg = `Please supply address information you want updated`;

         res.status(500).json({msg:msg})
         return;
     }
    

    Student.findById(studentId).exec((error,data) => {
        if(error){
         console.log('error:',error);
         res.json({status:500, result:'Internal server error'});
        }
        else{
            if(data){
                data.address.forEach(addr =>{
                    if(addr._id == addressId){
                        console.log('They are same')
                    let idx = data.address.indexOf(addr);
                     if(address.street){
                        addr.street =  address.street;
                     }
                     if(address.city){
                        addr.city =  address.city;
                     }
                     if(address.city){
                        addr.city =  address.city;
                     }
                     if(address.zip){
                        addr.zip =  address.zip;
                     }
                     data.address[idx] = addr;
                    }
                });
                 Student.updateOne({_id:studentId},data).exec((err, result)=>{
                    if(err){
                        console.log(err);
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
 }
}

module.exports = studentController;