const request = require('request')

const forecast = (longitude, latitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/0081f097bdf5544607c1d9def2631ebd/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=ca&lang=pt'
    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Falha ao conectar ao serviço de meteorologia', undefined)
        }
        else if (body.error)
        {
            callback('Localização não encontrada', undefined)
        }
        else
        {
            callback (undefined, body.daily.data[0].summary + ' Estão ' + body.currently.temperature + ' graus. Existe uma probabilidade de ' + body.currently.precipProbability + '% de chuva.')
        }
    })
}

module.exports = forecast