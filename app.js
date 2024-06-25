document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("datos");
    const saveButton = document.getElementById("encriptar");
    const copyButton = document.getElementById("copy");
    let datos = [];
    let display = true;
    let newtext = ''

    
    saveButton.addEventListener("click", () => {
        
        guardadoDatos();
    })
    function guardadoDatos(){
        newtext = textarea.value;
        //verifico que vengan datos
        if (!newtext) {
            alert("Por favor ingresa tu texto a encriptar");
            textarea.value = '';
        } else {
        //agrego el texto al array
            datos.push(newtext);
            console.log(datos);
            textarea.value = ''; // limpieza texto
            display = false;
            document.getElementById("p-info").innerText = newtext;
        }
        console.log(display)
        mostrarDisplay()
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

    copyButton.addEventListener("click", () => {
        let copytext = document.getElementById("p-info").innerHTML;

        navigator.clipboard.writeText(copytext).then(showSnackBar());

        console.log(copytext);
    })

    function showSnackBar() {
        var sb = document.getElementById("snackbar");

        //this is where the class name will be added & removed to activate the css
        sb.className = "show";

        setTimeout(() => { sb.className = sb.className.replace("show", ""); }, 3000);
    }
    ;
});
