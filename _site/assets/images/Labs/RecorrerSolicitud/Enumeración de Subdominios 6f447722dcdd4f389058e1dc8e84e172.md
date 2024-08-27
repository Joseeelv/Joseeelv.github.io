# Enumeración de Subdominios

Created: September 18, 2023 9:29 PM

La enumeración de subdominios es el proceso de descubrir los subdominios válidos de un dominio.
Pero primero vamos a refrescar que es un dominio.

Un dominio es un nombre que identifica a una página web en concreto. Es la 'traducción' de la dirección ip de un sitio web a una palabra fácil de recordar.

Por ejemplo la URL `https://www.google.com` vemos que contiene el dominio 'google.com' (la cual se traduce de la ip de Google 8.8.8.8), cuyo subdominio es ' *www* ' y con una extensión '.*com*'.

Para poder obtener estos subdominios encontramos 3 métodos:

- Fuerza bruta
- OSINT
- Virtual Host

# OSINT - Certificados SSL/ TLS

Cada vez que un '*Certificate Authority*' (CA) crea un certificado SSL/TLS para un dominio, este se registra en un registro de transparencia pública (CT).Es decir, podemos capturar todos los certificados SSL/TLS de un dominio en concreto.

El propósito de los registros de transparencia de certificados (CT) es impedir que se utilicen certificados maliciosos o creados accidentalmente.

Hay paginas webs que nos ofrecen bases de datos de certificados en las cuales podemos realizar búsquedas que muestran resultados actuales e históricos.

[https://crt.sh/](https://crt.sh/)
[https://transparencyreport.google.com/https/certificates](https://transparencyreport.google.com/https/certificates)

# OSINT - Motores de Búsqueda

Los motores de búsqueda junto con Google Dorking, es un método muy potente a la hora de descubrir nuevos subdominios.

Por ejemplo, podemos hacer uso de 'site' en el motor de búsqueda de Google para poder buscar solamente con el dominio especificado.

`site:filtro -site:www.tudominio.com site:*.tudominio.com`

# Enumeración DNS por fuerza bruta

Es un proceso de probar diferentes subdominios en sucesiones muy rápidas, haciendo uso de una wordlist que contiene subdominios.

Hay herramientas potentes para automatizar este proceso:

## **Dnsrecon**

Es una herramienta que nos ayuda a automatizar el proceso de enumeración de DNS mediante fuerza bruta.
Viene preinstalada en el sistema operativo Kali Linux, y se utiliza en la terminal escribiendo dnsrecon.

`dnsrecon -d [dominio.com](http://dominio.com/) -D ruta_de_la_wordlist_subdominios -t std -xml ouput.xml`

Donde encontramos que dnsrecon escanea un dominio (-d dominio.com), usa una wordlist con subdominios (-D ruta_de_la_wordlist_subdominios), especifica el tipo estándar (-t std) y guarda el resultado en un archivo .xml (-xml output.xml).

## **Sublist3r**

Aquí hacemos uso de hilos y de motores de búsqueda, además no viene preinstalada con Kali.

Ejemplo de búsqueda de subdominios de Kali.org

`sublist3r -d [kali.org](http://kali.org/) -t 3 -e google`

Vemos que hacer una búsqueda de los subdominios del dominio (-d kali.org), usando el motor de búsqueda de Google (-e google) con 3 hilos (-t 3).

# Hosts Virtuales

Algunos subdominios pueden ser no ser públicamente detectables a través de los resultados DNS, por ejemplo, versiones de desarrollo de una aplicación web o portales de administración. Estos registros DNS a veces se pueden almacenar en servidores DNS privados o en el host `etc/hosts` en Linux ó en el archivo `c:\windows\system32\drivers\etc\hosts` en Windows.

Con la herramienta ffuf podemos automatizar el proceso de monitorización de la respuesta de la petición que un atacante puede hacer a un sitio web, debido a que la cabecera 'Host' en una petición web contiene que sitio web está solicitando el cliente.

Esta herramienta la vimos anteriormente en [‘Herramientas Automatizadas de Descubrimiento de contenidos*’*](https://www.notion.so/Descubrimiento-de-contenidos-f2a85e0fdf1d4e8da374a923740d8eb4?pvs=21)

Ejemplo de uso de **ffuf**: `ffuf -w ruta_de_la_wordlist -H cabecera -u ip_maquina -fs filtro_salida`