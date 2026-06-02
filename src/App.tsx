import styles from "./App.module.css"
import Alert from "./components/alert/Alert"
import Form from "./components/Form/Form"
import Spinner from "./components/Spinner/Spinner"
import WheatherDeatails from "./components/WeatherDeatails/WheatherDeatails"
import useWeather from "./hooks/UseWeather"

function App() {

  

  const { fetchWeather, loading,weather, notFound, hasWeatherData} = useWeather()

    console.log('weather:', weather)
    console.log('hasWeatherData:', hasWeatherData)
  

  return (
    <>
      <h1 className={styles.title} >Clima</h1>
      <div className={styles.container}>
        <Form
          fecthWeather={fetchWeather}
        />
        {loading && <Spinner/>}
        {hasWeatherData && <WheatherDeatails weather={weather}/>}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
        
      </div>
    </>
  )
}

export default App
