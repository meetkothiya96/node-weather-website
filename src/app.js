const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const exp = require('constants')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Meet Kothiya'
    })
})

//app.com/about
app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Meet Kothiya'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping hands',
        name: 'Meet Kothiya'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided!!'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude ,(error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Must provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Meet Kothiya'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found!!',
        title: '404',
        name: 'Meet Kohtiya'
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})