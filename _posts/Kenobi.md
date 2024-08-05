# Kenobi

Created: July 29, 2024 6:56 PM
Etiquetas: Enumeración, Exploit, Privilege Escalation, Samba
Dificultad: Fácil
Enlace:: https://tryhackme.com/r/room/kenobi
Hecho : Jose Luis 
Status: Done

Primero de todo, vamos a realizar un escaneo de puertos de la ip de la máquina víctima:

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled.png)

![Untitled.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%201.png)

Vemos que tenemos en el puerto 21 un servicio de ProFTPD, en el puerto 445 un servicio de recursos compartidos (Samba), además de un servicio ssh en el puerto 22 y también vemos que podemos consultar las monturas de la máquina víctima.

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%202.png)

Si hacemos uso de `smbmap -H <ip_maquina>` podemos consultar los recursos compartidos.

Con `smbclient` podemos navegar entre esos recursos y vemos que hay un fichero `log.txt` que vamos a proceder a descargar:

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%203.png)

Contenido del fichero:

![Untitled.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%204.png)

Este fichero nos indica que hay un usuario “*kenobi*” que ha iniciado sesión mediante un **id_rsa** en una conexión `ssh`.

Si volvemos al escaneo que hemos hecho con Nmap, podemos ver que en el puerto 21 tenemos un servicio ProFTPD que puede ser vulnerable, por tanto, mediante la herramienta `searchsploit` podemos buscar vulnerabilidades del servicio.

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%205.png)

En efecto, tiene vulnerabilidades y mediante la opción `-m` nos descargamos el exploit.

Si abrimos el fichero descargado, encontramos información sobre el exploit y vemos que este nos permite la copia de ficheros del servidor FTP entre directorios cualesquiera:

![1.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/1.png)

Si nos conectamos al servicio ProFTPD con netcat y especificamos el puerto (en este caso 21), podremos copiarnos el fichero `id_rsa` en cualquier directorio, en este caso lo hacemos al directorio `/var/tmp` (que es una de las monturas del servidor).

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%206.png)

Ahora vamos a obtener dicho fichero, para ello vamos al directorio `/mnt` de nuestra máquina y creamos una montura nueva:

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%207.png)

Luego, como podemos ver, insertamos la montura que encontramos en el servidor en la que hemos creado mediante `mount <ip_maquina_victima>:/<recurso_compartido> /nuestra_montura`, donde `<recurso_compartido>` es la carpeta donde hemos movido previamente el fichero **id_rsa**.

Finalmente, si listamos la montura vemos que tenemos en nuestra máquina dicho fichero que podemos usar para realizar la conexión vía `ssh`.

Para ello, le damos permisos de lectura y procedemos a iniciar sesión vía ssh, con las credenciales (usuario *kenobi* y **id_rsa**):

![Untitled.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%208.png)

Ahora buscamos entre directorios las flags:

![1.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/1%201.png)

Ahora nos piden la flag del root, para ello tenemos que escalar privilegios.

Esto lo podemos hacer de varias manera, como buscar los exploits del kernel, ver los comando que el usuario puede ejecutar como SUDO, ver los binarios que tienen el bit SUID activado (ya que siempre se ejecutan como root), entre otros..

![1.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/1%202.png)

Vemos que no ha habido suerte a la hora de hacer `sudo -l` pero hemos encontrado un binario `/usr/bin/menu` sospechoso.

Si lo ejecutamos vemos que contiene un menú que ejecuta 3 comandos:

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%209.png)

Estos 3 comandos siempre se ejecutan como root, así que podemos aprovecharnos de eso, colando dicho binario en el **PATH**, es decir, vamos a realizar un **PATH_Hijacking**.

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%2010.png)

Mostramos por pantalla el PATH y exportamos el directorio del binario al PATH y vemos que ya está incluido.

Ahora incluimos una Shell de Bash dentro del comando `ifconfig` (comando 3 del binario). 

![Untitled](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/Untitled%2011.png)

Le damos todos los permisos y lo exportamos al PATH y lo ejecutamos y vemos que se ejecutó la Shell de Bash como root:

![1.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/1%203.png)

Ahora que somos un usuario root, vamos a buscar la flag que nos falta:

![223.png](Kenobi%20238a55363d9a4e21ae2f7d06ddc19210/223.png)

---