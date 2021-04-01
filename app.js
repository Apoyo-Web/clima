const inquirer = require("inquirer");
const { inquirerMenu, inquirerPausa, leerInput, listarLugares } = require("./helper/inquirer");
const Busquedas = require("./models/busquedas");
const axios = require('axios');
const Clima = require("./models/clima");
require('dotenv').config();



const app = async () => {
    
    const busqueda = new Busquedas();
    const temperatura = new Clima();
    
    let opt;
do {
    opt = await inquirerMenu();
    
    switch (opt) {
        case 1:
            
            const buscarCiudad = await leerInput('Ciudad: ');
            const lugares = await busqueda.ciudad(buscarCiudad);
            const id = await listarLugares(lugares);

            if (id === '0') continue;

            const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

            busqueda.historialBusqueda(lugarSeleccionado.nombre);
            const temp = await temperatura.climaCiudad(lugarSeleccionado.lat, lugarSeleccionado.lng);
            



            console.log('\nInformación de la ciudad\n'.green);
            console.log('Ciudad:', lugarSeleccionado.nombre);
            console.log('Lat:', lugarSeleccionado.lat);
            console.log('Lng:', lugarSeleccionado.lng);
            console.log('Temperatura: ', temp.temp);
            console.log('Mínima: ',temp.min);
            console.log('Máxima: ', temp.max);
            console.log('Cielos: ', temp.desc.yellow);

            
            
            await inquirerPausa();
            
            break;
    
        case 2:
            busqueda.historialMayus.forEach((ciudad, i) => {
                const id = `${i + 1}`.green;
                console.log(`${id}: ${ciudad} `);
            })
            await inquirerPausa();
            break;
        case 0:
            console.log("Opción 0");
            break;
    }

} while (opt !== 0);



    
}


app();