$(() => {

    const texto = $("#texto");
    const body = $("#body");

    const random = (minimo, maximo) => Math.random() * (maximo - minimo) + minimo;

    const cambiar_fondo_suave = color => {
        body.css("background-color", color);
    };

    const cambiar_fondo_inmediato = color => {
        body.addClass("sin_transicion");
        body.css("background-color", color);

        body[0].offsetHeight;

        body.removeClass("sin_transicion");
    };

    const cambiar_texto = texto_nuevo => {
        texto.text(texto_nuevo);
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const ESTADOS = {
        SIN_EMPEZAR: 0,
        EXPLICACION: 1,
        ESPERANDO_SLEEP: 2,
        ESPERANDO_CLICK: 3,
        MOSTRANDO_TIEMPO: 4
    };

    let inicio = -1;
    let estado = ESTADOS.SIN_EMPEZAR;

    body.on("click", async function () {

        switch (estado) {

            case ESTADOS.SIN_EMPEZAR:
                estado = ESTADOS.EXPLICACION;
                cambiar_texto(
                    "Haga click lo antes posible cuando cambie el fondo, para empezar haga click"
                );
                break;

            case ESTADOS.EXPLICACION:
                estado = ESTADOS.ESPERANDO_SLEEP;
                cambiar_texto("...");

                const tiempo = random(1000, 5000);
                await sleep(tiempo);

                inicio = performance.now();
                estado = ESTADOS.ESPERANDO_CLICK;

                cambiar_fondo_inmediato("red");
                cambiar_texto("YA");
                break;

            case ESTADOS.ESPERANDO_SLEEP:
                break;

            case ESTADOS.ESPERANDO_CLICK:
                cambiar_fondo_suave("darkblue");

                const fin = performance.now();
                cambiar_texto(
                    `tardaste ${fin - inicio} milisegundos, click para volver a empezar`
                );

                estado = ESTADOS.EXPLICACION;
                break;

            default:
                throw new Error(`Estado desconocido: ${estado}`);
        }
    });

});
