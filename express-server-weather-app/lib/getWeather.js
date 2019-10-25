const request = require('request');
const {promisify} = require('util');
const APPID = '972aa2129e6ea3af3d902a07b5f992d5';

const promisifyRequest =  promisify(request);

const getWeather = async function (location, countryCode){
    let data = await promisifyRequest({
        url: `https://api.openweathermap.org/data/2.5/find?q=${location},${countryCode}&APPID=${APPID}`,
        json: true
    });
    return data.body;
};
module.exports = getWeather;