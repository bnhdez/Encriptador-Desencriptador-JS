document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("datos");
    const encriptarButton = document.getElementById("encriptar");
    const desencriptarButton = document.getElementById("desencriptar");
    const copyButton = document.getElementById("copy");
    let datos = [];
    let display = true;
    let newtext = ''

    
    encriptarButton.addEventListener("click", () => {
        validacionDatos(true);
    });

    desencriptarButton.addEventListener("click", () => {
        validacionDatos(false);
    });

    function validacionDatos(encriptar) {
        newtext = textarea.value;
        // verifico que vengan datos
        if (!newtext) {
            alert("Por favor ingresa tu texto a encriptar o desencriptar");
            textarea.value = '';
        } else if (/[^a-zA-Z0-9\s]/.test(newtext)) { // Verificar caracteres especiales
            alert("El texto contiene caracteres especiales o acentos. Por favor, ingresa solo letras sin acentos y caracteres alfanuméricos.");
            textarea.value = '';
        } else {
            // Agrego el texto al array
            datos.push(newtext);
            console.log(datos);
            textarea.value = ''; // Limpieza texto
            display = false;

            if (encriptar) {
                encriptarTexto();
            } else {
                desencriptarTexto();
            }
        }
        // console.log(display);
        mostrarDisplay();
    }
    function mostrarDisplay() {
        if (display === true) {
            return;
        } else {
            document.getElementById("muñeco").style.display = "none";
            document.getElementById("titulo-display").style.display = "none";
            document.getElementById("texto-display").style.display = "none";
            document.getElementById("new-info").style.display = "flex";
        }
    }

    function encriptarTexto(){
        function reemplazarVocales(match) {
            // segun vocal, mostrar codigo a mostrar metodo replace()
            switch (match) {
                case 'a': return 'ai';
                case 'e': return 'enter';
                case 'i': return 'imes';
                case 'o': return 'ober';
                case 'u': return 'ufat';
                default: return match;
            }
        }
        // Aplicamos la función de reemplazo al texto nuevo
        // expresion regular '[aeiou]' busca las vocales substring x substrin por cada vocal
        // reemplazarVocales recibe la vocal, la manda a su funcion a cambiar
        let textoEncriptado = newtext.replace(/[aeiou]/g, reemplazarVocales);
        document.getElementById("p-info").innerText = textoEncriptado;
        console.log(textoEncriptado);
    }
    function desencriptarTexto(){
        let textoDesencriptado = newtext
            .replace(/ai/g, 'a')
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
        document.getElementById("p-info").innerText = textoDesencriptado;
        // console.log(textoDesencriptado);
    }
    

    copyButton.addEventListener("click", () => {
        let copytext = document.getElementById("p-info").innerHTML;

        navigator.clipboard.writeText(copytext).then(showSnackBar());

        // console.log(copytext);
    })

    //activacion notificacion
    function showSnackBar() {
        var sb = document.getElementById("snackbar");

        //this is where the class name will be added & removed to activate the css
        sb.className = "show";

        setTimeout(() => { sb.className = sb.className.replace("show", ""); }, 3000);
    }
    ;
});
