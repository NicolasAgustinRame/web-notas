const fecha = document.querySelector('#fecha')
const hora = document.querySelector('#hora')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineTrougth = 'line-through'
let id 
let LIST



//fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month:'long', day:'numeric'} )

//hora
function currentTime() {
    let date = new Date()
    let hh = date.getHours()
    let mm = date.getMinutes()
    let ss = date.getSeconds()

    hh = (hh < 10) ? "0" + hh : hh
    mm = (mm < 10) ? "0" + mm : mm
    ss = (ss < 10) ? "0" + ss : ss

    let time = hh + ":" + mm + ":" + ss
    let watch = document.querySelector('#hora')
    watch.innerHTML = time;
}

setInterval(currentTime, 1000)



//funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if(eliminado){
        return
    }
    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineTrougth : ''

    const elemento =`
                    <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id=${id}></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id=${id}></i>
                    </li>
                    `
    lista.insertAdjacentHTML("beforeend", elemento);
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }
})

document.addEventListener('keyup', function(event){
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value = ''
        id++
        console.log(LIST)
        }
    }
})

lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;

    if(elementData === 'realizado')
    {
        tareaRealizada(element)
    }
    else if (elementData === 'eliminado')
    {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineTrougth)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}
else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}
