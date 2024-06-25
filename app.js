document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos HTML
    const textarea = document.getElementById("datos");
    const encriptarButton = document.getElementById("encriptar");
    const desencriptarButton = document.getElementById("desencriptar");
    const copyButton = document.getElementById("copy");

    // Variables para almacenar datos y estado
    let datos = [];
    let display = true;
    let newtext = '';

    // Event listener para el botón de encriptar
    encriptarButton.addEventListener("click", () => {
        validarYProcesarTexto(true); // Llama a la función con true para encriptar
    });

    // Event listener para el botón de desencriptar
    desencriptarButton.addEventListener("click", () => {
        validarYProcesarTexto(false); // Llama a la función con false para desencriptar
    });

    // Función para validar y procesar el texto
    function validarYProcesarTexto(encriptar) {
        newtext = textarea.value; // Obtiene el valor del textarea

        // Verifica que el textarea no esté vacío
        if (!newtext) {
            mostrarAlerta("Por favor ingresa tu texto a encriptar o desencriptar");
            return;
        }

        // Verifica si el texto contiene caracteres especiales, acentos o mayúsculas
        if (tieneCaracteresEspeciales(newtext) || tieneVocalesMayus(newtext)) {
            mostrarAlerta("El texto contiene caracteres especiales, acentos o mayúsculas. Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales.");
            return;
        }

        // Verifica si el texto ya está encriptado o desencriptado
        if (encriptar && isEncrypted(newtext)) {
            mostrarAlerta("El texto ya está encriptado.");
            return;
        }

        if (!encriptar && !isEncrypted(newtext)) {
            mostrarAlerta("El texto ya está desencriptado.");
            return;
        }

        // Procesa el texto según la acción (encriptar o desencriptar)
        procesarTexto(encriptar);
    }

    // Función para verificar si el texto contiene caracteres especiales
    function tieneCaracteresEspeciales(text) {
        return /[^a-zA-Z0-9\s]/.test(text); // Expresión regular para caracteres no permitidos
    }

    // Función para verificar si el texto contiene vocales mayúsculas
    function tieneVocalesMayus(text) {
        return /[A-Z]/.test(text); // Expresión regular para letras mayúsculas
    }
    
    // function tieneVocalesMayus(text) {
    //     return /[AEIOU]/.test(text);
    // }

    // Función para verificar si el texto está encriptado
    function isEncrypted(text) {
        return /ai|enter|imes|ober|ufat/.test(text); // Expresión regular para patrones de encriptación
    }

    // Función para mostrar alertas y limpiar el textarea
    function mostrarAlerta(mensaje) {
        alert(mensaje);
        textarea.value = '';
    }

    // Función para procesar el texto (encriptar o desencriptar)
    function procesarTexto(encriptar) {
        datos.push(newtext); // Agrega el texto al array de datos
        console.log(datos);
        textarea.value = ''; // Limpia el textarea
        display = false;

        // Encripta o desencripta según el parámetro
        if (encriptar) {
            encriptarTexto();
        } else {
            desencriptarTexto();
        }
        mostrarDisplay(); // Actualiza la pantalla
    }

    // Función para mostrar/ocultar elementos en la pantalla
    function mostrarDisplay() {
        if (display) {
            return;
        } else {
            document.getElementById("muñeco").style.display = "none";
            document.getElementById("titulo-display").style.display = "none";
            document.getElementById("texto-display").style.display = "none";
            document.getElementById("new-info").style.display = "flex";
        }
    }

    // Función para encriptar el texto
    function encriptarTexto() {
        function reemplazarVocales(match) {
            // Reemplaza cada vocal por su correspondiente encriptada
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

    // Función para desencriptar el texto
    function desencriptarTexto() {
        // Reemplaza cada patrón encriptado por su vocal correspondiente
        let textoDesencriptado = newtext
            .replace(/ai/g, 'a')
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
        document.getElementById("p-info").innerText = textoDesencriptado;
        console.log(textoDesencriptado);
    }

    // Event listener para el botón de copiar
    copyButton.addEventListener("click", () => {
        let copytext = document.getElementById("p-info").innerHTML;
        navigator.clipboard.writeText(copytext).then(showSnackBar());
        console.log(copytext);
    });

    // Función para mostrar la notificación de copia
    function showSnackBar() {
        var sb = document.getElementById("snackbar");
        sb.className = "show";
        setTimeout(() => { sb.className = sb.className.replace("show", ""); }, 3000);
    }
});