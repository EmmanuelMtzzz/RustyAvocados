//BASE DE DATOS

import Registrobd, {guardar,consultar,crearEtiqueta} from './funciones.js';

//Inndicamos el nombre de la base de datos "Tineda", la tabla "productos"
//y sus atributos ++id(autoincremental), nombre, precio y descripción.
let bd=Registrobd("Registro", {productos:`++id,nombre,descripcion`});


//recuperando inputs del formulario
const clave_prod = document.getElementById("clave");
const nombre_prod = document.getElementById("nombre");
const desc_prod = document.getElementById("descripcion");
const mesajeSinRegistros = document.getElementById("siRegistros");

const divMensajes = document.getElementById("Mensajes");
const contenedorError = document.getElementById("contenedorError");
const contenedorOk = document.getElementById("contenedorOk");
const mensajeError = document.getElementById("mensajeError");
const mensajeOk = document.getElementById("mensajeOk");

//accediendo a los botones
const btGuardar=document.getElementById("guardar");


//visualizando datos registrados 
window.onload=() =>{

cargarTabla();
}



//Evento click para guardar
btGuardar.onclick=(evento)=>{
    //Se enviar los datos del formulario a la función guardar del archivo funciones.js
     let flag =guardar(bd.productos, {
     nombre:nombre_prod.value,
     descripcion:desc_prod.value
 });
 
 if(flag){
    //Se limpian las cajas de texto
   nombre_prod.value="";
   desc_prod.value="";

   cargarTabla();
   
}
}


//Evento click para guardar cambios
btModificar.onclick=(evento)=>{
    //Se recupera el id del producto a modificar
    const id=parseInt(clave_prod.value||0);
    if(id){
       //si exiete el id se enviar los datos del formulario a la función guardar del archivo funciones.js
        bd.productos.update(id,{
            nombre:nombre_prod.value,
            descripcion:desc_prod.value
        }).then((resultado)=>{
            if(resultado){
               console.log("Modificación realizada");
                nombre_prod.value="";
                desc_prod.value="";
                cargarTabla();
                
            }else{
                console.log("No se aplicaron los cambios");
        
            }
            
        })

        
    }
   
    
}


//Evento click para  eliminar todo
btEliminarTodo.onclick=()=>{
    
      //se ejecuta el borrado de toda la base de datos y se crea nuevamente pero vacia
    
       bd.delete();
       bd=Registrobd("Registro", {productos:`++id,nombre,descripcion`});
       bd.open();
       location.reload();
      
}

//Encagado de consultar los productos y enviarlos al html


function btnEditar(evento) {
    let id=parseInt(evento.target.dataset.id);
   
    bd.productos.get(id, producto=>{
      clave_prod.value=producto.id||0;
      nombre_prod.value=producto.nombre||"";
      desc_prod.value=producto.descripcion||"";

    })
}

function btnEliminar(evento) {
    let id=parseInt(evento.target.dataset.id);
   console.log(id);
   bd.productos.delete(id);
   cargarTabla();

    
}