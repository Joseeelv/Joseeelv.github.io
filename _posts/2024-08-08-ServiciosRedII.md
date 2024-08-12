---
title: Servicios de red II
layout: post
post-image: "../assets/images/Labs/ServiciosRedII/srII.png"
description: El laboratorio tiene como objetivo enseñar la enumeración y explotación de tres protocolos de red; NFS (Network File System), SMTP (Simple Mail Transfer Protocol) y MySQL. Los participantes aprenderán a identificar vulnerabilidades y realizar ataques utilizando herramientas comunes en pruebas de penetración y administración de sistemas.
difficulty: Fácil
enlace: https://tryhackme.com/r/room/networkservices2
tags:
- LAB
---

# Protocolo NFS

*Network File System* o *NFS* es un protocolo de red que permite a los sistemas acceder a los archivos de una red, de una manera similar a como acceden a los archivos que tienen en su propio sistema de archivo.

Mediante NFS, tanto los usuarios como los programas pueden acceder a los archivos remotos como si estos fueran locales. Esto se hace montando todo, o una parte de un sistema de archivos en un servidor.

Hace uso del protocolo <strong>RPC</strong> (Remote Procedural Call) para realizar la comunicación cliente-servidor. 

## Como funciona NFS

El servidor NFS configura qué directorios se van a compartir con los clientes en el archivo de configuración `/etc/exports`.

Luego estos directorios compartidos se montan en los clientes del servidor NFS mediante el comando `mount <ip_servidor>:/<directorio_compartido> /mnt/<montura_local>`.

Una vez montado los directorios compartidos que queremos en nuestro propio equipo podemos ejecutar comandos como → `ls`, `cp`, `mv`, etc.

## Como enumerar el protocolo NFS
<ol>
  <li><strong>Uso del comando showmount:</strong>
  Podemos hacer uso del comando <code>showmount -e ip_servidor</code> para ver los directorios compartidos del servidor.</li><br>
  <li><strong>Uso de la herramienta Nmap:</strong>
    Podemos realizar un escaneo de puertos para ver si está abierto un puerto que haga uso de un servicio NFS.</li><br>
  <li><strong>Uso de rcpinfo:</strong>
    Mediante la herramienta <strong>rcpinfo</strong> podemos obtener información sobre los servicios RPC con el comando <code>rcpinfo -p ip_servidor</code>.</li><br>
  <li><strong>Escaneo manual de Directorios:</strong>
    Como hemos comentado antes, los directorios que un servidor va a compartir se configuran en el fichero <code>/etc/exports</code>, por tanto, si realizamos una lectura del mismo encontraremos que recursos comparten y más información.</li><br>
  <li><strong>Uso del comando nfsstat:</strong>
  Este comando proporciona estadísticas y detalles sobre el servicio NFS.</li>
</ol>

## Como explotar el protocolo NFS

