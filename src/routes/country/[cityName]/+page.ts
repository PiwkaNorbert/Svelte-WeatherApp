
export const load = ({fetch,params})=>{
    const WeatherKey = import.meta.env.VITE_API_KEY
    
    const fetchWeatherData = async (value:string) => 
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${WeatherKey}`)
        .then(res=>res.json())
        .then(data=>data)



return {
    weatherApiReturn: fetchWeatherData(params.cityName.toLowerCase().replace(/\s/g, "+").trim())
}
 
}

