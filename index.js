
import * as dotenv from 'dotenv'
dotenv.config()

import { inquireMenu, pausa, leerInput, listarLugares } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

console.log(process.env.MAPBOX_KEY);

const main = async () => {

    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquireMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                //console.log(lugares);

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);
                //console.log(lugarSel);

                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                //Mostrar resultados
                //console.clear();
                console.log('\n Información del lugar\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min, "°C");
                console.log('Máxima:', clima.max, "°C");
                console.log('Como esta el clima: ', clima.desc.green);
                break;

            case 2:
                busquedas.leerDB()
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
        }

        console.log({ opt });

        if (opt !== 0) await pausa();

    } while (opt !== 0);
}

main();

