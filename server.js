let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
var router = express.Router();
const SqlString = require('mysql/lib/protocol/SqlString');
const { CLIENT_MULTI_RESULTS } = require('mysql/lib/protocol/constants/client');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


app.get('/',(req,res)=>{
    return res.send({ error : false,
    message : 'Welcome',
    written_by : 'Nanine',
    published_on: ''

})
})
let dbCon = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'a123123',
    database :'trackingbluetooth'

})
dbCon.connect();

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
            return res.send({error : false,data :results,message : message});
        
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
            return res.send({error : false , data : results[0],message : message})
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
    let Menufacurer = req.body.Menufacurer;
    let Age_of_use = req.body.Age_of_use;
    let Work_for = req.body.Work_for;
    let Note = req.body.Note;
    console.log(Track_ID,Brand,Size,Location,Start_Enable_Date,Generation,Menufacurer,Age_of_use,Work_for,Note)
    if(!Track_ID || !Brand || !Size || !Location ||!Working_Condition || !Start_Enable_Date || !Generation || !Menufacurer || !Age_of_use || !Work_for || !Note ){
        return res.status(400).send({error : true , message : "Please กรอกข้อมูลให้ครบ"})
    }else{
        dbCon.query('INSERT INTO track (Track_ID,Brand,Size,Location,Start_Enable_Date,Generation,Menufacurer,Age_of_use,Work_for,Note,Working_Condition) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[Track_ID,Brand,Size,Location,Start_Enable_Date,Generation,Menufacurer,Age_of_use,Work_for,Note,Working_Condition],(error,results,fields)=>{
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
    let Count_Improve  = req.body.Count_Improve ;
    let  End_Date = req.body.End_Date ;
    let Note  = req.body.Note ;
    console.log(Track_ID,Location,Working_Condition,Last_Improve_Date,Count_Improve,End_Date,Note)
    if(!Track_ID || !Location || !Working_Condition || !Last_Improve_Date ||!Count_Improve || !End_Date ||  !Note  ){
        return res.status(400).send({error : true , message : "Please กรอกข้อมูลให้ครบ"})
    }else{
        dbCon.query("UPDATE track SET Location = ?,Working_Condition = ?,Last_Improve_Date = ?,Count_Improve = ?,End_Date = ?,Note = ? WHERE Track_ID = ? ",[Location,Working_Condition,Last_Improve_Date,Count_Improve,End_Date,Note,Track_ID],(error,results,fields)=>{
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

app.listen(3000,()=>{
    console.log('Node App is running or port 3000');
})
module.exports =router;