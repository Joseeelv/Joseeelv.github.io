---
title: Boiler CTF
layout: post
post-image: "../assets/images/Rooms/BoilerCTF/boiler.png"
description: Intermediate level CTF exploit para obtener acceso como root y encontrar la flag de root.
difficulty: Medium
enlace: https://tryhackme.com/r/room/boilerctf2
tags:
- Enumeration
- Privilege Escalation
- Web
---

First of all, we are going to perform a network scanning, to see what ports are open:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Let's check the website:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We see that it is a website of a default Apache service, so , we are going to check if there are hidden directories on this domain:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Since there's nothing in the hidden directories, we are going to log in to the *FTP* server, using username *Anonymous*:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We download the file and we open it:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We see that is readable, so we are going to decrypt it.

As a result, we have the phrase: *Just wanted to see if you find it. Lol. Remember: Enumeration is the key!*

Now, we are going to check the directory `/robots.txt`:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We found a series of ASCII numbers that, if we turn to a base64 and MD5, we obtain the string *kidding* (A waste of time..).

Let's keep checking stuff:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

In the directory `/joomla`, this nothing relevant at first glance, but we can fuzz the website to find hidden directories within it.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Indeed, we found a large number of hidden directories within the directory `/joomla`.

We see there is a directory called `/_tests`, so let's check it out:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

If we search about sar2html on Google, we will find an exploit on exploit-db that can be used against him  → [exploit-db/Sar2HTML](https://www.exploit-db.com/exploits/47204) (here is the exploit).

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