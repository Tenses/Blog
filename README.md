# Prueba Blog CRUD

## Pasos para arrancar el proyecto
### Base de datos
En phpMyAdmin, crear una base de datos llamada "page-blog" e importar el archivo page-blog.sql de este repositorio.

Dicho archivo se encuentra en el directorio original, junto a este archivo README.md

### Terminales
 Una vez instalada la bbdd y clonado el repo recomiendo abrir la terminal y dividirla en dos una para Backend Y otra para Frontend
### Backend
Accedemos al directorio Backend

 ```
cd page-blog/Backend
```
Instalamos las dependencias:

```
npm i
```
Arrancamos el servidor con uno de estos dos comandos:
```
node index.js  
nodemon
```
(recomiendo el segundo por si se efectúa algún cambio o prueba)

## Frontend
Accedemos al directorio Frontend

 ```
cd page-blog/front
```
Instalamos las dependencias:

```
npm i
```
Arrancamos la aplicación de React:
```
npm start
```

## Presentación del proyecto
-Para este blog sencillo con sistema CRUD creado con react he creado una vista principal o Homeview que funciona como feed de los post. Se lanza automáticamente y se puede acceder a ella por la navbar con el botón "inicio"
```
-Para añadir una publicación o post en el blog accedemos desde el botón del navbar "añadir publicación". Esto nos hará acceder a la vista addpostview, la cual tiene un formulario de creación de post con título, contenido e imágenes. La imagen adjuntada será copiada a backend dentro de public/images con un id correspondiente al post, luego veremos qué pasa al borrarla. Al crearse se le asigna una fecha de creación automáticamente, esta puede cambiar al ser editado el post, cosa que también veremos a continuación.
```
-Volviendo al inicio o home veremos una cierta cantidad de post, incluido el ultimo que hayamos subido, el cual se pondrá el primero en la lista. Si bajamos veremos que la página tiene paginación, de manera que podremos acceder a post antiguos en las demás páginas.
```
-Para editar uno de estos post simplemente haremos click sobre su imagen o sobre el texto del título. Estos reaccionan a nuestro ratón agrandándose para mostrar su reactividad. Al hacer click nos llevará a otra vista, la singlepostview. Ahí veremos el post únicamente, sin las demás publicaciones, más grande y con sus distintos elementos dentro de un contenedor con borde para que se distinga. Si damos al botón de borrar se borrará el post. Si le damos a editar se desplegarán unas áreas de texto en donde escribir los cambios al título o al contenido y un botón para guardar los cambios y otro para cancelarlos. La imagen puede dejarse como está o cambiarse. Si se cambia, la nueva imagen, se guarda automáticamente en el backend y se borra la antigua. Al guardar los cambios también se actualiza la fecha de última actualización del post.
```
-Borrar el post. Se puede desde la vista del post único o desde el home, donde podemos darle a borrar a cada post pues cada uno trae consigo un botón rojo que así lo indica. Al hacerlo no solo se borra el texto de la base de datos sino también la imagen asociada, para evitar que quede huérfana.
```
-El diseño lleva bootstrap para hacerlo responsivo y alguna mediaquery donde me pareció más conveniente. La barra de navegación se contrae en un pequeño menú hamburguesa para pantallas pequeñas.