const path = require('path')
const express = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
// port = port dado pelo processo ou 3000 se não existir

const publicDirPath = path.join(__dirname, '../public')
const hbs = require('hbs')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Muda a pasta de handlebars da predefinida para 'templates'
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Serviço de Meteorologia',
        name: 'Ruben Lebre'
    })
})

app.get('/sobre', (req, res) => {
    res.render('about',{
        title: 'Sobre o website',
        name: 'Ruben Lebre'
    })
})

app.get('/ajuda', (req, res) => {
    res.render('help',{
        title: 'Ajuda',
        name: 'Ruben Lebre',
        message: 'Mensagem de ajuda'
    })
})

// app.use(express.static(path.join(__dirname, '../public')))
// também funciona

/* app.get('', (req, res) => { // request, response
    res.send('<h1>Weather</h1>')
}) Desnecessário pois já tenho ficheiro index */

app.get('/meteorologia', (req, res) =>{

    if (!req.query.address)
    {
        return res.send({
            error: 'Localização não fornecida'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, local} = {}) => {
        if (error)
        {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, dataForecast) => {
            if (error)
            {
                return res.send({error})
            }

            res.send({
                local,
                forecast: dataForecast,
                address: req.query.address
            })
        })
    })

    
})

/* app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error: 'Insira um termo de pesquisa'
        })
    }
    // também posso utilizar else aqui
    // em vez de return em cima
    console.log(req.query.search)
    res.send({
        products: []
    })
}) */

app.get('/ajuda/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Artigo de ajuda não encontrado',
        name: 'Ruben Lebre'
    })
})

// * = tudo menos as definidas (ex: about, help, etc.)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Página não encontrada',
        name: 'Ruben Lebre'
    })
})

/*  app.com ( app.get('', ...) ) / root url
    app.com/help ( app.get('help', ...) )
    app.com/about ( app.get('about', ...) ) */ 

// port 3000, comum para development, para localhost
// ou port definido pelo processo, se houver
app.listen(port, () =>{
    console.log('Servidor ligado na porta ' + port)
})