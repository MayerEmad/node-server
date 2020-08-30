const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ latitude+','+longitude+
    '.json?access_token=pk.eyJ1IjoibWF5ZXItZW1hZCIsImEiOiJja2ViZ2czZWcwOGl4MnJueHk3ZnNhdmtqIn0.F_WM2TVC946TCbOwcgC8Lw'
    // shortHand url:url
    request({url,json:true},(error,response)=>
    {
        if(error){
            callback('unable to connect to location service',undefined)
        }else if(response.body.features.length===0){
            callback('unable to find location with this coordinates',undefined)
        }else{
            callback(undefined,response.body.features[0].place_name)
        }
    })
}
module.exports=forecast