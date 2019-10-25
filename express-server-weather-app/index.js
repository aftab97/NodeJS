const hbs = require('express-handlebars');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Getting the directory name of the path
const getWeather = require('./lib/getWeather')
app.engine('.hbs',hbs({
   defaultLayout: 'layout',
   //Searching for the layout.hbs file to get  layout
   extname: '.hbs'
}))
app.set('view engine', '.hbs')
//Setting the view to what is specified in the .hbs
app.get('/',async(req, res) =>{
 // let data = await getWeather();
 // console.log(data)
 // let temp = data.list[0].main.temp
 // let clouds = data.list[0].clouds.all
 // // res.sendFile(__dirname + '/index.html')
 res.render('index')
});
app.post('/',async function(req,res){
 let location = req.body.location;
 let countryCode = req.body.country
 console.log(location)
 let data =  await getWeather(location,countryCode);
 console.log(data)
 let temp = data.list[0].main.temp
 let humidity = data.list[0].main.humidity
   let stringTemperature = "The temperature is currently: "
 // let clouds = data.list[0].all.clouds
 res.render('index',{data:{temp,humidity}})
})
app.listen(3000,()=>{
 console.log("port 3000! ")
})
//Listening on the local host port 3000