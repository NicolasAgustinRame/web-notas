const nombreElement = document.getElementById("nombre");



function agregarNombre(nombreValor){
    const nuevoContenido = `Hola, ${nombreValor}!`;
    nombreElement.innerText = nuevoContenido;

    localStorage.setItem("nombreUsuario", nombreValor)
};

window.addEventListener("load", ()=> {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if(nombreGuardado){
        agregarNombre(nombreGuardado);
    }
    else{
        mostrarAlerta();
    }
})

function mostrarAlerta() {
    Swal.fire(
        {
            title: '¡Ingresa tu nombre!',
            input: 'text',
            confirmButtonText: 'ENVIAR',
            preConfirm: (nombreValor) => {
                agregarNombre(nombreValor);
        }
    })
}
