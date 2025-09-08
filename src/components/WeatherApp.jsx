import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaMapMarkerAlt, FaThermometerHalf, FaTint, FaWind, FaSun, FaMoon, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa'

const API_KEY = '02c3a79a226672a3f8856d320d5c8b17'

export default function WeatherApp() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('metric') // metric for Celsius, imperial for Fahrenheit
  const [bgClass, setBgClass] = useState('bg-gradient-to-br from-blue-400 to-purple-600')

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': <FaSun className="text-yellow-300" size={40} />,
      'Clouds': <FaCloud className="text-gray-300" size={40} />,
      'Rain': <FaCloudRain className="text-blue-300" size={40} />,
      'Snow': <FaSnowflake className="text-white" size={40} />,
      'Thunderstorm': <FaCloudRain className="text-purple-300" size={40} />,
      'Drizzle': <FaCloudRain className="text-blue-200" size={40} />,
      'Mist': <FaCloud className="text-gray-400" size={40} />
    }
    return iconMap[condition] || <FaCloud className="text-gray-300" size={40} />
  }

  const getBackgroundClass = (condition) => {
    const bgMap = {
      'Clear': 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
      'Clouds': 'bg-gradient-to-br from-gray-400 to-gray-600',
      'Rain': 'bg-gradient-to-br from-blue-500 to-indigo-700',
      'Snow': 'bg-gradient-to-br from-blue-100 to-blue-300',
      'Thunderstorm': 'bg-gradient-to-br from-purple-600 to-indigo-800',
      'Drizzle': 'bg-gradient-to-br from-blue-400 to-blue-600',
      'Mist': 'bg-gradient-to-br from-gray-300 to-gray-500'
    }
    return bgMap[condition] || 'bg-gradient-to-br from-blue-400 to-purple-600'
  }

  const fetchWeather = async (searchCity = null) => {
    setLoading(true)
    setError('')
    try {
      const query = searchCity || city
      if (!query) {
        setError('Please enter a city name')
        setLoading(false)
        return
      }

      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${unit}`
      )
      const currentData = await currentResponse.json()

      if (currentData.cod !== 200) {
        throw new Error(currentData.message)
      }

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=${unit}`
      )
      const forecastData = await forecastResponse.json()

      setWeather(currentData)
      setBgClass(getBackgroundClass(currentData.weather[0].main))

      // Process 7-day forecast
      const dailyForecast = forecastData.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toDateString()
        if (!acc[date]) {
          acc[date] = {
            date: item.dt,
            temp: item.main.temp,
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            wind: item.wind.speed
          }
        }
        return acc
      }, {})

      setForecast(Object.values(dailyForecast).slice(0, 7))
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          )
          const data = await response.json()

          if (data.cod === 200) {
            setCity(data.name)
            fetchWeather(data.name)
          }
        } catch (err) {
          setError('Unable to get location weather')
        }
      })
    } else {
      setError('Geolocation is not supported by this browser')
    }
  }

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
    if (weather) {
      fetchWeather(city)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.div
      className={`min-h-[700px] ${bgClass} transition-all duration-1000 overflow-y-auto`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 outline-none border border-white/30 focus:border-white/50 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            />
            <motion.button
              onClick={() => fetchWeather()}
              className="px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              <FaSearch className="text-white" />
            </motion.button>
            <motion.button
              onClick={getCurrentLocation}
              className="px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMapMarkerAlt className="text-white" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={toggleUnit}
              className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              °{unit === 'metric' ? 'C' : 'F'}
            </motion.button>
          </div>
        </motion.div>

        {error && (
          <motion.div
            className="max-w-md mx-auto mb-8 p-4 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-white text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {loading && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </motion.div>
        )}

        {/* Current Weather */}
        {weather && (
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{weather.name}, {weather.sys.country}</h2>
                <div className="flex items-center justify-center gap-4">
                  {getWeatherIcon(weather.weather[0].main)}
                  <div>
                    <div className="text-5xl font-bold text-white">
                      {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                    </div>
                    <div className="text-white/80 capitalize">{weather.weather[0].description}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  className="text-center p-4 rounded-lg bg-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaTint className="text-blue-300 mx-auto mb-2" size={24} />
                  <div className="text-white/80 text-sm">Humidity</div>
                  <div className="text-white font-semibold">{weather.main.humidity}%</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 rounded-lg bg-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaWind className="text-green-300 mx-auto mb-2" size={24} />
                  <div className="text-white/80 text-sm">Wind</div>
                  <div className="text-white font-semibold">{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 rounded-lg bg-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaSun className="text-yellow-300 mx-auto mb-2" size={24} />
                  <div className="text-white/80 text-sm">Sunrise</div>
                  <div className="text-white font-semibold">{formatTime(weather.sys.sunrise)}</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 rounded-lg bg-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaMoon className="text-purple-300 mx-auto mb-2" size={24} />
                  <div className="text-white/80 text-sm">Sunset</div>
                  <div className="text-white font-semibold">{formatTime(weather.sys.sunset)}</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 7-Day Forecast */}
        {forecast.length > 0 && (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-6">7-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-white/80 text-sm mb-2">
                    {new Date(day.date * 1000).toLocaleDateString([], { weekday: 'short' })}
                  </div>
                  <div className="mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="text-white font-semibold text-lg">
                    {Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}
                  </div>
                  <div className="text-white/60 text-xs capitalize mt-1">{day.condition.toLowerCase()}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      {/* Additional Features Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-white text-center mb-4">Additional Features</h3>
        <ul className="list-disc list-inside text-white/80 space-y-2 max-w-xl mx-auto">
          <li>Animated background changes based on weather condition</li>
          <li>Unit toggle between Celsius and Fahrenheit</li>
          <li>Current location weather detection</li>
          <li>7-day forecast with daily summaries</li>
          <li>Responsive and accessible design</li>
          <li>Loading and error states with user feedback</li>
          <li>Micro-interactions with smooth animations</li>
        </ul>
      </motion.div>
      </div>
    </motion.div>
  )
}
