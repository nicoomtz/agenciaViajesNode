Lo primero que hay que hacer en un proyecto con Node, es crear el archivo package.json
Una vez dentro de la carpeta ejecutamos en nuestra terminal
**npm init**
y especificamos los valores.

Existen 2 tipos de dependencias:
De desarrollo: Solamente las requerimos mientras estamos creando el proyecto.
De producción: Se van a requerir cuando el proyecto ya esté publicado.

  npm install express

npm install --save-dev nodemon
(Esta dependencia reinicia el servidor cada vez que detecte un cambio en nuestro archivo)

Como importar express?

  const express = require('express');
o ||
  import express from 'express'

Y ejecutamos la siguiente funcion

  const app = express();

Para arrancar el servidor

Para arrancar los archivos creamos el siguiente script en el package.json:
  "scripts": {
    "dev": "nodemon index.js"
  }

y lo ejecutamos desde la terminal con
npm run build

Con la siguiente linea lo que hacemos es que cuando visitemos la pagina que esté entre '/', cuando estemos en esa ruta, ejecutemos una función.
**req (request)**: Es lo que enviamos
**res (response)**: Es lo que express envia

  app.get('/', (req, res) => {
    res.send('Hola Mundo');
  })

.send : es un metodo utilizado para mostrar algo en pantalla

.json : retorna un objeto tipo json, como por ejemplo

  res.json({
    id: 1
    name: nico
  })

Y el más comun es:
.render : se utiliza para crear una vista

Una vez creada varias vistas, como por ejemplo:

  app.get("/nosotros", (req, res) => {
    res.send("Nosotros Pagina");
  });

  app.get("/contacto", (req, res) => {
    res.send("Contacto Pagina");
  });

Lo que vamos a hacer es crearlas en un archivo aparte para mantener el código limpio.
Para esto creamos una carpeta llamada **routes** y adentro un index.js que va a controlar todas las vistas.

Dentro de este archivo volvemos a importar **express** y como no podemos crear otra constancia de app para utilizar express (porque sino se va a reiniciar el servidor y no vamos a tener conectado un archivo index con el otro), tenemos el metodo Router:

  const router = express.Router();

Y lo exportamos:

  export default router;

Para poder usarlo en nuestros otros archivos.

Para agregar el router en nuestro index principal, debemos importarlo:
import router from "./routes/index.js";

Y para agregarlo:
  app.use("/", router);

.use : hace que soporte get, post, patch, delete

Que es un TEMPLATE ENGINE?

Que son?
Son la V (VISTA) del MVC (ModelViewController).
Permiten mostrar la parte visual (HTML) en una aplicación express, debido a que el modelo retorna un objeto (o arreglo) de datos, un template engime permitirá acceder a los resultados de una consulta y mostrarlos en pantalla.

Características de un template engine:
Hay una gran variedad y cada uno tiene su propia sintaxis.
Usualmente puedes escribir código javascript dentro de HTML.
Si tienes experiencia en Angular, React o Vue, usualmente reemplazan estos template engines en una aplicación

Los más comunes en NODE - EXPRESS:
PUG - (Antes JADE)
EJS - EMBEDDED JAVASCRIPT
HBS - HANDLEBARS.JS (MUSTACHE.JS)
REACT

Un template engine se instala vía NPM

  npm install pug

Y se habilita en el archivo principal:

  app.set('view engine', 'pug');

EJEMPLO PUG:

if tareas.length
  each tarea in tareas
    li.tarea(data-tarea=`${tarea.id}`)
      p= tarea.tarea

EJEMPLO HANDLEBARS:
  <div class="caja">
    <p class="etiqueta">Empresa:</p>
    <p class="nombre">{{vacante.empresa}}</p>
  </div>
  <div class="caja">
    <p class="etiqueta">Ubicación:</p>
    <p class="nombre">{{vacante.ubicacion}}</p>
  </div>

Para usar cada uno debemos instalarlo:
  npm install pug

Creamos una carpeta con el nombre **views** y adentro un archivo, nosotros.pug. Luego para renderizar ese archivo:

  router.get("/nosotros", (req, res) => {
    res.render("nosotros");
  });

Si tenemos algun valor que necesitamos pasar a la vista(casi igual a las props) lo que hacemos es pasarselo luego de una coma y en manera de objeto:

  router.get("/nosotros", (req, res) => {
    const viajes = "Viaje a Alemania";

    res.render("nosotros", {
      textoViajes: viajes,
    });
  });

PUG:

