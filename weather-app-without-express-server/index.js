const request = require('request');
const APPID = '972aa2129e6ea3af3d902a07b5f992d5';
const {promisify} = require('util');
const fs = require('fs');

//if you dont want to use APPID - insecure way because everyone can use the key 
//use process.env.APPID
//then in the terminal type 
//APPID="972aa2129e6ea3af3d902a07b5f992d5" node index.js

const promisfiedRequest = promisify(request);

const getWeather = async () =>{
    // request({
    //     url: `https://api.openweathermap.org/data/2.5/find?q=London,uk&APPID=${APPID}`,
    //     json: true
    // }, (err, res)=>{
    //     if (err) throw err;
    //     console.log(res.body);
    // });

    //USING A MODULE
    let data = await promisfiedRequest({ //wait for the request to be completed before moving on
        url: `https://api.openweathermap.org/data/2.5/find?q=London,uk&APPID=${APPID}`,
        // json: true
    });

    // console.log(data.body)
    fs.writeFileSync("weatherData.json", data.body)

    var content = fs.readFileSync("weatherData.json"); //,"utf8"
    var jsonContent = JSON.parse(content);
    console.log(jsonContent)
}

getWeather();