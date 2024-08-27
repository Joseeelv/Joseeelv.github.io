---
title: Bounty Hacker
layout: post
post-image: "../assets/images/Rooms/BountyHacker/BH.png"
description: En esta room de TryHackMe, se muestra cómo obtener las flags "user.txt" y "root.txt" mediante técnicas como el escaneo de puertos con nmap, acceso a una página web sin seguridad, búsqueda de directorios ocultos con gobuster, acceso a un servidor FTP anónimo, fuerza bruta con hydra, conexión SSH, búsqueda del archivo "user.txt" y escalada de privilegios utilizando un exploit en el comando "tar" para obtener acceso root y encontrar el archivo "root.txt".
difficulty: Fácil
enlace: https://tryhackme.com/r/room/cowboyhacker
tags:
- Enumeración
- Privilege Escalation
- Fuzzing
- Web
---
> En esta room vamos a proceder a obtener las flags *user.txt* y *root.txt* mediante varias técnicas que vamos a ver a continuación.

# User.txt
Mediante `nmap` vamos a realizar un escaneo de los puertos de la maquina objetivo:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
    <pre><code class="language-bash" >nmap -sC -sV -p- ip_victima</code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Hemos encontrado varios puertos abiertos → 21 (servicio FTP), 22 (servicio ssh) y 80 (página web).

Vamos a ver que hay en el puerto 80, es decir la página web:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Como vemos no encontramos gran cosa, pero podemos intentar buscar directorios ocultos en esta web mediante ***gobuster***.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

No encontramos nada imporante, solamente un directorio "/images" que no contiene nada relevante.

Si recordamos tenemos abierto el puerto 21 (FTP), este es un servidor que donde podemos cargar y descargar archivos. Podemos ver que este servicio ofrece una conexión anónima, por lo que vamos a aprovecharnos de eso:
 
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Si listamos los ficheros que hay en el servidor encontramos un par de ellos que mediante el comando `get <nombre_fichero>` podemos descargarlos en nuestra máquina:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

El archivo ***locks.txt*** contiene muchas contraseñas y el archivo ***tasks.txt*** contiene un texto y el nombre de quien lo ha escrito.

Como tenemos el nombre y una serie de contraseñas vamos a realizar una conexión vía ssh para poder entrar en el sistema:

- Primero creamos un archivo ‘users.txt’ que contenga todos los nombres que hemos obtenidos en la la pagina web anterior.
- Realizamos un ataque de fuerza bruta con `hydra`para poder encontrar un usuario y contraseña compatibles.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/a1.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Ahora procedemos a realizar la conexión `ssh` .

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Ahora vamos a tirar el comando `find`para poder buscar el archivo ***User.txt*** que es nuestra flag a buscar → `find / -type f -name 'user.txt'` . 

Donde ***-type*** (tipo de archivo), ***-name*** (nombre del archivo).

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

---

# Root.txt

Ahora para poder obtener el archivo ***Root.txt*** debemos de escalar privilegios ya que si realizamos la búsqueda anterior de ***find*** nos dirá que no tenemos acceso al directorio /root.

Para ello, vamos a buscar una manera de poder adquirir permisos root.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Vemos que lin puede ejecutar comandos tar, por tanto, vamos a buscar un exploit.

Buscamos el exploit en gtfobins → [GTFOBins](https://gtfobins.github.io/) , buscamos tar y vamos al apartado **Sudo**.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Si tiramos ese comando en el bash de la maquina a atacar tendremos acceso root y podemos realizar la búsqueda del archivo.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BountyHacker/b.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Hemos encontrado la flag de root.txt.