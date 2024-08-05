---
title: Introducción a las redes LAN
layout: post
post-image: "../assets/images/Labs/LAN/nw.png"
description: En este módulo veremos una introducción sobre las redes LAN, las topologías y los componentes que la forman.
enlace: https://tryhackme.com/r/why-subscribe?roomCode=introtolan
difficulty: Fácil
tags: 
  - E
--- 

# Topologías de las redes LAN

> Local Area Network ó LAN es una red privada que permite la comunicación e intercambio de datos entre dispositivos a nivel local (distancias cortas).

En redes cuando nos referimos a topología nos referimos al diseño que tiene la red.
Además estas redes LAN pueden conectarse con otras mediante [routers](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14.md).

Existen varias topologías las cuales tienen sus ventajas y desventajas:

<div style="text-align: center ;">
  <table>
    <tr>
      <th>Topología estrella</th>
      <th>Topología bus</th>
      <th>Topología anillo o token ring</th>
    </tr>
    <tr>
      <td>Los dispositivos están conectados individualmente a un dispositivo de red central, normalmente es un **Swith**. Es muy fácil agregar más dispositivos pero si falla el dispositivo central de red la red se cae y los dispositivos dejan de estar conectados haciendo que no puedan enviar ni recibir datos. ![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled.png)</td>

      <td>Los dispositivos están conectados a un bus de datos “similar a las hojas en una rama”.Son fáciles de configurar y mantener pero se puede producir un cuello de botella a la hora de compartir muchos datos haciendo que la red no se pueda utilizar.![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%201.png)</td>

      <td>Los dispositivos de la red están conectados entre sí en una especie de anillo, donde los datos solo viajan en una dirección.Es muy fácil de solucionar problemas de cualquier falla pero es una red muy poco eficiente y se pueden producir cuellos de botellas. ![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%202.png)</td>

    </tr>
  </table>
</div>

## Topología en estrella

Los dispositivos están conectados individualmente a un dispositivo de red central, normalmente es un [Switch](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14.md).

Es muy fácil agregar más dispositivos pero si falla el dispositivo central de red la red se cae y los dispositivos dejan de estar conectados haciendo que no puedan enviar ni recibir datos.

![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled.png)

## Topología de bus

Los dispositivos están conectados a un bus de datos “similar a las hojas en una rama”.

Son fáciles de configurar y mantener pero se puede producir un cuello de botella a la hora de compartir muchos datos haciendo que la red no se pueda utilizar.

![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%201.png)

## Topología de anillo ó token

Los dispositivos de la red están conectados entre sí en una especie de anillo, donde los datos solo viajan en una dirección.

Es muy fácil de solucionar problemas de cualquier falla pero es una red muy poco eficiente y se pueden producir cuellos de botellas.

![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%202.png)

## ¿Qué es un Switch?

> Los Switches son dispositivos dedicados en la redes los cuales son los encargados de conectar múltiples dispositivos como ordenadores, impresoras y otros dispositivos capaces de hacer uso de Internet. Los switches contienen una serie de puertos donde se conectan estos dispositivos.

Son mucho más eficientes que los ***Hubs*** / ***repeaters***  debido a que el switch mantiene un seguimiento del dispositivo que tiene conectado y a que puerto, haciendo que cuando se reciba un paquete el switch lo envíe específicamente al dispositivo destinatario no como el Hub / repetidores que envían ese paquete en cada puerto.

En la [redes con topología de estrella](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14.md) encontramos que los dispositivos están conectados a un switch.

## ¿Qué es un router?

> *Los routers son los encargados de conectar redes y pasar datos entre ellas, mediante un proceso llamado Enrutamiento.*
> 

El *Enrutamiento* es el proceso de crear rutas entre redes para que los datos puedan ser enviados y recibidos correctamente.

Si queremos conectar una red LAN a Internet, el router es el encargado de conectarse con todos los dispositivos de la red LAN e Internet u otra red LAN.

