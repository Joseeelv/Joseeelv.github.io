---
title: Protocolos HTTP y HTTPS
layout: post
post-image: "../assets/images/Labs/HTTP/http.png"
description: En este módulo se exploran los fundamentos de los protocolos HTTP y HTTPS, incluyendo su funcionamiento y diferencias. Se explica cómo las peticiones y respuestas entre navegadores y servidores se estructuran y procesan. Los participantes aprenden sobre la composición de una URL, desglosando sus componentes clave como el esquema, dominio, puerto, ruta, query string y fragmento.
enlace: https://tryhackme.com/r/room/httpindetail
difficulty: Fácil
tags: 
  - LAB
---

# ¿Qué es HTTP(s)?

> El protocolo HTTP(S) ‘HyperText Transfer Protocol’ es el conjunto de reglas que se usan para comunicarse con servidores web para la transmisión de datos de la página web (HTML, imágenes, vídeos, …).

Encontramos dos tipos → ***HTTP*** (no seguro) y ***HTTPS*** (es la versión segura de HTTP, donde los datos están encriptados).

Que los datos estén encriptados nos permite un nivel de seguridad mayor, debido a que las personas no pueden ver los datos que están siendo enviados y recibidos.

Cuando se hace uso del protocolo HTTP, la barra de navegación junto con la URL encontramos el símbolo de un candado tachado.

# Peticiones y respuestas

Como hemos dicho anteriormente, al acceder a una página web, nuestro buscador hará una petición al servidor web con el fin de obtener los archivos HTML, imágenes, videos, etc..

Para poder realizar esto, debemos de realizar una petición a una página web mediante una URL.

## URL

> Una URL ‘Uniform Resource Locator’ nos permite acceder a un recurso en internet.

Consta de varias funciones, pero no todas aparecen en cada peticiones / solicitudes.

Sea una URL de la forma → `http://user:password@cyberwiki.com:80/networking?id=1#task3` 

