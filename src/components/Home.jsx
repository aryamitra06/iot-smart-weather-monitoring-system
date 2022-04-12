import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { fetchData, fetchForecastData } from '../API/api'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var current = new Date();
let date = current.toLocaleDateString();
var day = days[current.getDay()];

function Home() {
    const initialValue ={
        query: ''
    }
    const [query, setQuery] = useState(initialValue);
    //<-------Weather------>
    const [name, setName] = useState([]);
    const [country, setCountry] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [temp, setTemp] = useState([]);
    const [visibility, setVisibility] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [wind, setWind] = useState([]);
    const [feelslike, setFeelslike] = useState([]);
    const [weather, setWeather] = useState([]);
    const [lon, setLon] = useState([]);
    const [lat, setLat] = useState([]);
    // <------------------ FORECAST---------------->
    //for 3 pm
    const [firsttemp, setfirsttemp] = useState([]);
    const [firsthum, setfirsthum] = useState([]);
    //for 6 pm
    const [secondtemp, setsecondtemp] = useState([]);
    const [secondhum, setsecondhum] = useState([]);
    //for 9 pm
    const [thirdtemp, setthirdtemp] = useState([]);
    const [thirdhum, setthirdhum] = useState([]);
    //for 12 am
    const [forthtemp, setforthtemp] = useState([]);
    const [forthhum, setforthhum] = useState([]);
    
    const onValueChange = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value })
    }
    
    const searchPlace = async () => {

            sessionStorage.setItem("local", query.query.toString());

            const response = await fetchData(query.query.toString() || sessionStorage.getItem("local"));
            setName(response.data.name)
            setCountry(response.data.sys.country)
            setTemp((response.data.main.temp/10).toString().slice(0,4))
            setPressure(response.data.main.pressure)
            setVisibility(response.data.visibility/1000)
            setHumidity((response.data.main.humidity))
            setWind(response.data.wind.speed)
            setFeelslike((response.data.main.feels_like/10).toString().slice(0,4))
            setWeather(response.data.weather[0].main)
            setLon(response.data.coord.lon);
            setLat(response.data.coord.lat);        
            const forecastresponse = await fetchForecastData(query.query.toString() || sessionStorage.getItem("local"));
            //for 3 pm
            setfirsttemp(forecastresponse.data.list[0].main.temp/10)
            setfirsthum(forecastresponse.data.list[0].main.humidity)
            //for 6 pm
            setsecondtemp(forecastresponse.data.list[1].main.temp/10)
            setsecondhum(forecastresponse.data.list[1].main.humidity)
            //for 9 pm
            setthirdtemp(forecastresponse.data.list[2].main.temp/10)
            setthirdhum(forecastresponse.data.list[2].main.humidity)
            //for 12 am
            setforthtemp(forecastresponse.data.list[3].main.temp/10)
            setforthhum(forecastresponse.data.list[3].main.humidity)
    }


    useEffect(()=> {
        // getForeCasteData();
        // getWeatherData();
        searchPlace();
        // eslint-disable-next-line
    }, [])
    
    //chart
    const chartdata = {
        labels: ['Feels Like Temperature', 'Original Temperature'],

        options: {  
            responsive: true,
            maintainAspectRatio: false
        },
        datasets: [
          {
            data: [feelslike, temp],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    const labels = ['3 PM', '6 PM', '9 PM', '12 AM'];

    const bardata = {
        labels,
        datasets: [
          {
            label: 'Humidity (%)',
            data: [firsthum, secondhum, thirdhum, forthhum],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Temperature (°C)',
            data: [firsttemp, secondtemp, thirdtemp, forthtemp],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };


    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <div className="navbar-brand">iWeather</div>
                    <div className="d-flex">
                        <input onChange={(e) => onValueChange(e)} name="query" className="form-control me-2" placeholder="Search Place"/>
                            <button onClick={() => searchPlace()} className="btn btn-dark">Search</button>
                    </div>
                </div>
            </nav>

            <div className="container container-overview">
                <div className="container-overview-child-1">
                <h4><strong>{name}, {country}</strong> ({lat}&deg;N, {lon}&deg;E)</h4>
                <h6>{day}, {date}</h6>
                </div>
                <div className="container-overview-child-2">
                    <h1>{temp}&deg;C</h1>
                </div>
            </div>

            <div className="container container-more-overview">
            <div className="pressure">
                    <p className="more-overview-title">Type</p>
                    <p className="more-overview-value">{weather}</p>
                </div>

                <div className="pressure">
                    <p className="more-overview-title">Pressure</p>
                    <p className="more-overview-value">{pressure}mb</p>
                </div>
                <div className="visibility">
                    <p className="more-overview-title">Visibility</p>
                    <p className="more-overview-value">{visibility} Km</p>
                </div>
                <div className="humidity">
                    <p className="more-overview-title">Humidity</p>
                    <p className="more-overview-value">{humidity}%</p>
                </div>
                <div className="wind">
                    <p className="more-overview-title">Wind</p>
                    <p className="more-overview-value">{wind}Km/h</p>
                </div>
            </div>

            <div className="container charts-container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 col-sm-3">
                <Pie data={chartdata} />
                    </div>
                    <div className="col-md-6 col-sm-6">
                    <Bar data={bardata} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home