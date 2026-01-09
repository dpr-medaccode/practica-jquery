const texto = document.querySelector("#texto")
const body = document.querySelector("#body")

let random = (minimo, maximo) => Math.random() * (maximo - minimo) + minimo;

let cambiar_fondo_suave = color => body.style.backgroundColor = color;

let cambiar_fondo_inmediato = (color) => {

    body.classList.add("sin_transicion")
    body.style.backgroundColor = color
    body.offsetHeight
    body.classList.remove("sin_transicion")

}

let cambiar_texto = texto_nuevo => texto.textContent = texto_nuevo

let sleep = segundos => new Promise(resolve => setTimeout(resolve, segundos))

const ESTADOS = {

    SIN_EMPEZAR: 0,
    EXPLICACION: 1,
    ESPERANDO_SLEEP: 2,
    ESPERANDO_CLICK: 3,
    MOSTRANDO_TIEMPO: 4

}

let inicio = -1;

let estado = ESTADOS.SIN_EMPEZAR

body.addEventListener("click", async () => {

    switch (estado) {

        case ESTADOS.SIN_EMPEZAR:

            estado = ESTADOS.EXPLICACION
            cambiar_texto("Haga click lo antes posible cuando cambie el fondo, para empezar haga click")

            break;

        case ESTADOS.EXPLICACION:

            estado = ESTADOS.ESPERANDO_SLEEP

            cambiar_texto("...")

            let tiempo = random(1000, 5000)

            await sleep(tiempo)

            inicio = performance.now()

            estado = ESTADOS.ESPERANDO_CLICK

            cambiar_fondo_inmediato("red")

            cambiar_texto("YA")

            break;

        case ESTADOS.ESPERANDO_SLEEP:

            break;

        case ESTADOS.ESPERANDO_CLICK:

            cambiar_fondo_suave("darkblue")

            let fin = performance.now()

            cambiar_texto(`tardaste ${fin - inicio} milisegundos, click para volver a empezar`)

            estado = ESTADOS.EXPLICACION

            break;

        default:

            throw new Error(`Estado desconocido: ${estado}`);

            break;
    }

})

