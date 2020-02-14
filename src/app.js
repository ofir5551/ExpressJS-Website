const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require('./weather/geocode');
const forecast = require('./weather/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views folder location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Website',
        name: 'Ofir Ben Yamin'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ofir Ben Yamin'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ofir Ben Yamin',
        helpText: 'This is some helpful text'
    })
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        name: 'Ofir Ben Yamin'
    })
});

// Server side for /weather
// API that serves forecast info
app.get('/forecast', (req, res) => {
    if (!req.query.search)
        return res.send({ error: 'You must provide a location.' })

    geocode(req.query.search, (error, geoData) => {
        if (error)
            return res.send({ error })

        forecast(geoData.latitude, geoData.longtitude, (error, forecastData) => {
            if (error)
                return res.send({ error })

            res.send({
                location: geoData.location,
                forecast: forecastData,
                search: req.query.search
            });
        })
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ofir Ben Yamin',
        errorMessage: 'Page not found!'
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});