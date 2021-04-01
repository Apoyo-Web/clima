const fs = require('fs');

const { default: axios } = require("axios");

class Busquedas{

    historial = [];
    dbRuta= './db/db.json'


    constructor() {
        
        this.leerHistorial();
    }

    get paramsMapbox() {
        return {
            
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'language': 'es',

            
        }
    }

    get historialMayus() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
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
            return res.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
                
            }));
            
            
        } catch (error) {
            return [];
        }

    }

    historialBusqueda(ciudad) {

        if (this.historial.includes(ciudad.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(ciudad.toLocaleLowerCase());

        this.guardarHistorial();
    }

    guardarHistorial() {
        fs.writeFileSync(this.dbRuta, JSON.stringify(this.historial));
    }

    leerHistorial() {
        if (!fs.existsSync(this.dbRuta)) {
            return;
        }
            const datos = fs.readFileSync(this.dbRuta, { encoding: 'utf-8' });
            const histo = JSON.parse(datos);
        this.historial = histo;
        }
    
}



module.exports = Busquedas;