h1 hola 
p Desde pug // HTML
p= viajes // JavaScript
p #{viajes} // JavaScript //diferente sintaxis


MasterPage =
Funcionalidad de express que nos permite crear un contenedor para todas las páginas, como por ejemplo el Header y el Footer. Para no tener que estar repitiendo codigo en cada página.

Para esto creamos dentro de **views** una carpeta llamada **layout** con el archivo **index.pug**

Una vez estemos en el index y queremos mostrar el contenido de la ruta en la que estemos, tenemos que crear un **block**

  block contenido

Luego en cada una de nuestras vistas, importarlo y especificar el bloque:

  extends ./layout/index

  block contenido
    p Inicio


Agregar hojas de estilos:

Debemos definir una carpeta publica creandola y asignandola:

  //Definir la carpeta publica
  app.use(express.static("public"));

Y definimos css

  link(rel="stylesheet", href="/css/style.css")


Como separar el layout principal:
Dentro de la carpeta layout, creamos 2 archivos: header.pug y footer.pug
Y para incluirlos en nuestro index layout
Usamos el codigo **include** 

  include header 
  block contenido
  include footer


Para crear una clase podemos poner:

  div(class="clase")
  ||
  div.clase
  ||
  .clase // (si es solamente un div)


El **middleware** en Express
Es una funcion que se puede ejecutar antes o despues del manejo de una ruta y esta funcion tiene acceso al objeto **Request**, **Response** y la función **next()**.

request: lo que le mandamos al servidor
response: lo que el servidor me manda a mi
next: lo que hace es que continue al siguiente middleware (si especificamos un next y no le damos uso dentro del bloque, la pagina se va a caer (a veces no funciona, podemos forzarlo con un **return next()** ))

Los siguientes ejemplos son lineas de middleware:

1-  app.set("view engine", "pug");

2-  app.use((req, res, next) => {
      console.log(res);
    });

3-  app.use(express.static("public"));


app.use responde a todos los verbos:
get, patch, post, delete



Podemos crear variables locales para pasarlas a una vista mediante:

  app.use((req, res, next) => {
    res.locals.unaVariable = "Una nueva variable";
  });

Y desde la vista simplemente llamamos a la variable:

  span= unaVariable


(Buscar como conectar base de datos MySQL)

Luego instalamos la dependencia 
  npm install mysql2 sequelize

Luego creamos una carpeta llamada config con un archivo dentro llamado **db.js**

Importamos sequelize:

import Sequelize from 'sequelize'

Y luego para hacer uso de la base de datos:

  const db = new Sequelize('nombre de la base de datos a la cual queremos conectar', 'usuario', 'password', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorAliases: false
  })

  const db = new Sequelize('nombre de la base de datos a la cual queremos conectar', 'usuario', 'password', {
    host: 'nuestro host',
    port: 'nuestro puerto generado por mysql',
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    El resto es configuración de sequelize
  })

y exportamos default db;

y para hacer uso de la base de datos lo importamos en nuestro archivo index

Y para terminar de conectar nuestra base de datos:

  db.authenticate()
    .then(() => console.log("Base de datos conectada"))
    .catch((err) => console.log(err));




**MVC (MODEL VIEW CONTROLLER)**

Es un patrón de diseño de software que permite la separación de obligaciones de cada pieza de código en tu aplicación web.
Enfatiza la separación de la lógica de programación y lo que se muestra en pantalla.


**Model:**
Es el encargado de los datos (desde una base de datos) y de la lógica para mostrar esos datos
Ejemplo:
Un usuario quiere ver la sección de productos, el modelo se encargará de realizar esa consulta en la base de datos.

**View:**
Se engarga de lo que se ve en pantalla (HTML)
Ejemplo:
Si el modelo hace la consulta a la base de datos para los productos, es la vista la que muestra esos resultados

**Controller:**
Se encarga de comunicar entre el modelo y la vista, antes de que el modelo consulte a la base de datos es el encargado de mandarlo a llamar, y también una vez que el modelo tiene los resultados de la consulta, es el que se encarga de pasarlos a la vista.

**Router:**
Encargado de registrar todas las URL'S o endpoints que nuestra aplicación soporta.
Ejemplo:
Si el usuario accede a /productos, el router llama un controlador, que se comunica con el modelo para obtener los datos que son passados hacia la vista para ser mostrados.

Esquema final:

Si el usuario nos da una ruta(**ROUTER**): /productos, **CONTROLLER** va a pedir los datos a **MODEL**, de **MODEL** vuelve a **CONTROLLER** y una vez que el controller tiene los datos los pasa a la **VISTA**.






