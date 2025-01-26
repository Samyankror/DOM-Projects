

document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById('city-input');
    const weatherButton=document.getElementById('get-weather-btn');
    const weatherInfo=document.getElementById('weather-info');
    const cityNameDisplay=document.getElementById('city-name');
    const temperatureDisplay=document.getElementById('temperature');
    const temperatureDes=document.getElementById('description');
    const errorMessage=document.getElementById('error-message');

    const API_KEY='949e207d425d1503825dacd33e5a5017';

    weatherButton.addEventListener('click',async ()=>{
        let city=cityInput.value.trim();
        if(!city) return;

        // it may throw an error
        // severs/database is always in another continent

        try{
             let data=await fetchWeatherData(city); 
             displayWetherData(data);
        }
        catch(e){
            showError();
        }

    })

    async function fetchWeatherData(city){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        let response=await fetch(url); 
        
        if(!response.ok){
            throw  new Error("city not found");
        }
        const data=await response.json();
        return data;
    }

    function displayWetherData(data){
      
      const {name,main,weather}=data;
     
      cityNameDisplay.innerText=name;
      temperatureDisplay.innerText=`Temperature : ${main.temp}`
      temperatureDes.innerText=`Weather : ${weather[0].description}`;

      weatherInfo.classList.remove('hidden');
      errorMessage.classList.add('hidden');
    }
    function showError(){
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');

    }
})