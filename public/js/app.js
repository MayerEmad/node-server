console.log('client side javascript is loaded')


const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const masseageOne= document.querySelector('#message-1')
const masseageTwo= document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address=search.value
    
    masseageOne.textContent='loading...'
    masseageTwo.textContent=''

    fetch('/weather?address='+address).then(
        (response)=>{
                response.json().then((data)=>{
                   if(data.error){
                       masseageOne.textContent=data.error
                       //console.log(data.error)
                   }else{
                       masseageOne.textContent=data.place
                       masseageTwo.textContent=data.forecast
                       //console.log(data.forecast) console.log(data.place)
                   }
                })
    })
   
})