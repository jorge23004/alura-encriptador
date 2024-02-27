const textarea = document.getElementById("textarea");
const imgResultado = document.getElementById("imgResultado");
const h3Resultado = document.getElementById("h3Resultado");
const pResultado = document.getElementById("pResultado");
const copiarResultado = document.getElementById("copiarResultado");
const notificacion = document.getElementById("notificacion");
const notificacionTexto = document.getElementById("notificacionTexto");



let textoProcesado="";

function encriptarTexto(){
    const texto = textarea.value;
    if(texto==""){
        mostrarDefault();
    }else{
        textoProcesado="";
        if(comprobarCaracteres(texto) == true){
            for(let i=0; i<texto.length;i++){
                if(texto.charCodeAt(i)){
                    if(texto[i]=='a'){
                        textoProcesado+="ai";
                    }else if(texto[i]=='e'){
                        textoProcesado+="enter";
                    }else if(texto[i]=='i'){
                        textoProcesado+="imes";
                    }else if(texto[i]=='o'){
                        textoProcesado+="ober";
                    }else if(texto[i]=='u'){
                        textoProcesado+="ufat";
                    }else{
                        textoProcesado+=texto[i];
                    }
                }
             }
             
            mostrarRespuesta(textoProcesado);
        }else{
            notificacionError();
            mostrarDefault();
        }

    }
    
}

function desencriptarTexto(){
    const texto = textarea.value;
    if(texto==""){
        mostrarDefault();
    }else{
        textoProcesado="";
        if(comprobarCaracteres(texto) == true){
            let i=0;
            while(i<texto.length){
                switch(texto[i]){
                    case 'a':
                        textoProcesado+="a";
                        i=i+2;
                        break;
                    case 'e':
                        textoProcesado+="e";
                        i=i+5;
                        break;
                    case 'i':
                        textoProcesado+="i";
                        i=i+4;
                        break;
                    case 'o':
                        textoProcesado+="o";
                        i=i+4;
                        break;
                    case 'u':
                        textoProcesado+="u";
                        i=i+4;
                        break;
                    default:
                        textoProcesado+=texto[i];
                        i++;

                }
            }
            mostrarRespuesta(textoProcesado);
        }else{
            notificacionError();
            mostrarDefault();
        }

    }
   
}

function comprobarCaracteres (cadena){

    let i = 0;
    let bool = true;
    while(i<cadena.length && bool){
        console.log(cadena[i]);
        if((cadena.charCodeAt(i) < 97 || cadena.charCodeAt(i) > 122) && cadena.charCodeAt(i)!=32){
            bool=false;
        }
        i++;
    }
    console.log(bool);
    return bool;
}


const copiarTexto= async () =>{
    try{
        await navigator.clipboard.writeText(textoProcesado);
        notificacionTexto.innerHTML="copiado al portapapeles";
        notificacion.classList.remove("oculto");
       setTimeout(()=>{
            notificacion.classList.add("oculto");
    },2000);
    }catch(err){
        console.log("error al copiar");
    }
}

function notificacionError(){
    notificacionTexto.innerHTML="Solo letras minúsculas y sin acentos";
    notificacion.classList.remove("oculto");
    setTimeout(()=>{
        notificacion.classList.add("oculto");
    },2000);
}



function mostrarRespuesta(respuesta){
    imgResultado.classList.add("oculto");
    h3Resultado.classList.add("oculto");
    copiarResultado.classList.remove("oculto");
    pResultado.classList.add("respuesta");
    pResultado.innerHTML=respuesta;
}

function mostrarDefault(){
    imgResultado.classList.remove("oculto");
    h3Resultado.classList.remove("oculto");
    copiarResultado.classList.add("oculto");
    pResultado.classList.remove("respuesta");
    pResultado.innerHTML="Ingresa el texto que desees encriptar o desencriptar.";
}
