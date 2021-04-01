const { default: axios } = require("axios");

class Clima {


    constructor() {
        
    }

    get paramsClima() {
        return {
            
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es',

        }
    }

    async climaCiudad(lat, lon) {
        
        try {
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsClima, lat,lon },
            });
            const res = await intance.get();
            const {weather, main } = res.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = Clima;