const elementos = document.querySelector("#elementos")

const gato = "../public/gato.png"
const leon = "../public/leon.png"

const btn_fondo = document.querySelector("#btn_fondo")
const btn_annadir = document.querySelector("#btn_annadir")

const input_color = document.querySelector("#input_color")

    let color;

document.addEventListener("DOMContentLoaded", () => {

    color = input_color.value

})

btn_fondo.addEventListener("click", () => {
    
    color = input_color.value

    const hijos = elementos.children

    for (const hijo of hijos) {

        hijo.querySelector(".fondo").style.backgroundColor = color;

    }

})



const new_elemento = (foto_a, foto_b, color) => {

    [foto_a, foto_b] = [foto_a, foto_b].sort(() => 0.5 - Math.random())

    let str = `<div class="elemento">

            <div class="fondo">

                <img class="foto" src="${foto_a}" alt="">

            </div>

            <button class="btn_cambiar">cambiar</button>
            <button class="btn_borrar">borrar</button>

            </div>`

    const temp = document.createElement("div")
    temp.innerHTML = str
    const elemento = temp.firstElementChild

    elemento.querySelector(".fondo").style.backgroundColor = color;

    const img = elemento.querySelector(".foto");
    let foto_actual = foto_a;

    elemento.querySelector(".btn_cambiar").addEventListener("click", () => {
        if (foto_actual === foto_a) {
            img.src = foto_b;
            foto_actual = foto_b;
        } else {
            img.src = foto_a;
            foto_actual = foto_a;
        }
    });


    elemento.querySelector(".btn_borrar").addEventListener("click", () => {
        elemento.remove();
    });

    return elemento

}

btn_annadir.addEventListener("click", () => {
    const elem = new_elemento(gato, leon, color)
    elementos.appendChild(elem)
});