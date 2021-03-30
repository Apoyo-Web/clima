const inquirer = require("inquirer");
const { inquirerMenu, inquirerPausa, leerInput } = require("./helper/inquirer");
const Busquedas = require("./models/busquedas");
const axios = require('axios');
require('dotenv').config();



const app = async () => {
    
    const busquedas = new Busquedas();
    
    let opt;
do {
    opt = await inquirerMenu();
    
    switch (opt) {
        case 1:
            
            const lugar = await leerInput('Ciudad: ');
            await busquedas.ciudad(lugar);



            console.log('\nInformación de la ciudad\n'.green);
            console.log('Ciudad: ');
            console.log('Lat: ');
            console.log('Lng: ');
            console.log('Temperatura: ');
            console.log('Mínima: ');
            console.log('Máxima: ');
            await inquirerPausa();
            
            break;
    
        case 2:
            console.log("Opción 2");
            await inquirerPausa();
            break;
        case 0:
            console.log("Opción 0");
            break;
    }

} while (opt !== 0);



    
}


app();