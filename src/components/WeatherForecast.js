import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DailyForecast from './DailyForecast';
import { WiDaySunny, WiCloud, WiDayRain, WiDaySnow } from 'weather-icons-react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './WeatherForecast.css';

const WeatherForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [main,setMain]=useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const [currentTempResponse, forecastResponse] = await Promise.all([
        //   axios.get('https://api.openweathermap.org/data/2.5/weather?q=boston&units=metric&APPID=767ca9c391439e1addd64f3fcbbf1033'),
        //   axios.get('https://api.openweathermap.org/data/2.5/forecast?q=boston&units=metric&APPID=767ca9c391439e1addd64f3fcbbf1033')
        // ]);
        const [currentTempResponse, forecastResponse] = await Promise.all([
            axios.get('https://api.openweathermap.org/data/2.5/weather?q=boston&units=metric&APPID=c2592cac55bd26e750168cefc407d089'),
            axios.get('https://api.openweathermap.org/data/2.5/forecast?q=boston&units=metric&APPID=c2592cac55bd26e750168cefc407d089')
          ]);
  
        setCurrentTemp(currentTempResponse.data.main.temp);
        setMain(currentTempResponse.data.weather[0].main)
        setForecastData(forecastResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Rain':
        return <WiDayRain />;
      case 'Clouds':
        return <WiCloud />;
      case 'Snow':
        return <WiDaySnow />;
      default:
        return null;
    }
  };
  

//   console.log("currentTemp===== ",currentTemp)
//         console.log("forecastdata=== ",forecastData)
  

return (
    <Container fluid>
      <Row className="justify-content-md-center align-items-center headline-container">
        <Col md="auto">
          <h2 className="header">
            {getWeatherIcon(main)}
            <span className="weather-description">Boston Current Temperature: {currentTemp}°C</span>
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="forecast-container">
          <DailyForecast forecastData={forecastData} />
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherForecast;
