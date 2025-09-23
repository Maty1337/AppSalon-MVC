let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
};


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

    consultarAPI(); //Consulta la API de PHP
    nombreCliente(); //Agrega el nombre del cliente al objeto de cita
    SeleccionarFecha();  //Deshabilitar días pasados
    SeleccionarHora(); //Deshabilitar días pasados

    mostrarResumen(); //Muestra el resumen de la cita (o mensaje de error)
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

        mostrarResumen(); //Cuando se llega al paso 3, mostrar el resumen
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

async function consultarAPI() {
    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        
        const nombreServicio = document.createElement('P');
        nombreServicio.textContent = nombre;
        nombreServicio.classList.add('nombre-servicio');

        const precioServicio = document.createElement('P');
        precioServicio.textContent = `$ ${precio}`;
        precioServicio.classList.add('precio-servicio');

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() { seleccionarServicio(servicio) };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

 function seleccionarServicio(servicio) {
    const { id } = servicio;
    const {servicios} = cita;

    //Seleccionar el DIV con el servicio que se dio click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    if (servicios.some(agregado => agregado.id === id)) {
        //Eliminar
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
        return;
    } else{
        //Agregar
        cita.servicios = [...servicios, servicio];  
        divServicio.classList.add('seleccionado');
    }

    cita.servicios = [...servicios, servicio];
   }

function nombreCliente() {
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
}

function SeleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {
        const dia = new Date(e.target.value).getUTCDay();
        if ([0,6].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no son permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function SeleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        if (hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora no válida', 'error', '.formulario');
        }
        else {
            cita.hora = e.target.value;
        }
    });
}


function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    //Previene que ya exista una alerta

    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    //Crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    //Insertar en el HTML
    //Seleccionar el lugar donde se va a insertar la alerta
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
        //Eliminar la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    // Limpiar el contenido de resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    console.log(cita);

    if(Object.values(cita).includes('') || cita.servicios.length === 0) { 
        mostrarAlerta('Faltan datos de la cita, revisa el formulario', 'error', '.contenido-resumen', false);
        return;
    }

    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    // Formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita;

    // Crear el contenedor de servicios
    const serviciosCliente = document.createElement('DIV');
    serviciosCliente.classList.add('servicios-cliente');

    // Iterar sobre los servicios
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $ ${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        serviciosCliente.appendChild(contenedorServicio);    
    });

    // Header de cita
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    // Mostrar el resumen
    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    // Formatear la fecha
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia));

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const FechaFormateada = fechaUTC.toLocaleDateString('es-AR', opciones);

    const fechaCliente = document.createElement('P');
    fechaCliente.innerHTML = `<span>Fecha:</span> ${FechaFormateada}`;

    const horaCliente = document.createElement('P');
    horaCliente.innerHTML = `<span>Hora:</span> ${hora}`;

    // Botón para crear la cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCliente);
    resumen.appendChild(horaCliente);
    resumen.appendChild(serviciosCliente); // <-- Ahora sí existe

    resumen.appendChild(botonReservar);
}   


function reservarCita() {
    console.log('Reservando cita...');
}

       
    