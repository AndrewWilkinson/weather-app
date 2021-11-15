import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import Forecast from './Forecast'
import axios from "axios";
import 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

//let vaidCall = "https://api.openweathermap.org/data/2.5/onecall?lat=53.38&lon=1.47&exclude=current,minutely,hourly,alerts&appid=49bb050875cb1db5d0c044d423eb3c5c"

const APIkey = "49bb050875cb1db5d0c044d423eb3c5c"

var cities = {
  Sheffield:
    { lat: 53.38, lon: 1.47 },
  London:
    { lat: 51.50, lon: 0.12 },
  Edinburgh:
    { lat: 55.95, lon: 3.18 },
}

const chosenCity = "Sheffield";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const date = new Date();
const todayDayName = dayNames[date.getDay()];
const eightDayNames = dayNames.slice(date.getDay()).concat(dayNames.slice(0, date.getDay() + 1)) //logic error?


// var weather = {}
// axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cities[chosenCity].lat}&lon=${cities[chosenCity].lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${APIkey}`)
// .then(response => {
//   weather = response.data
// })
// .catch(error => console.error(error))

function App() {

  const [chosenCity, setValue] = useState('Sheffield');

  const [weather, changeWeather] = useState(
    {}
  );

  const [fetching, changeFetching] = useState(false);

  const updateWeather = (responseObject) => {
    changeWeather(
      responseObject
    )
  };

  const responseStatusCheck = (responseObject) => {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return Promise.resolve(responseObject);
    }
    else {
      return Promise.reject(new Error(responseObject.statusText))
    }
  }

  const refreshWeather = () => {
    changeFetching(true);

    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cities[chosenCity].lat}&lon=${cities[chosenCity].lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${APIkey}`)
      .then(responseStatusCheck)
      .then((jsonResponse) => {
        updateWeather(jsonResponse.data)
      })
      .catch((error) => { console.log(error) })
      .finally((state) => changeFetching(false));
  }

  useEffect(() => {
    refreshWeather();
  }
    , []);


  var citySelector = (<></>)

  // citySelector = cities.map((city) =>
  // <Dropdown.Item eventKey={city.stringify()}>{city.stringify()}</Dropdown.Item>
  // );

  let cities = {
    Sheffield:
      { lat: 53.38, lon: 1.47 },
    London:
      { lat: 51.50, lon: 0.12 },
    Edinburgh:
      { lat: 55.95, lon: 3.18 },
  }

  console.log(Object.keys(cities))    //being called 3 times per selection

  const handleCitySelect = (e) => {
    setValue(e);
      refreshWeather();
  }

  citySelector = Object.keys(cities).map((city, cityIndex) =>
    < Dropdown.Item eventKey={Object.keys(cities)[cityIndex]} onSelect={handleCitySelect}
    >
      {Object.keys(cities)[cityIndex]}
    </Dropdown.Item>
  );


  return (
    <div className="App">
      <header className="App-header">

        <DropdownButton
          title="Select City"
          id="dropdown-menu-align-right"
          onSelect={handleCitySelect}
        >
          {citySelector}
        </DropdownButton>


        <Forecast chosenCity={chosenCity} forecast={weather.daily ? weather.daily : undefined} nextEightDayNames={eightDayNames} />
      </header>
    </div>
  );
}

export default App;
