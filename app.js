document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("datos");
    const saveButton = document.getElementById("encriptar");
    let datos = [];
    let display = true;

    
    saveButton.addEventListener("click", () => {
        
        guardadoDatos();
    })
    function guardadoDatos(){
        const newtext = textarea.value;
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
            // document.getElementById("display").style.justifyContent = "space-between";
        }
    }
    ;
});
