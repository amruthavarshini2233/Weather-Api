particlesJS("particles-js",{
particles:{
number:{value:50},
size:{value:3},
move:{speed:1}
}
});

const apiKey="d3a2c8d269ee422ca8a143547252912";

function setBackground(condition,isDay){

condition=condition.toLowerCase()

document.body.className=""

if(!isDay){
document.body.classList.add("night")
return
}

if(condition.includes("rain")){
document.body.classList.add("rain")
}

else if(condition.includes("cloud")){
document.body.classList.add("cloud")
}

else{
document.body.classList.add("clear")
}

}

function displayWeather(data){

const icon=document.querySelector(".weather-icon")

document.querySelector(".city").innerText=
`${data.location.name}, ${data.location.country}`

document.querySelector(".temp").innerText=
Math.round(data.current.temp_c)+"°C"

document.querySelector(".desc").innerText=
data.current.condition.text

document.getElementById("humidity").innerText=
data.current.humidity+"%"

document.getElementById("wind").innerText=
data.current.wind_kph+" km/h"

document.getElementById("feels").innerText=
data.current.feelslike_c+"°C"

document.getElementById("pressure").innerText=
data.current.pressure_mb+" mb"

document.getElementById("uv").innerText=
data.current.uv

document.getElementById("cloud").innerText=
data.current.cloud+"%"

document.getElementById("updateTime").innerText=
"Last Updated: "+data.current.last_updated

icon.src="https:"+data.current.condition.icon
icon.style.display="block"

setBackground(
data.current.condition.text,
data.current.is_day
)

}

async function getWeather(){

const city=document.getElementById("cityInput").value.trim()

if(!city){
alert("Enter city name")
return
}

const url=
`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

try{

const response=await fetch(url)

const data=await response.json()

if(data.error){
alert(data.error.message)
return
}

displayWeather(data)

}catch(err){

alert("Unable to fetch weather")

}

}

function getLocationWeather(){

if(!navigator.geolocation){

alert("Geolocation not supported")
return

}

navigator.geolocation.getCurrentPosition(async position=>{

const lat=position.coords.latitude
const lon=position.coords.longitude

const url=
`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`

try{

const response=await fetch(url)

const data=await response.json()

displayWeather(data)

}catch(err){

alert("Location weather error")

}

})

}

document
.getElementById("cityInput")
.addEventListener("keypress",e=>{

if(e.key==="Enter")getWeather()

})