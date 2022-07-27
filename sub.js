const { json } = require("body-parser");
const mqtt = require("mqtt");
const dbCon = require("./database");
var client = mqtt.connect('mqtt://192.168.1.192:1883'
// ,{clientId : 'ac233fc04610',username : 'falco',password :'1qazxsw2'}
);

const Door ="/gw/ac233fc045ba/status";
const MeetRoom = '/gw/ac233fc04610/status';
const Ceo = '/gw/ac233fc0466d/status';



client.on('connect',function() {
    client.subscribe(Door); 
    client.subscribe(MeetRoom); 
    client.subscribe(Ceo); 
    console.log("Client has sub");
});
client.on('message',function(topic,message){
    var json = JSON.parse(message.toString());
    for(let a = 0 ;a< json.length ;a++){
        var splittime = json[a].timestamp.replaceAll('T',' ');
        let dt_create = splittime.replaceAll('Z','');
        let type = json[a].type;
        let mac = json[a].mac;
        let rssi = json[a].rssi;
        let battery = json[a].battery;
        let temperature =json[a].temperature;
        let humidity = json[a].humidity;
        if(topic == Door){
        console.log(Door);
        console.log(json);
        // console.log(Door + message);
        if(battery != null && temperature != null && humidity != null){
            dbCon.query('SELECT * FROM updateiot where mac =?' , 
            [mac],(error,results,fields)=>{
                    if(results.length == 0)
                    {
                        dbCon.query('insert into updateiot (dt_create,type,mac,rssi,battery,temperature,humidity) values(?,?,?,?,?,?,?)' , 
                             ['','',mac,'','','',''] )
                    }
                    else{
                        dbCon.query('update updateiot set dt_create = ?,type = ?,rssi = ?, battery =? ,temperature = ?,humidity =? where id = ?' , 
                         [dt_create,type,rssi,battery,temperature,humidity, results[0]['id']] )
                    }
            } )
        }
        if(battery == null && temperature == null && humidity == null){
            battery = 0;
            temperature =0 ;
            humidity = 0;
        }
        dbCon.query('insert into iot (dt_create,type,mac,rssi,battery,temperature,humidity) values (?,?,?,?,?,?,?)',[dt_create,type,mac,rssi,battery,temperature,humidity] ,function(error,results,fields){
        
        })
        } 
        else if(topic == MeetRoom){
            // console.log(MeetRoom);
            //  console.log(json);
       
        }
        else if(topic == Ceo){
            // console.log(Ceo);
            // console.log(json);
       
        
        }
    }
})