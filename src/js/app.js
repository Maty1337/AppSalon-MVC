let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;


//Funciones principales
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); //Muestra la sección actual
    tabs(); //Habilita los tabs
    botonesPaginador(); //Habilita los botones del paginador
    paginaSiguiente();
    paginaAnterior();
}

function mostrarSeccion() {

    //Eliminar mostrar de la sección anterior
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }
    //Agregar mostrar a la sección actual
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');
    
    //Eliminar la clase actual del tab anterior
    const tabAnterior = document.querySelector('.tabs .actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }
    //Agregar la clase actual al tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    //Seleccionar y mostrar la sección correspondiente al tab presionado
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {
        if(paso <= pasoInicial) return;
        paso--;
            
        botonesPaginador();        
    })
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {
        if(paso >= pasoFinal) return;
        paso++;

        botonesPaginador();        
    })
}

//Cuando un Boton se encuentra dentro de un formulario, el comportamiento por defecto es enviar el formulario
//Para evitar esto, se puede usar e.preventDefault() en el evento click del boton