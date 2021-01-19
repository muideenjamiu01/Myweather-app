const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index',{
        title:'weather',
        name:'muhammed jamiu'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helptext:'how do i help you james?',
        title:'Help',
        name:'Muhammed Jamiu'
    })

})
app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'muhammed jamiu'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return  res.send({
             error:'you must provide an Address'
        })

    }
        
     geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
            if(error){
                return res.send({error})

            }

            forecast(latitude,  longitude,  (eroor, forecastData) =>{

                if(error){
                    return res.send({error})
    
                }
                res.send({
                   forecast:forecastData,
                   location,
                   address:req.query.address 
                })
            })

        })
    
    
})

app.get('/products',(req, res) =>{
    if(!req.query.search) {
       return  res.send({
            error:'you must provide a search term'
        })

    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


//setting the 404 Error page
app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Muhammed Jamiu',
        errorMessage:'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage:'Page not Found',
        title:'404',
        name:'Muhammed Jamiu'
    })

})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


