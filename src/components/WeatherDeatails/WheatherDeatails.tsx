
import { formatTemperature } from '../../helpers'
import type { Weather } from '../../hooks/UseWeather'
import styles from './WeatherDetails.module.css'


type WeatherDeatilsProps = {

    weather: Weather

}


export default function WheatherDeatails({ weather }: WeatherDeatilsProps) {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>

        <div className={styles.temperatures}>
            <p>Min:<span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        </div>
    </div>
  )
}
