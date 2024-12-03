import React, { useEffect, useState, useRef } from 'react'
import Header from '../../componnents/Header/Header'
import SideBar from '../../componnents/Sidebar/Sidebar'
import axios from 'axios'

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const inputRef = useRef();
  const [forecast, setForecast] = useState(null)
  const [air, setAir] = useState(null)
  const API = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
  })
  const API_KEY = 'a0397a8aa6e8887e69e641f3b7f23484'
  const city_name = `tashkent`
  const [location, setLocation] = useState({ lan: null, lat: null })
  const [error, setError] = useState(null)

  useEffect(() => {
    API.get(`/weather?q=tashkent&appid=${API_KEY}&units=metric`).then((res) =>
      setCurrentWeather(res.data)
    );
    API.get(`/forecast?q=tashkent&appid=${API_KEY}&units=metric`).then((res) =>
      setForecast(res.data)
    );
  }, []);




  useEffect(() => {
    API.get(`/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`).then((res) =>
      setCurrentWeather(res.data)
    );

    API.get(`/forecast?lat=${location.lat}&lon=$  {location.lon}&appid=${API_KEY}&units=metric`).then((res) =>
      setForecast(res.data)
    );

    API.get(
      `air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
    ).then((res) => setAir(res.data))

  }, [location])



  const fetchData = () => {
    API.get(`/weather?q=${inputRef.current.value}&appid=${API_KEY}&units=metric`).then((res) =>
      setCurrentWeather(res.data)
    );
    API.get(`/forecast?q=${inputRef.current.value}&appid=${API_KEY}&units=metric`).then((res) =>
      setForecast(res.data)
    );
  }



  useEffect(() => {
    if (currentWeather?.coord) {
      API.get(
        `air_pollution?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${API_KEY}`
      ).then((res) => setAir(res.data))
    }
  }, [currentWeather]);


  return (
    <>
      <Header fetchData={fetchData} inputRef={inputRef} setLocation={setLocation} setError={setError} />
      <SideBar air={air} currentWeather={currentWeather} forecast={forecast} />
    </>
  )
}

export default Home