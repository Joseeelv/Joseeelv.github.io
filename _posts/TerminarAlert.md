---
title: Alert
layout: post
post-image: "/assets/images/Rooms/HTB/Alert/Alert.png"
description: "Alert machine on Hack The Box explores web vulnerabilities like XSS and brute force for gaining access. We use Hashcat to crack passwords and escalate privileges via chisel and web exploitation."
difficulty: Easy
enlace: https://app.hackthebox.com/machines/Alert
os: Linux
skills:
- XSS
- LFI
- RCE
- Port forwarding
- Hash cracking
---
<table>
  <tr>
    <td>
      To begin, I will perform a port scan to identify which ports are open on the target system:
      <div style="text-align:center;">
        <div class="code-container">
          <div class="code-header">
            Bash
            <button class="copy-button" data-code="bash">Copy</button>
          </div>
          <pre><code class="language-bash">sudo nmap -p- -open -sS -n -Pn -vvv --min-rate 5000 &lt;target_IP&gt; -oN PortDiscovery</code></pre>
        </div>
        <div style="text-align: center;">
          <img src="../assets/images/Rooms/HTB/Alert/1.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
        </div>
      </div>
    </td>
    <td>
      Secondly, I will perform an exhaustive scan to identify the versions and services running on these ports:
      <div style="text-align:center;">
        <div class="code-container">
          <div class="code-header">
            Bash
            <button class="copy-button" data-code="bash">Copy</button>
          </div>
          <pre><code class="language-bash">sudo nmap -sCV &lt;target_IP&gt; -oN portVersions</code></pre>
        </div>
        <div style="text-align: center;">
          <img src="../assets/images/Rooms/HTB/Alert/2.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:650px;">
        </div>
      </div>
    </td>
  </tr>
</table>

As you can see above, I decided to save the evidences in order not to lose them.

Also, we can see that virtual hosting is being performed at <em>http://alert.htb</em>, so we need to include this domain in our <code>/etc/hosts</code> file.

Great! After both scans, we have gathered several piece of information about the open ports, such as port 22 (<em>SSH</em>) and port 80 (<em>HTTP</em>) services.

At this moment, we don't have credentials to perform a connection via <em>SSH</em>, so our next step will be check the website running on port 80.

<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert/3.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
  <p>Website running on port 80.</p>
</div>

We can try to fuzz the website, but we will see that it does not contain any hidden directories.

But, there is no problem. On this web application we can see that it is a '<em>Markdown Viewer</em>' and we can upload Markdown '.md' files.

<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert/4.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>
<div style="text-align: center;">
  <img src="../assets/images/Rooms/HTB/Alert" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:910px;">
</div>

Escaneo de los puertos abiertos de la máquina vícitma

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/229159d4-b659-4a95-8e1f-2e4cf2f11ca3/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/175a2a46-6028-4eee-abdd-dd91a216fa3c/image.png)

Para acceder a la web tenemos que modificar el `/etc/hosts`.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/506e1111-b4a8-417b-85c7-f63fbaeaed51/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/cf572d4b-5bea-4b93-8bea-da86448af2e0/image.png)

Subimos el archivo indicando la ruta a leer, y luego guardamos el enlace del botón “share markdown”, el cual lo pondremos en la caja de comentarios de ‘*Contact Us*’ (ya que es vulnerable a XSS):

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/72868f59-ac1e-4f89-b275-7909396ae800/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/7539d78b-7589-401c-85f9-fd7291c9c5c5/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/15dcb447-0cd7-44d0-97a6-a310262e1dd0/image.png)

Contenido del `/etc/passwd` url-encoded:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/25243392-f7fe-41ef-a883-562d08f27535/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/eb5f6cec-9811-4c6a-b900-e3db98a19060/image.png)

Hemos encontrado los usuarios *david* y *albert*, vamos a intentar realizar una ataque de fuerza bruta al protocolo ssh.

Pero no hay respuesta de las contraseñas, por lo que tendremos que seguir buscando información mediante el XSS con RCE:

