const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=ba5ce4c25d6369a4f68b2738fdca83f9&query=New%20York'

    request({ url, json:true }, (error, {body}) => {
            if (error) {
                callback('unable to connect to weather service', undefined)
            } else if (body.error){
                callback('Unable to find location. Try another search.', undefined)
            } else {callback(undefined,'the weather code of this country is ' + body.current.weather+code + body.current.weather_descriptions + ' It is currently ' +  body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
            }   
          
           
        })  
}
//{callback(undefined,'its is currently ' + response.body.current.temperature + ' degrees out. ' + 'there is ' +  response.body.current.precip,'% chance of rain')
module.exports = forecast