1. <strong>Comprobar fichero de configuración /etc/exports:</strong>
    
    Como hemos comentado antes, el fichero de configuración `/etc/exports` puede contener información valiosa a la hora de explotar NFS. Aquí vamos a encontrar si el recurso que se comparte tiene la opción de configuración <strong>root_squash</strong> activada o no.
    
    Esta opción hace que cualquier usuario que tenga privilegios root en el sistema local, sea un usuario sin privilegios en el servidor.
    
    Si no está configurado, es decir, tenemos <strong>no_root_squash</strong> el cliente con privilegios root, tendrá esos permisos en el servidor NFS.
    
    Aquí podemos encontrar información de como escalar privilegios en NFS → [Escalar Privilegios](https://joseeelv.github.io//blog/EPL).
    

### Ejemplo práctico:

1. Realizamos un escaneo de puertos de la ip de la máquina víctima y vemos que tenemos un servicio NFS corriendo en el puerto 2049:

<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>
<div style="text-align:left; ">
  <table>
    <tr>
      <td style="vertical-align:top;">
      2. Vamos a nuestro directorio <code>/tmp</code> y creamos una nueva montura:
        <div style="text-align:center; width:500px;">
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
        </div><br>
      4. Vemos que hay un directorio llamado <code>/.ssh</code> si accedemos a él encontramos los ficheros <strong>id_rsa</strong> y <strong>id_rsa.pub</strong>:
      <div style="text-align:center; ">
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      </td>
      <td>
      3. La montamos en nuetra máquina la montura que está compartiendo la máquina víctima, luego nos cambiamos al directorio que tiene dentro la montura, listamos directorios y vemos algunos archivos:
      <div style="text-align:center; ">
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      </td>
    </tr>
  </table>
</div>

5. Ahora podemos realizar la copia de ambos ficheros en nuestra máquina para poder visualizar su contenido, por ejemplo, visualizamos el contenido de **id_rsa.pub** y vemos que *cappucino* es el usuario del fichero *id_rsa*.
<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
</div>

<div style="text-align:left; ">
  <table>
    <tr>
      <td style="vertical-align:top; width:600px">
      6. Tenemos el usuario <em>cappucino</em> y su <strong>id_rsa</strong>, por tanto, podemos realizar la conexión ssh:
      <div style="text-align:center; ">
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      7. Ya dentro del servidor podemos ver los recursos que comparte:
      <div style="text-align:center; ">
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      Código en C del exploit:
      <pre>int main(){
  setgid(0);
  setuid(0);
  system("/bin/bash -");
  return 0;
}</pre>
      </td>
      <td>
      8. Y vemos que el directorio <code>/home</code> tiene activado el <strong>no_root_squash</strong>, por tanto, si metemos en dicho directorio un script que se ejecute con privilegios root, al no tener dicha configuración activa, si lo ejecutamos seremos un usuario con privilegios root y no uno normal.
      <div style="text-align:center; ">
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      </td>
    </tr>
  </table>
</div>

<div style="text-align:left; ">
  <table>
    <tr>
      <td style="vertical-align:top; width:50%;">
        <div style="text-align:center; ">
        9. Incluimos dicho script en el directorio anteriormente comentado:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
      </td>
      <td>
        <div style="text-align:center; ">
        10. Vemos que se ha incluido y solamente  quedaría ejecutarlo:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 10.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
      </td>
    </tr>
  </table>
</div>

11. Finalmente, si hacemos `./exploitNFS` escalaremos privilegios y tendremos acceso a la flag.

# Protocolo SMTP

El protocolo *SMTP* (Simple Mail Transfer Protocol) es el estándar utilizado para el envío de correos electrónicos a través de redes IP.

SMTP no maneja ni la recepción ni el almacenamiento de correos, para ello se utilizan otros protocolos como *POP3* (Post Office Protocol) o *IMAP* (Internet Message Access Protocol).  

Hace uso de un modelo cliente-servidor, donde el cliente envía los correos electrónicos a un servidor SMTP y estos los envía a otros servidores SMTP de destino.

SMTP hace uso del puerto `TCP 25` para la conexión entre servidores, pero también usa los puertos `TCP 587` (correos con autenticación) y `TCP 465` (correo cifrado “smtps”).

Los mensajes en SMTP se envían en texto plano, pero la conexión puede estar cifrada mediante *TLS/SSL*.

## Como funciona el protocolo SMTP

<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 11.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>
<ol>
  <li>El cliente establece conexión con el servidor cuando manda un correo electrónico a través del puerto 25 (smtp handshake).</li><br>
  <li>Luego SMTP usa un conjunto de comandos (en texto plano) para la comunicación entre el cliente y servidor, donde el servidor responde con códigos de estado que indica el resultado de la solicitud.</li><br>
  <li>La transferencia de mensajes se realiza después de enviar el comando <code>DATA</code>, si el servidor no puede acceder al cliente destinatario, pone el correo electrónico en <strong>SMTP queue</strong>.</li><br>
  <li>La conexión se cierra cuando el cliente hace uso del comando <code>QUIT</code>.</li><br>
</ol>

## Como enumerar el protocolo SMTP

1. <strong>Conexión Telnet manual:</strong>
    
    Primero realizamos una conexión mediante Telnet:
    
    ```bash
    telnet <ip-servidor> 25
    telnet <ip-servidor> 587 //si es con autenticación
    ```
    
    Luego, podemos enviar comandos SMTP:
    
    ```bash
    EHLO ejemplo.com
    VRFY user@example.com
    EXPN list@example.com
    QUIT
    ```
    
2. <strong>Uso de la herramienta Nmap con scripts SMTP:</strong>
    
    Como hemos hecho en otros protocolos, podemos hacer uso de:
    
    ```bash
    nmap -p 25 --script smtp-enum <ip-servidor>
    ```
    
    <strong>Scripts Útiles de Nmap para SMTP:</strong>
    
    - <strong>smtp-enum</strong>: Enumera los usuarios y dominios disponibles.
    - <strong>smtp-commands</strong>: Enumera los comandos soportados por el servidor SMTP.
    - <strong>smtp-vrfy</strong>: Verifica si el servidor acepta la verificación de usuarios.
    - <strong>smtp-open-relay</strong>: Comprueba si el servidor es un relay abierto.
3. <strong>Uso del comando smtp-user-enum:</strong>
    
    `smtp-user-enum` es una herramienta diseñada para enumerar usuarios en servidores SMTP, para ello podemos hacer uso de:
    
    ```bash
    smtp-user-enum -M VRFY -U listausuario.txt -t <ip-servidor>
    ```
    
    - `-M VRFT`: Usamos el comando `VRFY` para enumerar servicios.
    - `-U listausuario.txt`: Especifica el archivo de texto que contiene la lista de usuarios a probar.
    - `-t <ip-servidor>`: Especifica la ip del servidor SMTP.
4. <strong>Uso de Metasploit framework:</strong>
    
    Metasploit Framework incluye módulos para enumerar y explotar servicios SMTP.
    
5. <strong>Uso de smtp-cli:</strong>
    
    `smtp-cli`: es una herramienta de línea de comandos para probar servidores SMTP y enviar correos electrónicos desde una línea de comando.
    

## Como explotar el protocolo SMTP

1. <strong>Ataque de fuerza bruta:</strong>
    
    Mediante `hydra` podemos realizar una ataque de fuerza bruta si contamos con el *username* de un usuario y un diccionario; por ejemplo *rockyou.txt*.
    
    ```bash
    hydra -t 16 -l <username> -P <ruta_diccionario> -vV <ip-servidor> [protocolo]
    ```
    
    - `-t 16`: número de conexiones paralelas por objetivo, en este caso 16.
    - `-l <username>`: Nombre de usuario a atacar.
    - `-P <ruta_diccionario>`: Ruta del diccionario, por ejemplo /usr/share/wordlists/rockyou.txt.
    - `-vV`: Pone el verbose a *very verbose* mostrando login+pass cada vez que realiza un intento.
    - `<ip-servidor>`: Indica la dirección IP del servidor.
    - `[protocolo]`: Añade el protocolo, por ejemplo ssh.

### Ejemplo práctico:

1. Realizamos un escaneo de los puertos de la red para ver cuales están abiertos y que servicios están corriendo:

<div style="text-align:left;">
  <table>
    <tr>
      <td>
        <div style="text-align:center; ">
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 12.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
      </td>
      <td>
      <div style="text-align:center; ">
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 13.png" alt="Untitled" onclick="openModal(this.src)" style="width:75%"/>
      </div>
      </td>
    </tr>
  </table>
</div>

2. No encontramos nada, pero sabemos que podemos hacer uso de metasploit, con `msfconsole` activamos la herramienta y vamos a buscar exploits sobre “mstp_version”:

<div style="text-align:left;">
  <table>
    <tr>
      <td style="vertical-align:top; width:650px">
        <div style="text-align:center;">
        2.1 Mediante <code>search nombre_modulo</code> realizamos una búsqueda de los exploits:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 14.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
        </div>
      </td>
      <td style="vertical-align:top;">
      <div style="text-align:center; ">
      2.2 Mediante <code>options modulo</code> podemos listar las opciones que tiene el exploit:
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 15.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      </td>
    </tr>
  </table>
</div>

<p>Vamos a especificar el host, en este caso será la ip de la maquina victima, lo hacemos mediante el comando <code>set [opcion] valor</code>, en nuestro caso → <code>set RHOSTS ip-maquina</code>.</p>

<div style="text-align:center;">2.3 Ahora, lo ejecutamos con <code>run</code>:</div>
<div style="text-align:center; vertical-align:top;">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 16.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

Vemos que el MTA de *polosmtp.home* es Postfix.

3. Ahora, con metasploit podemos enumerar los usuarios del servicio smtp → `search smtp_enum`

<div style="text-align:left;">
  <table>
    <tr>
      <td style="vertical-align:top; width:650px">
        <div style="text-align:center; ">
        3.1 Vemos las opciones que tiene el exploit:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 17.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
        </div>
      </td>
      <td style="vertical-align:top;">
      <div style="text-align:center; ">
        3.2 Añadimos las opciones necesarias para que se pueda ejecutar:
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 18.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
      Ahora tenemos que especificar tanto el <code>RHOST</code> (igual que antes) como <code>USER_FILE</code> (diccionario con usernames).<br>
      Si no tienes el diccionario instalado, haz → <code>sudo apt install seclists -y</code>.<br>Añadimos el diccionario y ejecutamos.<br>
      Hemos encontrado a los usuarios, en este caso solamente existe el administrador.
      </td>
    </tr>
  </table>
</div>

4. Ahora, si vemos el escaneo de puertos, vemos que hay un servicio ssh corriendo, por tanto, vamos a realizar una ataque de fuerza bruta para conseguir la contraseña del usuario <em>administrator</em>:

<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 19.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

<table>
  <tr>
    <td style="vertical-align:top; width:600px">
      <div style="text-align:center; ">
      5. Conseguimos la contraseña y realizamos la conexión ssh con las credenciales:
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 20.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px"/>
      </div>
    </td>
    <td style="width:550px; text-align:center;">
      <div style="text-align:center;">
      6. Dentro del servidor buscamos la flag:
        <img src="../assets/images/Labs/ServiciosRedII/Untitled 21.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%;max-width:500px" />
      </div>
    </td>
  </tr>
</table>

# Gestión de bases de datos relacionales MySQL

*MySQL* es un gestor de bases de datos relacionales (RDBMS), basado en un Lenguaje Estructurado mediante Consultas (Structured Query Language) ampliamente utilizado para almacenar, gestionar y recuperar datos en aplicaciones web y sistemas empresariales. 

Un uso muy común de MySQL sería la de una base de datos para back end.

Hace uso del puerto `TCP 3306`.

## Como funciona MySQL

El servidor SQL puede realizar consultas a la base de datos, modificarla, crear nuevas o eliminar bases de datos ya existente.

Aquí podemos encontrar más información sobre [SQL](https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_SQL_EXECUTION.html)

## Como enumerar MySQL

1. <strong>Uso de la herramienta Nmap:</strong>
    
    ```bash
    nmap -p 3306 --script=mysql-info <target>
    ```
    
    Este comando escanea el puerto 3306 (puerto predeterminado para MySQL) e intenta identificar información sobre el servicio MySQL.
    

## Como explotar MySQL

1. <strong>Realizar una inyección SQL (SQLi):</strong>
    
    Podemos buscar puntos de entrada donde se ingresan datos que se utilizan directamente en consultas SQL. Por ejemplo, formularios web, parámetros de URL, etc.
    
    Podemos ver más información sobre este tipo de ataque en → [Introducción a las SQL injection](https://joseeelv.github.io//blog/IntroSQLi).
    
2. <strong>Explotación de Configuración Incorrecta:</strong>
    
    Podemos comprobar si el servidor MySQL está configurado sin una contraseña para el usuario root:
    
    ```bash
    mysql -u root
    ```
    
    También podemos comprobar si un usuario tiene privilegios elevados sin necesidad, si este puede realizar consultas privilegiadas:
    
    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'localhost' WITH GRANT OPTION;
    ```
    
3. <strong>Explotación de Vulnerabilidades Conocidas</strong>
    
    Podemos hacer uso de vulnerabilidades conocidas <strong>CVEs</strong> si el servidor no ha sido actualizado.
    
    También algunos plugins de MySQL pueden contener vulnerabilidades que pueden ser explotadas si el servidor MySQL está mal configurado.
    

### Ejemplo práctico:

1. Realizamos un escaneo de la red:<br>
<div style="text-align:center;">
  <pre>sudo nmap -p- -sS -sV -sC -n -Pn -vvv --min-rate 5000 ip_maquina</pre>
</div>
<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 23.png" alt="Untitled" onclick="openModal(this.src)" style="width:50%"/>
</div><br>
Vemos que en el puerto 3306 tenemos un servicio corriendo, para poder explotarlo podemos hacer uso de metasploit.

2. Hacemos uso de `Mestasploit framework`:

<div style="text-align:left;">
  <table>
    <tr>
      <td style="vertical-align:top; width:650px">
        <div style="text-align:center; ">
        2.1 Buscamos el exploit:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 24.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
        2.3 Ponemos las opciones que nos faltan para que el exploit funcione:
        <ul>
          <li> <code>set userane root</code></li>
          <li> <code>set password password</code></li>
          <li> <code>set rhosts ip-victima</code></li>
        </ul>
      </td>
      <td style="vertical-align:top;">
        <div style="text-align:center; ">
        2.2 Vemos las opciones que faltan:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 25.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
      </td>
    </tr>
  </table>
</div>

3. Ejecutamos el exploit con `run` y obtenemos la versión de la base de datos:

<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 26.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

4. Ahora, vamos a mostrar las bases de datos → `set sql "show databases"` 

<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 27.png" alt="Untitled" onclick="openModal(this.src)"/>
  
  Encontramos 4 bases de datos.
</div>


5. Ahora que tenemos enumerado el servicio SQL, vamos a explotarlo:<br>
<div style="text-align:left;">
  <table>
    <tr>
      <td style="vertical-align:top; width:650px">
        <div style="text-align:center; ">
          5.1 Para ello, vamos a dumpear las bases de datos con el módulo → <code>/mysql/msql_schemadump</code>
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 28.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
        Especificamos las opciones para poder correr el exploit (como arriba) y lo ejecutamos y nos muestra todas las tablas que hay en la base de datos.
      </td>
      <td style="vertical-align:top;">
        <div style="text-align:center; ">
        5.2 Ejecutamos el exploit:
          <img src="../assets/images/Labs/ServiciosRedII/Untitled 29.png" alt="Untitled" onclick="openModal(this.src)"/>
        </div>
      </td>
    </tr>
  </table>
</div>

Como resultado tenemos los creadores de las bases de datos junto con sus password, pero esta está cifrada con hash:
<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 30.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

6. Vemos que hay un usuario ‘*carl*’,que no es un usuario por defecto, y tenemos su password hasheada, por tanto la vamos a guardar en un fichero para descifrarla.<br>
Para ello, copiamos el hash en nuestra máquina y mediante `JohnTheRipper` y un diccionario la vamos a descrifrar:
<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 31.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>


- <strong>Password descifrada con JohnTheRipper</strong> → doggie
    

7. Ahora vamos a acceder a la base de datos vía **SSH** con las credenciales del usuario *carl* ya que tenemos un servicio corriendo:<br>
Finalmente, buscando entre los directorios encontramos la flag.
<div style="text-align:center; ">
  <img src="../assets/images/Labs/ServiciosRedII/Untitled 32.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

---