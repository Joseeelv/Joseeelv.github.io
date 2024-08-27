---
title: Boiler CTF
layout: post
post-image: "../assets/images/Rooms/BoilerCTF/boiler.png"
description: Boiler CTF es un CTF de nivel intermedio que requiere enumeración para avanzar. Se realiza un escaneo de puertos y se descubre una página web con directorios ocultos. Se encuentra un archivo descifrado que indica que la enumeración es clave. Se encuentra un archivo robots.txt con una cadena en base64 y MD5 que resulta ser una distracción. Se descubre un directorio oculto en la página web y se encuentra un exploit para sar2html. Se obtiene acceso como el usuario "basterd" y se encuentra la contraseña de otro usuario. Se accede como ese usuario y se encuentra la flag de usuario. Se intenta escalar privilegios mediante sudo, pero no se tiene éxito. Finalmente, se encuentra un binario con SUID activado y se ejecuta un exploit para obtener acceso como root y encontrar la flag de root.
difficulty: Media
enlace: https://tryhackme.com/r/room/boilerctf2
tags:
- Enumeración
- Privilege Escalation
- Web
---

Primero de todo vamos a realizar un escaneo de la red, para ver que puertos tiene abierto:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Vamos a ver que es esa web:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Vemos que es una página default de un servicio apache, por tanto, vamos a comprobar si existen directorios ocultos.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Ya que no hay nada en los directorios ocultos, vamos a intentar iniciar sesión en el servidor ftp, poniendo como *username* A*nonymous:*

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Lo descargamos y lo abrimos:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Vemos que es ilegible, por lo que vamos a hacerlo legible descifrándolo.

Como resultado tenemos: *Just wanted to see if you find it. Lol. Remember: Enumeration is the key!*

Vamos a mirar en el directorio "/robots.txt":
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Hemos encontrado una serie de números ascii que si los pasamos a base64 y MD5 obtenemos la cadena *kidding* (Una pérdida de tiempo vamos..).

Vamos a seguir comprobando cosas:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)" />
</div>
En el directorio "/joomla", no hay nada relevante a simple vista, pero podemos fuzzear la web para buscar directorios ocultos en la misma.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

En efecto, encontramos una gran cantidad de directorios ocultos dentro del directorio "/joomla".

Vemos que hay un directorio llamado "/_tests", vamos a echarle un ojo:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Si buscamos sobre sar2html en Google vamos a encontrar algún exploit en exploit-db que se pueda usar en contra de él. → [exploit-db/Sar2HTML](https://www.exploit-db.com/exploits/47204) (aquí está el exploit).

El exploit nos dice que podemos hacer una ejecución remota de comandos en la barra de navegación debido a `*plot=*`, así que vamos a testearlo:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Si hacemos uso de`whoami` , vemos que nos dice que somos www-data (al ser un servidor es correcto), por tanto, vamos a tirar un listado de archivos y ficheros a ver qué encontramos:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 10.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Encontramos varios archivos, pero el más interesante es log.txt, que si hacemos `plot=;cat log.txt` vamos a obtener historial de logins:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 11.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Por tanto, el usuario es *basterd* y la password es *superduperp@$$*, ahora sí podemos realizar una conexión ssh con dichas credenciales:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 12.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Al entrar vemos un archivo [backup.sh](http://backup.sh), si lo abrimos, encontramos el *user* y *password* de otro usuario, vamos a pivotar de usuario haciendo `su stoner` y poniendo su contraseña `superduperp@$$no1knows`, ahora si hacemos cd .. , vemos su directorio y podemos acceder a él.

Ya tenemos la user_flag:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 13.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Suponemos que la flag está en el root, por tanto, vamos a escalar privilegios.

Vamos a comprobar si stoner puede ejecutar algún binario mediante `sudo -l` :

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 14.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Fuimos engañados otra vez, así que ahora vamos a comprobar si algún binario tiene el SUID activado:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 16.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Vemos que el binario a usar es el */find* buscamos en Google de ejecutar el exploit y ganamos acceso:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 15.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Listo hemos encontrado la root_flag así que hemos acabado el reto.

---