- ***Esquema (http)*** → Indica que protocolo se ha usado (*HTTP* ó *HTTPS*).
- ***Usuario (user:password)*** → Como algunos necesitan la autenticación de login, puedes poner tu usuario para hacer login en la web.
- ***Dominio (cyberwiki.com)*** → Nombre del [dominio](https://joseeelv.github.io//blog/Enumeraci%C3%B3ndeSubdominios) o dirección IP a la que queremos acceder.
- ***Puertos*** → Puerto al que nos vamos a conectar. HTTP (80) y HTTPS (443) normalmente.
- ***Ruta (networking)*** → Es el nombre del archivo ó recursos al que estamos accediendo.
- ***Query string (?id=1)*** → Bits adicionales que le podemos enviar a la ruta solicitada, indicando que queremos recibir el recurso cuyo id = 1.
- ***Fragmento (#task3)*** → Se usa comúnmente para webs con contenido extenso. Hace referencia a una ubicación de la página real solicitada.

## Realizar la petición / solicitud.

> Una petición HTTP(s) se realiza mediante MetodoPetición/VersionProtocolo.

Por ejemplo, podemos realizar una petición HTTP → `GET /HTTP/1.1`, estocrealiza una petición mandando el método GET, haciendo uso de la versión 1.1 del protocolo HTTP.

Estas peticiones pueden tener varios **métodos**.

Después de haber realiza la petición anterior, HTTP nos devolverá una respuesta con un **estado** indicando si la conexión ha sido exitosa o no.

Estas respuestas será diferentes dependiendo del resultado de la petición.

# Métodos del protocolo HTTP(S)

> Como hemos comentado anteriormente, las peticiones HTTP(S) se pueden realizar mediante un método, cada método tiene un fin particular en la petición.

Encontramos varios métodos para las peticiones HTTP(S):

- Petición ***GET*** → Se usa para obtener información sobre el servidor web.
- Petición ***POST*** → Se usa para enviar datos al servidor web, creando nuevos registros.
- Petición ***PUT*** → Se usa para enviar datos al servidor web, actualizando la información.
- Petición ***DELETE***  → Se usa para eliminar información o registros del servidor web.

# Estados de la respuesta HTTP(S)

> Al realizar una petición HTTP(S), el protocolo usado envía una respuesta especificando el estado de la petición.

Encontramos varios estados de las respuestas HTTP(S):

<ul>
  <li><em><strong>100 - 199 (Información de la respuesta)</strong></em> → Le dicen al cliente que la primera parte de la petición es correcta y que puede continuar con la misma (No es muy común).</li>
  <li><em><strong>200 - 299 (Éxito)</strong></em> → Nos informa de que la petición ha sido exitosa: </li>
    <ul>
      <li><em>200 ‘OK’</em>: Petición completamente exitosa.</li>
      <li><em>201 ‘Created’</em>: Se ha creado un recurso nuevo.</li>
    </ul>
  <li><em><strong>300 - 399 (Redirección)</strong></em> → Redireccionan al cliente a otro recurso (página web diferente o sitio web).</li>
  <li><em><strong>400-499 (Error del cliente)</strong></em> → Informan al cliente los errores que se producen:</li>
    <ul>
      <li><em>401 ‘Not Authorised’</em>: Informa que necesitamos ser autorizados para realizar la petición (login con permisos en el servidor).</li>
      <li><em>403 ‘Forbidden’</em>: NO tenemos permisos para acceder al recurso.</li>
      <li><em>404 ‘Not Found’</em>: La página o recurso no existe.</li>
      <li><em>405 ‘Not Allowed’</em>: Cuando le mandamos al servidor un método que no entiende o no puede soportar para ese método.</li>
    </ul>
  <li><em><strong>500-599 (Error del servidor)</strong></em> → Están reservados para los errores que ocurren en la parte del servidor web:</li>
    <ul>
      <li><em>500 ‘Internal Error’</em>: El servidor ha encontrado un error en la petición.</li>
      <li><em>503 ‘Service Unavailable’</em>: El servidor no está disponible (ya sea por mantenimiento u otros motivos).</li>
    </ul>
</ul>

# Cabeceras

> Las cabeceras son bits de datos adicionales que podemos enviar a los servidores web cuando realizamos una petición a la misma.

## Cabeceras comunes de las peticiones

Estas cabeceras son enviadas desde el cliente al servidor, específicamente desde el buscador.

- ***Host / dominio*** → Los servidores webs contienen muchas páginas webs, asi que especificamos el host o el dominio de la misma para acceder a ella, de lo contrario nos devuelve la página web por defecto.
- ***User-Agent*** → Es la versión y el software de nuestro buscador.
- ***Content-Length*** → Le dice al servidor cuantos datos espera en la petición.
- ***Accept-Encoding*** → Informa al servidor web los tipos de compresión que el buscador soporta (.zip, tar.gz,etc).
- ***Cookie*** → Datos enviados al servidor web que ayuda a recordar la información.

## Cabeceras comunes de las respuestas

Estas cabeceras son recibidas desde el servidor web en respuesta a las peticiones.

- ***Set-Cookie** →* Es la información a guardar la cual será enviada de nuevo al servidor web en cada petición.
- ***Cache-Control*** → Nos dice cuanto de largo es el contenido de la respuesta que se ha almacenado en la caché del servidor.
- ***Content-Type*** → Informa al cliente cual es el tipo de los datos que va a devolver (HTML, CSS, videos, imágenes, etc.).
- ***Content-Encoding*** → Indica que método de compresión va a ser usado para la compresión de los datos que van a ser enviados a través de internet.

# Cookies

> Las Cookies son datos que se almacenan en nuestras computadoras. Contienen información de los sitios webs a los que hemos accedidos, además ayuda al servidor web a recordar ‘quien eres’.

Cuando las Cookies son almacenadas en nuestros equipos, recibimos una cabecera **Set-Cookie** del servidor web.

Tienen muchos usos, pero comúnmente son usadas para autenticación. Nunca son una cadena de texto clara donde podemos leer las contraseñas, si no que son un token (código único y secreto que no puede ser rastreado con facilidad).

---