import Controller from './controller/Controller.js';
import View from './view/View.js';

// crear los años
Controller.obtenerAños();

let busqueda = {
    marca: '',
    modelo: '',
    year: '',
    precio: '',
    puertas: '',
    color: '',
    transmision: ''
};


const setBusqueda = async event => {

    let value;

    if (event.target.id == 'minimo' || event.target.id == 'maximo') {
        value = Number(event.target.value);
    }else{
        value = event.target.value;
    }

    busqueda = {
        ...busqueda,
        [event.target.id]: value
    }
}

const autos = Controller.obtenerAutos();

const mostrarAutos = async autos => {
    const container = document.getElementById('resultado');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmision: ${auto.transmision} - Precio: ${auto.precio} Color: ${auto.color}`

        container.appendChild(autoHTML);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await mostrarAutos([...autos]);
});

document.querySelectorAll('.row .columns').forEach(select => select.addEventListener('input', async event => {
    try {
        await setBusqueda(event);
        const results = await Controller.filtrarAuto(busqueda);
        
        if (!results.status) {
            console.log(results);
            await mostrarAutos(results);
        }else{
            await View.mostrarError('No se encontro resultados');
        }

        await View.mostrarTotalResultado(results.length);

    } catch (error) {
        console.error(error)
    }
}));
