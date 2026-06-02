export const  formatTemperature = (temperatur: number) : number => {

    const kelvin = 273.15

    return parseInt((temperatur - kelvin).toString())



}