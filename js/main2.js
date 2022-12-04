//BASE DE DATOS

import Registrobd, {guardar,consultar,crearEtiqueta} from './funciones.js';

//Inndicamos el nombre de la base de datos "Tineda", la tabla "productos"
//y sus atributos ++id(autoincremental), nombre, precio y descripción.
let bd=Registrobd("Registro", {productos:`++id,nombre, precio,descripcion`});


//recuperando inputs del formulario
const clave_prod = document.getElementById("clave");
const nombre_prod = document.getElementById("nombre");
const costo_prod = document.getElementById("costo");
const desc_prod = document.getElementById("descripcion");
const mesajeSinRegistros = document.getElementById("siRegistros");

const divMensajes = document.getElementById("Mensajes");
const contenedorError = document.getElementById("contenedorError");
const contenedorOk = document.getElementById("contenedorOk");
const mensajeError = document.getElementById("mensajeError");
const mensajeOk = document.getElementById("mensajeOk");

//accediendo a los botones
const btGuardar=document.getElementById("guardar");
const btModificar=document.getElementById("modificar");
const btEliminarTodo=document.getElementById("eliminar-todo");


//visualizando datos registrados 
window.onload=() =>{

cargarTabla();
}



//Evento click para guardar
btGuardar.onclick=(evento)=>{
    //Se enviar los datos del formulario a la función guardar del archivo funciones.js
     let flag =guardar(bd.productos, {
     nombre:nombre_prod.value,
     precio:costo_prod.value,
     descripcion:desc_prod.value
 });
 
 if(flag){
    //Se limpian las cajas de texto
   nombre_prod.value="";
   costo_prod.value=""
   desc_prod.value="";

   cargarTabla();
   
}
}


//Evento click para guardar cambios



//Evento click para  eliminar todo


//Encagado de consultar los productos y enviarlos al html
function cargarTabla(){
    const tbody =document.getElementById("tbody");
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    consultar(bd.productos,(productos)=>{
       
        if (productos){
            mesajeSinRegistros.textContent="";

            crearEtiqueta("tr",tbody, (tr)=>{
              for(const atributo in productos){
               
                crearEtiqueta("td",tr, (td)=>{
                  td.textContent =productos.precio===productos[atributo]?`$ ${productos[atributo]}`:productos[atributo];
                })
            }
            crearEtiqueta("td",tr, (td)=>{
                crearEtiqueta("i",td, (i)=>{
                i.className += "icon-pencil";
                i.setAttribute(`data-id`,productos.id);
                i.onclick=btnEditar;
                })
        })
        crearEtiqueta("td",tr, (td)=>{
            crearEtiqueta("i",td, (i)=>{
            i.className += "icon-minus";
            i.setAttribute(`data-id`,productos.id);
            i.onclick=btnEliminar;
            })
    })
    })
}else{
    mesajeSinRegistros.textContent="No existen productos registrados";
}
})

}

function btnEditar(evento) {
    let id=parseInt(evento.target.dataset.id);
   
    bd.productos.get(id, producto=>{
      clave_prod.value=producto.id||0;
      nombre_prod.value=producto.nombre||"";
      costo_prod.value=producto.precio||"";
      desc_prod.value=producto.descripcion||"";

    })
}

function btnEliminar(evento) {
    let id=parseInt(evento.target.dataset.id);
   console.log(id);
   bd.productos.delete(id);
   cargarTabla();

    
}