![Ejemplo de dos redes LAN conectadas mediante un router.](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%203.png)

Ejemplo de dos redes LAN conectadas mediante un router.

# Introducción a las Subredes

> ***Subnetting** es el proceso de dividir una red “grande” en otras redes mucho más pequeñas con un fin concreto.*
> 

Mediante este proceso podemos obtener otras redes mucho más pequeñitas procedentes de una más grande dependiendo del número de hosts de la misma → Por ejemplo, la red de una empresa mediante Subnetting puede estar dividida en varias pertenecientes a cada departamento.

Recordamos que una [dirección IPv4](%C2%BFQue%CC%81%20es%20Networking%20e1a6619d04c0475493d91d886bfec26a.md) está formada por 4 octetos. Para realizar el *Subnetting* hacemos uso de la máscara de red la cual también está formado por 4 octetos que va desde 0 - 255.

Las subredes hacen uso de las direcciones IP de tres maneras diferentes:

| Tipo | Propósito | Explicación | Ejemplo |
| --- | --- | --- | --- |
| Dirección de red (Network Address) | Identifica el inicio de la red actual. | Si un dispositivo tiene como dirección 192.168.1.100 pertenecerá a la red 192.168.1.0 | 192.168.1.0 |
| Dirección Host (Host Address) | Identificar el a un dispositivo en la red actual | Un dispositivo contendrá la dirección de red, nunca podrá hacer uso de la direcciones que terminan en .1 ó .254 | 192.168.1.100 |
| Puerta de Enlace (Default Gateway) | Es una dirección especial, la cual contiene el dispositivo de la red que envía información a otras redes  | Cualquier host de la dirección de red puede ser la puerta de enlace, pero generalmente se hace uso de la dirección que termina en .1. | 192.168.1.1 ó 192.168.0.1 dependiendo del ISP. |

Subnetting ofrece algunos beneficios como eficiencia, seguridad y control total de la red.

# Protocolo ARP

> *El protocolo ARP “Address Resolution Protocol” , es una tecnología responsable de permitir que los dispositivos se identifiquen a ellos mismo en una red.*
> 

![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%204.png)

 El protocolo ARP permite que los dispositivos asocien su dirección MAC con una dirección IP en la red. Si un dispositivo se quiere comunicar con otro, este envía una transmisión a toda la red para buscar la dirección MAC del dispositivo con el que se quiere comunicar.

Por tanto, cada dispositivo contiene una caché donde se almacena los identificadores de los otros dispositivos de la red.

- El dispositivo que se quiere comunicar con otro envía una ***ARP Request*** para buscar la dirección IP del dispositivo con el que se quiere comunicar.
- El dispositivo que contiene esa dirección IP solicitada, este dispositivo envía al dispositivo inicial una **ARP Reply***.*

Tras haberse establecido la conexión el dispositivo inicial almacenará en su caché la información de la conexión.

# Protocolo DHCP

> *El protocolo DHCP “Dynamic Host Configuration Protocol” permite asignar direcciones IP de forma NO manual cuando un dispositivo se conecta a la red.*
> 

![Untitled](Introduccio%CC%81n%20redes%20LAN%208e35f006942e4b05a8f1ff87784d7f14/Untitled%205.png)

Pasos que se realizan a la hora de asignar dinámicamente direcciones IP:

1. Cuando un dispositivo se conecta a la red y aún no tiene una IP asignada manualmente se envía una solicitud ***DHCP Discover*** para ver si hay algún servidor DHCP en la red.
2. Si es así, el servidor DHCP responde con una dirección IP la cual hará uso el dispositivo ***DHCP Offer***. 
3. Luego el dispositivo se vuelve a comunicar con el servidor DHCP enviando una respuesta de confirmación ***DHCP Request.***
4. Por último el servidor DHCP envía al dispositivo una respuesta de que se ha completado el proceso de asignación de la dirección IP y que ya puede hacer uso de ella ***DHCP ACK***.

---