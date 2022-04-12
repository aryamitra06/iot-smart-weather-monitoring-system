import axios from "axios";
const url = 'https://api.openweathermap.org/data/2.5/weather';
const forecasturl = 'http://api.openweathermap.org/data/2.5/forecast';
const apikey = 'e37a0bbc4a17e06504fa35ba2adc9081';
const cnt = 4;

export const fetchData = async(q) =>{
    return axios.get(`${url}?q=${q}&appid=${apikey}`);
}
export const fetchForecastData = async(q) => {
    return axios.get(`${forecasturl}?q=${q}&cnt=${cnt}&appid=${apikey}`)
}
