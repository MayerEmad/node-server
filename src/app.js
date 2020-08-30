const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'Mayer Emad'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Mayer Emad'})
})

app.get('/help',(req,res)=>{
    res.render('help',{helpText:'The help text w kda',title:'About',name:'Mayer Emad'})
})
app.get('/help/*',(req,res)=>{ 
        res.render('404',{  title:'404',name:'Mayer Emad',errorMessage:'help article not found' })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) 
         return res.send( {error:'you have to provide an address :( '} )

         geocode(req.query.address,(error,{latitude , longitude , location:place}={})=>
         {
           if(error)  
                return res.send({error})
            forecast(latitude,longitude, (forecastError,forecastData)=>  
            {            
                if(forecastError)  
                    return res.send({forecastError})
                
                    res.send({
                           'forecast':forecastData,
                            place,
                           'address':req.query.address
                        })
            })
         })

})

app.get('*',(req,res)=>{
       res.render('404',{
           title:'404',name:'Mayer Emad',errorMessage:'page not found'
        })
    })

app.listen(3000,console.log('server is running..'))