import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import {useState, type ChangeEvent} from "react"
import type { SearchType } from "../../type";

export default function Form() {
    

    const [search, setSearch] = useState<SearchType>({

        city: '',
        country: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    } 


  return (
    <form className={styles.form}>

        <div className={styles.field}>
            <label htmlFor="city">
                Ciudad:
            </label>

            <input
                id="city"
                name="city"
                placeholder="clima"
                type="text" 
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">
                Pais
            </label>

            <option value="">-- Seleccione un pais --</option>
            <select 
            name="country"
            id="country"
            value={search.country}
            onChange={handleChange}
            >
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
