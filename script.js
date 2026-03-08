particlesJS("particles-js",{
particles:{
number:{value:50},
size:{value:3},
move:{speed:1}
}
});

const apiKey="d3a2c8d269ee422ca8a143547252912";

let map
let marker

function initMap(lat,lon){

if(!map){

map=L.map('map').setView([lat,lon],10)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{maxZoom:19}
).addTo(map)

}

if(marker){
marker.remove()
}

marker=L.marker([lat,lon]).addTo(map)

map.setView([lat,lon],10)

}

function displayWeather(data){

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

document.querySelector(".weather-icon").src=
"https:"+data.current.condition.icon

document.querySelector(".weather-icon").style.display="block"

initMap(data.location.lat,data.location.lon)

}

async function getWeather(){

const city=document.getElementById("cityInput").value

const url=
`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

const response=await fetch(url)

const data=await response.json()

displayWeather(data)

}

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(async position=>{

const lat=position.coords.latitude
const lon=position.coords.longitude

const url=
`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`

const response=await fetch(url)

const data=await response.json()

displayWeather(data)

})

}

const input=document.getElementById("cityInput")
const suggestions=document.getElementById("suggestions")

input.addEventListener("input",async()=>{

const query=input.value

if(query.length<3){
suggestions.innerHTML=""
return
}

const res=await fetch(
`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`
)

const data=await res.json()

suggestions.innerHTML=""

data.forEach(place=>{

const div=document.createElement("div")

div.innerText=
`${place.name}, ${place.region}, ${place.country}`

div.onclick=()=>{

input.value=place.name
suggestions.innerHTML=""
getWeather()

}

suggestions.appendChild(div)

})

})

window.onload=getLocationWeather