Como estamos en un servidor *Apache* primero nos interesa saber el contenido del directorio `/etc/apache2/sites-enabled/000-default.conf`:

Destacamos lo siguiente:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/c16a4c79-f279-4b3b-a065-0b683aff4c3e/image.png)

Donde vemos que el directorio `/var/www/statistics.alert.htb/.htpasswd` contiene credenciales de autenticación del usuario, por lo que vamos a echarle un ojo, configurando el .md con dicha ruta:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/388ddbde-892f-4926-9e00-7b0a17298a5a/image.png)

Vamos a ver que nos devuelve el servidor:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/11f493f5-2f34-4e8e-a47b-8d65ef2effd7/image.png)

Vemos que tenemos al usuario *albert* con el hash de su contraseña, por lo que vamos a hacer uso de Hashcat para conseguir la password:

```bash
hashcat -a 0 -m 1600 hash.txt /usr/share/wordlists/rockyou.txt
```

Donde, `-a 0` es el modo de ataque por diccionario y `-m 1600` es el hash correspondiente a Apache md5.

Con estas credenciales, podemos acceder via ssh al servidor:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/d343fad4-e484-4069-9b7b-3e7b32b12078/image.png)

Ahora escribimos → `ssh albert@IP_Victima` y ponemos la contraseña crackeada, y estamos dentro:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/8fe5aeb9-af35-49fd-8fcd-ba754be89cff/image.png)

Buscamos la user.txt y la mostramos por pantalla.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/b60a683a-f95f-4624-b1d5-2f59f367d872/image.png)

Ahora, nuestro objetivo es buscar un vector de escalada de privilegios:

Buscamos los binarios con bit SUID activados, pero no encontramos nada:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/e560b73a-c71c-4ce6-83e5-3eb33d3de0b8/image.png)

Vamos a hacer uso de `sudo -l`:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/4cde6eaf-f90b-4f3c-ba2b-488bb8d0b1dc/image.png)

Tampoco podemos hacer uso de `sudo -l`, vamos a buscar si hay tareas programadas y nada.

Podemos buscar también si el root está realizando una escucha mediante el comando `netstat`:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/7e8218e0-9c11-4ae0-9134-f2f0c81beec6/image.png)

Este es un puerto que no es accesible desde afuera, por lo que podemos hacer un port forwarding con **chisel** a nuestra máquina → https://github.com/jpillora/chisel/releases/tag/v1.10.1

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/b0bb38d8-e458-47c3-97e1-d3b151fe37f7/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/96f950e0-4b2c-4c53-b6ba-f50791de1482/image.png)

Nos mandamos el chisel a la máquina victima y ejecutamos:

En nuestra máquina (modo servidor)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/316fffde-db3e-4ab4-8d00-ba32eee2dee6/image.png)

En la máquina victima (modo cliente)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/39bc9004-e778-4abc-aa9e-6d3fc25f0bba/image.png)

Si ahora accedemos a la web o hacemos un **curl** a `localhost:8080` tenemos lo siguiente:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/a7b9affa-39d1-40c9-a004-6a121084894e/image.png)

Esta web está contenida en el directorio `/opt/website-monitor`:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/8a99a889-0709-4ee9-9ec7-028cf07c0073/image.png)

Buscamos un directorio donde podamos escribir, por ejemplo en `/config`:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/a175ab0b-a2b5-4617-a14e-4fd4eaf7e6d1/image.png)

Nos ponemos en escucha desde nuestra máquina a dicho puerto y ahora desde el navegador o haciendo uso de `curl` accedemos al recurso:

```bash
curl -s localhost:8080/config/shell.php
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/cb3d9bdd-2e85-4075-b6ff-75c69dacb909/image.png)

Como resultado tenemos:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8f396de2-05f7-44d7-a3a6-2a1d1cd3b2c2/ec171ee3-5c1d-412b-8aa9-5f80cb4e9117/image.png)

---

[Owned Alert from Hack The Box!](https://www.hackthebox.com/achievement/machine/1157775/636)