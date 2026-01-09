const gato = "/gato.png"
const leon = "/leon.png"

let color

$(() => {

    const elementos = $("#elementos");
    const btn_fondo = $("#btn_fondo");
    const btn_annadir = $("#btn_annadir");
    const input_color = $("#input_color");

    color = input_color.val();

    btn_fondo.on("click", function () {

        color = input_color.val();

        elementos.children().each(function () {
            $(this).find(".fondo").css("background-color", color);
        });

    });

    const new_elemento = (foto_a, foto_b, color) => {

        [foto_a, foto_b] = [foto_a, foto_b].sort(() => 0.5 - Math.random());

        const elemento = $(`
            <div class="elemento">
                <div class="fondo">
                    <img class="foto" src="${foto_a}" alt="">
                </div>
                <button class="btn_cambiar">cambiar</button>
                <button class="btn_borrar">borrar</button>
            </div>
        `);

        elemento.find(".fondo").css("background-color", color);

        const $img = elemento.find(".foto");
        let foto_actual = foto_a;

        elemento.find(".btn_cambiar").on("click", function () {
            if (foto_actual === foto_a) {
                $img.attr("src", foto_b);
                foto_actual = foto_b;
            } else {
                $img.attr("src", foto_a);
                foto_actual = foto_a;
            }
        });

        elemento.find(".btn_borrar").on("click", function () {
            elemento.remove();
        });

        return elemento;
    };

    btn_annadir.on("click", function () {
        const $elem = new_elemento(gato, leon, color);
        elementos.append($elem);
    });

});
