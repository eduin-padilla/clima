import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import React, {useState, type ChangeEvent} from "react"
import type { SearchType } from "../../type";
import Alert from "../alert/Alert";


type FormProps = {

    fecthWeather: (search: SearchType) => Promise<void>
}

export default function Form({fecthWeather}: FormProps) {


    const [search, setSearch] = useState<SearchType>({

        city: '',
        country: ''
    })


    const [alert, setAlert] = useState('')

    
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    } 
    const habldleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        fecthWeather(search)
    }


  return (
    <form className={styles.form}
    onSubmit={habldleSubmit}
    >
        {alert && <Alert> {alert} </Alert>}

        <div className={styles.field}>
            <label htmlFor="city">
                Ciudad:
            </label>

            <input
                id="city"
                name="city"
                placeholder="Ciudad"
                type="text" 
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">
                país
            </label>

            
            <select 
            name="country"
            id="country"
            value={search.country}
            onChange={handleChange}
            >
                <option value="">--Seleccione un Pais--</option>
                {countries.map(country => (
                    
                    <option
                    key={country.code} 
                    value={country.code}
                    >
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
        <input className={styles.submit} type="submit" value="Consultar clima"/>
    </form>
  )
}
