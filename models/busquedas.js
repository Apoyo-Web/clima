const { default: axios } = require("axios");

class Busquedas{

    historial = [];


    constructor() {
        
        //Leer DB
    }

    get paramsMapbox() {
        return {
            
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'language': 'es',

            
        }
    }

    async ciudad(lugar = '') {
        //peticion http
        // console.log('Ciudad: ', lugar);
        try {

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,

            });
            const res = await intance.get();
            console.log(res.data);
            return []; // retornar ciudad
            
        } catch (error) {
            return [];
        }

    }
}


module.exports = Busquedas;