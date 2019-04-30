const request= require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFwbGVicmUiLCJhIjoiY2p1eHdqZWlqMGJseDRjbXhlMHNnc3dqciJ9.3PFVZy0RW9manvrVCEJBHA&limit=1&language=pt'

    request ({ url, json: true }, (error,  {body}) => {
        if (error) {
            callback('Falha ao conectar ao serviço de localização', undefined)
        }
        else if (body.features.length === 0) {
            callback('Localização não encontrada', undefined)
        }
        else {
            callback(undefined, {
                local: body.features[0].place_name_pt,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode