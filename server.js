const dbCon = require("./database");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const port =  3000;
app.listen(port,()=>{
    console.log('Node App is running or port 3000');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


app.get('/',(req,res)=>{
    return res.send({ error : false,
    message : 'Welcome',
    written_by : 'Nanine',
    published_on: ''

})
})



app.get('/tracks',(req,res)=>{
    dbCon.query('SELECT * FROM track',(error,results,fields)=>{
        if(error) throw error;
            let message = ''
        if(results === undefined || results.length == 0){
            message = "this empty";
        }
        else{
            message = "Success!"
        }
            return res.send(results);
        
    })
}) 
app.get('/track/trackid',(req,res)=>{
    dbCon.query('SELECT Track_ID ,Status,Count_Improve FROM track',(error,results,fields)=>{
        if(error) throw error;
            let message = ''
        if(results === undefined || results.length == 0){
            message = "this empty";
        }
        else{
            message = "Success!"
        }
            return res.send(results);

    })
})

app.get('/track/:id',(req,res)=>{
    let id = req.params.id;
    if(!id){
        return res.status(400).send({error : true , message : 'Please provide track id'})
    }
    else{
        dbCon.query('SELECT * FROM track WHERE Track_ID = ?',id,(error,results,fields)=>{
            if(error) throw error;
            let message = "";
            if(results === undefined || results.length == 0){
                message = "not found";
            }
            else{
                message = "Success!";
            }
            return res.send(results[0])
        })
    }
})
app.post('/track',(req,res)=>{
    let Track_ID = req.body.Track_ID;
    let Brand = req.body.Brand;
    let Size = req.body.Size;
    let Location = req.body.Location;
    let Start_Enable_Date = req.body.Start_Enable_Date;
    let Working_Condition = req.body.Working_Condition;
    let Generation = req.body.Generation;
    let Menufacturer = req.body.Menufacturer;
    let Age_of_use = req.body.Age_of_use;
    let Work_for = req.body.Work_for;
    let Note = req.body.Note;
    let Count_Improve = req.body.Count_Improve ;
    let Status = req.body.Status ;
    console.log(Track_ID,Brand,Size,Location,Start_Enable_Date,Generation,Menufacturer,Age_of_use,Work_for,Note,Status)
    if(!Track_ID || !Size || !Location ||!Working_Condition || !Start_Enable_Date || !Generation  || !Age_of_use || !Work_for|| !Count_Improve || !Status ){
        return res.status(400).send({error : true , message : "Please กรอกข้อมูลให้ครบ"})
    }else{
        dbCon.query('INSERT INTO track (Track_ID,Brand,Size,Location,Start_Enable_Date,Generation,Menufacturer,Age_of_use,Work_for,Note,Working_Condition,Count_Improve,Status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',[Track_ID,Brand,Size,Location,Start_Enable_Date,Generation,Menufacturer,Age_of_use,Work_for,Note,Working_Condition,Count_Improve,Status],(error,results,fields)=>{
            if(error) throw error;
            return res.send({error :  false , data : results,message : "Success!" })
        } )
    }
})


app.put('/track',(req,res)=>{
    let Track_ID = req.body.Track_ID;
    let Location  = req.body.Location ;
    let  Working_Condition  = req.body.Working_Condition ;
    let Last_Improve_Date  = req.body.Last_Improve_Date ;
    let  End_Date = req.body.End_Date ;
    let Note  = req.body.Note ;
    let Status = req.body.Status ;
    console.log(Track_ID,Location,Working_Condition,Last_Improve_Date,End_Date,Note,Status)
    if(!Track_ID || !Location || !Working_Condition   ||!Status ){
        return res.status(400).send({error : true , message : "Please กรอกข้อมูลให้ครบ"})
    }else{
        dbCon.query("UPDATE track SET Location = ?,Working_Condition = ?,Last_Improve_Date = ?,End_Date = ?,Note = ? ,Status = ? WHERE Track_ID = ? ",[Location,Working_Condition,Last_Improve_Date,End_Date,Note,Status,Track_ID],(error,results,fields)=>{
            if(error) throw error;
                let message = "";
            if(results.changedRows === 0){
                message = "not found or data are same";
            }
            else{
                message = "Success!";
            }
            return res.send({error :  false , data : results,message : message })
        } )
    }
})

app.delete('/track',(req,res)=>{
    let id = req.body.Track_ID;
    if(!id){
        return res.status(400).send({error : true , message : 'Please provide track id'})
    }
    else{
        dbCon.query('DELETE  FROM track WHERE Track_ID = ?',id,(error,results,fields)=>{
            if(error) throw error;
            let message = "";
            if( results.length == 0){
                message = "not found";
            }
            else{
                message = "Delete Success!";
            }
            return res.send({error : false , data : results[0],message : message})
        })
    }
})



app.get('/history/:id',(req,res)=>{
    let id = req.params.id;
    // print("gethistory>>>>> " + id);
    if(!id){
        return res.status(400).send({error : true , message : 'Please provide track id'})
    }
    else{
    
    dbCon.query('select * from history where Track_ID = ?  order by Year desc,Month desc,Day desc ,Time desc,History_ID desc;',id,(error,results,fields)=>{
        if(error) throw error;
            let message = ''
        if(results === undefined || results.length == 0){
            message = "this empty";
        }
        else{
            message = "Success!"
        }
            return res.send(results);
        
    })}
})  




app.post('/history',(req,res)=>{
    let Track_ID = req.body.Track_ID;
    let Day = req.body.Day;
    let Month = req.body.Month;
    let Year = req.body.Year;
    let Time = req.body.Time;
    let Repair_Description = req.body.Repair_Description;
    let Status = req.body.Status;
    let Company_Repair = req.body.Company_Repair;
    let Count_Improve = req.body.Count_Improve;
    console.log('Post history >>>>'+Track_ID,Day,Month,Year,Time,Repair_Description,Status,Company_Repair,Count_Improve)
    if(!Track_ID || !Day || !Month ||!Year || !Time || !Repair_Description  || !Status || !Company_Repair ||!Count_Improve ){
        return res.status(400).send({error : true , message : "Please กรอกข้อมูลให้ครบ"})
    }else{
        dbCon.query('update track set Count_Improve = ?,Status= ? where Track_ID = ?',[Count_Improve,Status,Track_ID], (error,results,fields)=>{
            if(error) throw error;
           
        }
        
        );
        dbCon.query('INSERT INTO history (Day,Month,Year,Time,Repair_Description,Status,Company_Repair,Track_ID) VALUES(?,?,?,?,?,?,?,?)',[Day,Month,Year,Time,Repair_Description,Status,Company_Repair,Track_ID],(error,results,fields)=>{
            if(error) throw error;
            return res.send({error :  false , data : results,message : "Success!" })
        } )
    }
})
app.get('/iot/device' ,(req,res) =>{
    dbCon.query('SELECT mac FROM updateiot',(error,results,fields)=>{
        if(error) throw error;
            let message = ''
        if(results === undefined || results.length == 0){
            message = "this empty";
        }
        else{
            message = "Success!"
        }
            return res.send(results);
        
    })
})



 module.exports =app;




// module.exports = function(app){
//     app.use(
//       '/api',
//       createProxyMiddleware({
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//       })
//     );
//   };

//   var socket = io.connect('http://localhost:4000');
//  socket.emit('showrows');
//  socket.on('showrows', function(rows) {
//      var html='';
//      for(var i=0; i<rows.length; i++){
//          html += rows[i].device_id + ' ' + rows[i].a + '<br>';
//      }  
//      document.getElementById("display").innerHTML = html;
//  }); 