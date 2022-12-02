const CACHE ='cache-1';
const CACHE_DINAMICO='dinamico-1';
const CACHE_ESTATICO='estatico-1';
const CACHE_INMUTABLE='inmutable-1';

self.addEventListener('install', evento=>{

const promesa = caches.open('CACHE')
.then(cache=>{
    return cache.addAll([
        //'/',
        'index.html',
        'css/style.css',
        'img/hero/movie_1.jpg',
        'img/hero/movie_2.jpg',
        'img/hero/movie_3.jpg',
        'img/trending/popular_1.jpg',
        'img/trending/popular_2.jpg',
        'img/trending/popular_3.jpg',
        'img/trending/popular_4.jpg',
        'img/trending/popular_5.jpg',
        'img/trending/popular_6.jpg',
        'img/Estrenos/Estreno_1.jpg',
        'img/Estrenos/Estreno_2.jpg',
        'img/Estrenos/Estreno_3.jpg',
        'img/Estrenos/Estreno_4.jpg',
        'img/Estrenos/Estreno_5.jpg',
        'img/Estrenos/Estreno_6.jpg',
        'js/app.js',
        'img/NoConexion.jpg',
        'js/main2.js',
        'js/funciones.js',
        'offline.html',
        'manifest.json'
      


    ]);
});

//Separamos los archivos que no se modificarán en un espacio de cache inmutable
const cacheInmutable = caches.open(CACHE_INMUTABLE)
.then(cache=>{
cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
});

//Indicamos que la instalación espere hasta que las promesas se cumplan
evento.waitUntil(Promise.all([promesa, cacheInmutable]));
});

self.addEventListener('activate',evento =>{
   const respuesta=caches.keys().then(keys =>{
       keys.forEach(key =>{
           if(key !== CACHE && key.includes('cache')){
               return caches.delete(key);
           }
       })
   })
   evento.waitUntil(respuesta); 
})

self.addEventListener('fetch', evento =>{
   //Estrategia 2 CACHE WITH NETWORK FALLBACK
   const respuesta=caches.match(evento.request)
   .then(res=>{
   //si el archivo existe en cache retornalo
   if (res) return res;
   //si no existe deberá ir a la web
   //Imprimos en consola para saber que no se encontro en cache
   console.log('No existe', evento.request.url);
  
   //Procesamos la respuesta a la petición localizada en la web
   return fetch(evento.request)
   .then(resWeb=>{//el archivo recuperado se almacena en resWeb
   //se abre nuestro cache
   caches.open(CACHE_DINAMICO)
   .then(cache=>{
   //se sube el archivo descargado de la web
   cache.put(evento.request,resWeb);
   //Mandamos llamar la limpieza al cargar un nuevo archivo
  //estamos indicando que se limpiará el cache dinamico y que
  //solo debe haber 2 archivos
   limpiarCache(CACHE_DINAMICO,50);
   })
   //se retorna el archivo recuperado para visualizar la página
  return resWeb.clone();
   });
   })
   .catch(err=> {
       //si ocurre un error, en nuestro caso no hay conexión
       if(evento.request.headers.get('accept').includes('text/html')){
       //si lo que se pide es un archivo html muestra nuestra página offline que esta en cache
       return caches.match('offline.html');
       }
       else{
        return caches.match('/img/NoConexion.jpg');
    }
       });
   
   evento.respondWith(respuesta);
  });

  //recibimos el nombre del espacio de cache a limpiar y el número de archivos permitido
function limpiarCache(nombreCache, numeroItems){
   //abrimos el cache
   caches.open(nombreCache)
   .then(cache=>{
   //recuperamos el arreglo de archivos existentes en el espacio de cache
   return cache.keys()
   .then(keys=>{
   //si el número de archivos supera el limite permitido
  if (keys.length>numeroItems){
   //eliminamos el más antiguo y repetimos el proceso
   cache.delete(keys[0])
   .then(limpiarCache(nombreCache, numeroItems));
   }
   });
   });
  }
/*const CACHE ='cache-1';
const CACHE_DINAMICO='dinamico-1';
const CACHE_ESTATICO='estatico-1';
const CACHE_INMUTABLE='inmutable-1';

self.addEventListener('install', evento=>{

const promesa = caches.open('CACHE')
.then(cache=>{
    return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/img/hero/movie_1.jpg',
        '/img/hero/movie_2.jpg',
        '/img/hero/movie_3.jpg',
        '/img/trending/popular_1.jpg',
        '/img/trending/popular_2.jpg',
        '/img/trending/popular_3.jpg',
        '/img/trending/popular_4.jpg',
        '/img/trending/popular_5.jpg',
        '/img/trending/popular_6.jpg',
        '/img/Estrenos/Estreno_1.jpg',
        '/img/Estrenos/Estreno_2.jpg',
        '/img/Estrenos/Estreno_3.jpg',
        '/img/Estrenos/Estreno_4.jpg',
        '/img/Estrenos/Estreno_5.jpg',
        '/img/Estrenos/Estreno_6.jpg',
        '/js/app.js',
       


    ]);
});

const cacheInmutable = caches.open(CACHE_INMUTABLE)
.then(cache=>{
    cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
});

evento.waitUntil(promise.all([promesa, cacheInmutable]));



});

    self.addEventListener('fetch', evento =>{
      const respuesta = caches.open(CACHE)
      .then (cache=>{
        fetch(evento.request)
        .then(resp=>{
          cache.put(evento.request,resp);

        });
        return cache.match(evento.request);
        });
        evento.respondWith(respuesta);


      evento.respondWith(respuesta);
      if (evento.request.url.includes('bootstrap')){
        evento.respondWith(caches.match(evento.request));
      }
    });

function limpiarCache(nombreCache,numeroItems){
    caches.open(nombreCache)
    .then(cache=>{
        return cache.keys()
        .then(keys=>{
            if (keys.length>numeroItems){
                cache.delete(keys[0])
                .then(limpiarCache(nombreChache, numeroItems));
            }

        })
    })
}*/

