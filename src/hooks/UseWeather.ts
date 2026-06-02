
import axios from "axios"
import type { SearchType } from "../type"
import { z } from 'zod'
import { useMemo, useState } from "react"

    const Weather = z.object({
        name: z.string(),
        main: z.object({
            temp: z.number(),
            temp_max: z.number(),
            temp_min: z.number(),
        })
    })

    export type Weather = z.infer<typeof Weather>

    const inititalState = {
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }
    

export default function useWeather() {
    

    const [ weather, setWeather] = useState<Weather>(inititalState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        
        setLoading(true)
        setWeather(inititalState)

        
        try{
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} =  await axios(geoUrl)
            //comprobar si existe la ciudad y el pais 

            if(!data[0]){
                setNotFound(true)
                return 
            }

              
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`


            const {data: WeatherResult} =  await axios(weatherUrl)
            
            const result = Weather.safeParse(WeatherResult)
            console.log('resultado parse:', result)
            if(result.success){
                setWeather(result.data)
            }

        }catch (error){
            console.log(error)
        }finally{
            setLoading(false)
        }

    }

    const hasWeatherData = useMemo(() => weather.name !== '', [weather])

    return { 
        weather,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound
    }
}

