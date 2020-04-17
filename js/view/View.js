const mostrarError = async mensaje => {
    const container = document.getElementById('resultado');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode(mensaje));

    container.appendChild(noResultado);
}

const mostrarTotalResultado = async total => {
    const container = document.getElementById('cantidadResultado');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (!total) {
        total = 0;
    }

    container.appendChild(document.createTextNode(`${total} -`));
}
 
export default {
    mostrarError,
    mostrarTotalResultado
};