Para crear nuestros modelos, generalmente creamos una carpeta: models

Creamos nuestro modelo (generalmente iniciamos con mays)

Viaje.js

Y dentro hacemos import de sequelize y db.

Luego para hacer uso de nuestra base de datos:

export const Viaje = db.define('viajes', {
  // Objeto de configuración.
  titulo: {
    type: Sequelize.STRING
  },
  precio: {
    type: Sequelize.STRING
  },
  fecha_ida: {
    type: Sequelize.DATE
  },
  fecha_vuelta: {
    type: Sequelize.DATE
  },
})

**Si hay alguna columna que no definimos en nuestro objeto de configuración, no se va a traer esa columna.**

Para crear nuestros controllers, vamos a crear la carpeta **controllers** y dentro un archivo paginasController.js

Cada página va a ser declarada ahi. Ejemplo:

  const paginaInicio = (req, res) => {
    res.render("inicio", {
      pagina: "Inicio",
    });
  };

Y en nuestro index simplemente quedaria:

  router.get("/", paginaInicio);





Para realizar una consulta a la base de datos: importamos el objeto Viaje (Viaje.js) antes definido y declaramos paginaViajes como async para hacer la consulta y esperar a que reciba la respuesta.

Dentro de paginaViajes:

  const viajes = await Viaje.findAll();
  //findAll() : nos devuelve todos los resultados que haya en esa tabla.

**Y lo pasamos al render**

  res.render("viajes", {
    pagina: "Viajes",
    viajes,
  });

  luego en la view **Viajes** podemos iterar sobre cada objeto para darle formato a la vista:

  each viaje in viajes
    .viaje
      img(src=`img/destinos_${viaje.imagen}.jpg`)
      h2= viaje.titulo
      p= viaje.descripcion




Como definir una nueva ruta hija (viajes/slug):

Lo vamos a definir usando un **Comodín** y a ese comodin lo definimos con una /: y el nombre.
Ejemplo:

  router.get("/viajes/:slug", paginaDetalleViaje);


y en el controller:
  const paginaDetalleViaje = (req, res) => {
    console.log(req.params); // {viaje: 'viaje-nombrePais'}
    //el **viaje** del objeto es dado por el nombre que pusimos de comodín
  };

req.params nos va a devolver el objeto slug que estamos seleccionando

  const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try{
      const viaje = await Viaje.findOne({ where: { slug: slug } })

      res.render("viaje", {
      pagina: "Información Viaje",
      viaje,
    });
    } catch(error){
      console.log(error)
    }
  };

// El **WHERE** funciona como un if.
La linea de **viaje** significa:
Voy a hacer una consulta a Viaje que va a buscar si existe un elemento slug en la tabla que tenga el valor de **slug** (req.params.slug) y lo va a devolver.

Renderizamos una nueva vista que vamos a crear en *views* y le pasamos los resultados para formatear la vista.





Despues de haber creado el formulario de testimonial.

  router.post("/testimoniales", guardarTestimonial);

Debemos crear un nuevo controlador para manejar los datos recibidos en el post.

Para esto creamos testimonialController donde vamos a definir guardarTestimonial

const guardarTestimonial = (req, res) => {
  console.log(req.body);
};

req.body : va a ser lo que el usuario coloque en nuestro formulario.

Para poder leer los datos del formulario necesitamos agregar body parser en nuestro archivo index;

  //Agregar body parser para leer los datos del formulario
  app.use(express.urlencoded({ extended: true }));

Para mantener los valores de nuestro form luego de enviarlo si es que hay un error

Le pasamos a la vista los valores de **nombre** **correo** **mensaje**

y luego a cada input pasarle su valor como value=

input(value=nombre)

el textarea no requiere value, tenemos que pasarle el mensaje como javascript simplemente:

  textarea#mensaje(name="mensaje", class="form-control",placeholder="Tu mensaje", rows="3")= mensaje


Si ninguno de los 3 items del formulario tiene problemas vamos a almacenarlo en la base de datos:

Debemos crear la tabla manualmente con los datos respectivos:
nombre, correo, mensaje

La siguiente parte es crear el modelo: creamos Testimoniales.js
Declaramos el objeto de configuracion con los tipos de datos de la tabla.

Y luego importamos el model Testimonial en nuestro testimonialController

para almacenarlo vamos a hacer uso de try.catch


    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });

      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }

