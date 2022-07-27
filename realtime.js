
const { join } = require('path');
const dbCon = require("./database");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(htdtp);
var re ;
var al = [];
var ListDay = [];

http.listen(8000,function(){
    console.log('listen on *:8000')
});
app.get('/', function(req,res){
    res.console.log('Gunkawee');
});

io.on('connection',function(client){
    console.log('Client connected...');
    // client.on('day',function(value){
    //     console.log(value);
    //     var mac = value.mac;
    //     var  dt_create = value.day+'%';
    //     dbCon.query('select  temperature,battery,humidity from iot where dt_create like ? and mac =? order by rand() limit 30',[dt_create,mac],(error,results,fields)=>{
    //         if(error) throw error;
    //         al = results
    //         console.log(al);
            
    //             client.emit('data',al);
            
    //     })

    // });
    
   
        client.on('selectmac',function(mac){    
        console.log('working')
        console.log(mac)
        dbCon.query('select * from updateiot where mac = ?',[mac],(error,results,fields)=>{
            if(error) throw error; 
            get(results);
            
        });
        client.emit('message',re);
        });
        // Promise(re);
        
        client.on('Temp',function(Day){
        ListDay = [] ;
        al = [];
        for(let a = 1 ;a < 8; a++){
            var day = 'day'+a;
            ListDay.push(Day[day])
            console.log(ListDay);
        }
        for(let x = ListDay.length ;x >=0;x--) {
            var  dt_create = ListDay[x]+'%';
            dbCon.query('select   AVG(temperature) ,AVG(battery),AVG(humidity),dt_create from iot where dt_create like ? and mac =?  and  temperature != 0',[dt_create,Day.mac],(error,results,fields)=>{
                if(error) throw error;
                results=JSON.parse(JSON.stringify(results))
                if(results[0].dt_create != null){
                    client.emit('restemp',results)
                    console.log(results)

                } 
            })
        }
    })
   

    
    client.on("disconnect", () => {
        console.log("dis"); // false
      });
       
   
});
function get(results){{
    re = results
    
}}







