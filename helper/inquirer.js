const inquirer = require('inquirer');
const colors = require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`,
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`,
            },
            
        ]
    }];



const inquirerMenu = async() => {
    
    console.clear();

    console.log('======================='.green);
    console.log('=Seleccione una opción='.white);
    console.log('=======================\n'.green);

    const {opcion}  = await inquirer.prompt(preguntas);
    return opcion;
};



const inquirerPausa = async () => {
    
    const question = [
        {
        type: 'input',
        name: 'enter',
        message: `Pulse ${'ENTER'.green} para continuar`,
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
    


};

const leerInput = async (mensaje) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese una ciudad';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas) => {
    
    

    const choices = tareas.map((tarea, i) => {

        const ix = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${ix} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar',
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices,
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
    
}

const confirmar = async(mensaje) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            mensaje,


        }
        
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;

};

const mostrarListadoCheck = async (tareas) => {
    
    

    const choices = tareas.map((tarea, i) => {

        const ix = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${ix} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,
        }
    });


    const preguntas = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Seleccione',
            choices,
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
    
}
module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheck,
}