res.redirect() nos va a redireccionar a la página de testimoniales nuevamente para que no nos tire error.



CONSULTAR LOS TESTIMONIALES DE LA BASE DE DATOS:

En el archivo paginaController vamos a nuestra variable de paginaTestimoniales y primeramente debemos hacerla *async* y en un try.catch:
Declarar una variable que consulte los testimoniales a la base de datos.
Luego pasamos esa variable a la vista para poder hacer uso de los datos

  const paginaTestimoniales = async (req, res) => {
    try {
      const testimoniales = await Testimonial.findAll();
      res.render("testimoniales", {
        pagina: "Testimoniales",
        testimoniales,
      });
    } catch (error) {
      console.log(error);
    }
  };

**findAll** siempre nos va a retornar un arreglo, ya sea 1 o sean 20

también debemos especificar la consulta a la BD en nuestro controller de testimoniales, porque cuando creamos un error volvemos a renderizar la vista, pero esta vista no tiene declarados los testimoniales.
Asi que se lo pasamos:

    if (errores.length > 0) {

    //Consultar testimoniales existentes

    const testimoniales = await Testimonial.findAll();
    
    //Mostrar la vista con errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });



Para consultar 3 viajes del modelo viaje en nuestra vista de inicio vamos a hacer la función paginaInicio async y dentro tendrá un trycatch

  const viajes = await Viaje.findAll({ limit: 3 });

limit limita los elementos traidos como resultado a 3.

Y luego lo pasamos a nuestra vista.

Para no repetir el código de viajes en inicio, lo que vamos a hacer es crear un nuevo layout llamado bloque_viajes.pug
Y este bloque de código lo vamos a importar donde querramos usarlo con:
  
  include ./layout/bloque_viajes


Para realizar varias consultas dentro de una misma vista usamos un Promise. (Ya que si usamos 2 variables de await la segunda recien se va a ejecutar cuando cumpla la primera y esto puede consumirnos mucho tiempo)

  const promiseDB = [];

  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    const resultado = await Promise.all(promiseDB);
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1],
    });
  }

Promise.all() va a hacer que arranquen las 2 peticiones al mismo tiempo.

Esto va a hacer que las 2 consultas se ejecuten al mismo tiempo y recien cuando terminen ambas se va a mostrar el código siguiente
**cambiar el valor que le pasamos a viajes y a testimoniales**
 *viajes: resultado[0]*
 *testimoniales: resultado[1]*



Para comenzar con el deploy vamos a empezar por que es una **variable de entorno**

Es una variable cuyo valor es diferente en el entorno de desarrollo que en el entorno de produccion.
Para hacer uso de esto vamos a instalar una libreria llamada dotenv

npm i dotenv

y vamos a crear un archivo .env
Donde podemos guardar nuestras variables de entorno:
DB_HOST=127.0.0.1

Y lo importamos : 
  import dotenv from "dotenv/config";

y para usar la variable:
  proccess.env.DB_HOST


para hacer deploy del proyecto a heroku debemos ejecutar las siguientes lineas de comandos:

una vez ubicado en el proyecto:
  heroku login
  heroku create
  git push heroku main

En nuestro package.json debemos definir un nuevo script llamado:

  "start": "node index.js"

Y en la consola de heroku ejecutar:
  npm run start




Luego por ultimo debemos subir la base de datos

Para esto vamos a nuestro proyecto en la pagina de Heroku>Resources>Add-ons y agregamos ClearDB MySQL

Luego settings > reveal config vars > y copiamos el url de nuestro database.
Creamos un nuevo archivo

Y vamos a separar en lineas nuestro url:

//Usuario
  b531ddb1e1dcaa

//Password
  8d5f156b

//Servidor
  us-cdbr-east-06.cleardb.net

//Base de datos
  heroku_695a606ff107799

Por ultimo en ese mismo lugar de config vamos a registrar cada una de nuestras variables.

DB_HOST = VALOR
DB_NAME = VALOR

Y asi cada una de nuestras variables de entorno

**Es importante que estén en el mismo orden**

Una vez que declaramos las variables debemos exportar las tablas que estemos usando desde nuestra bd, con tableplus.
Seleccionamos SQL y export.

Y una vez exportado:
Creamos una nueva conexion en tableplus de mySQL llamada HerokuProd
Con las configuraciones de nuestro heroku (
  Usuario
b531ddb1e1dcaa
Pass
8d5f156b
Servidor
us-cdbr-east-06.cleardb.net
Database
heroku_695a606ff107799
)