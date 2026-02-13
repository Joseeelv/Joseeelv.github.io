To begin with, let's perform a port scan to identify which ports are open:

<div style="text-align:center;">
  <pre><code class="language-bash" >sudo nmap -p- -open -sS -n -Pn -vvv --min-rate 5000 &lt;target_IP&gt; -oN filename</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/1.png" alt="Port Scanning" style="width:100%; max-width:inherit;">
</div>

As you can see above, we found two ports → 22 (<em>SSH</em>) and 80 (<em>HTTP</em>).

Now, let's perform a more exhaustive scan using the most common scripts (<code>-sCV</code>) to identify the versions and services running on these ports:

<div style="text-align:center;">
  <pre><code class="language-bash" >sudo nmap -sCV &lt;target_IP&gt; -oN filename</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/2.png" alt="Service Scanning" style="width:100%; max-width:inherit;">
</div>

By using <code>Whatweb</code> (Wappalyzer for terminals), we can check the technologies used by the web application.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/3.png" alt="Whatweb Results" style="width:100%; max-width:inherit;">
</div>

Now, using a fuzzer, in this case, <code>wfuzz</code> we can look for hidden directories on this website.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/4.png" alt="Fuzzing Results" style="width:100%; max-width:inherit;">
</div>

We found that the `robots.txt` file is accessible, and it can provide us information if it's not properly configured.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/5.png" alt="Robots.txt" style="width:100%; max-width:inherit;">
</div>

Indeed, we found a hidden directory called `/ghost`, and if we access it, we will find a login panel.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/6.png" alt="Ghost Login Panel" style="width:100%; max-width:inherit;">
</div>

At the same time, we can perform a subdomain scan, as it could reveal useful information.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/7.png" alt="Subdomain Scan" style="width:100%; max-width:inherit;">
</div>

We found the subdomain `dev`, so if we access it, we will find the following:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/8.png" alt="Dev Subdomain" style="width:100%; max-width:inherit;">
</div>

As you can see above, we are facing a website that a first glance doesn't offer much. Just like at the beginning, we can fuzz the website to look for hidden directories:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/9.png" alt="Git Directory Found" style="width:100%; max-width:inherit;">
</div>

Nice! We found the hidden directorio `.git`, which indicates that it is a version control system directory used by Git to manage a project's source code.

In addition, we can see some of the project's directories.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/10.png" alt="Git Directories" style="width:100%; max-width:inherit;">
</div>

The most notable directory is `/logs`, as it might contain system log information. However, we found a potential user: `dev@linkvortex.htb`.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/11.png" alt="User Found" style="width:100%; max-width:inherit;">
</div>

We can make use of this <a href="https://github.com/lijiejie/GitHack/tree/master" target="_blank">GitHub repository</a> to reconstruct the source code from the `/.git` directory and discover sensitive information.

A good practice is to read the <em>ReadMe</em> file to understand what the code does.

If you run the script, you will see many lines starting with "<em>[File not found]</em>", so we can exclude them using the following command line:

<div style="text-align:center;">
    <pre><code class="language-bash" >python3 GitHack.py http://dev.linkvortex.htb/.git | grep -v '^\[File not found\]'</code></pre>
</div>

As a result, we have this <em>JavaScript</em> script:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/12.png" alt="JavaScript Script" style="width:100%; max-width:inherit;">
</div>

We can check the information of this script:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/13.png" alt="Script Information" style="width:100%; max-width:inherit;">
</div>

We found this password `OctopiFociPilfer45`, so we can use either `dev@linkvortex.htb:OctopiFociPilfer45` or `admin@linkvortex.htb:OctopiFociPilfer45` as credentials, since we are located in the `/admin` directory, which could be a potential user.

Now, we can try logging in with these credentials:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/14.png" alt="Successful Login" style="width:100%; max-width:inherit;">
</div>

If we try with `admin`, we can successfully login.

With `Wappalyzer`, we can identify the technologies used by the website in order to search for potential vulnerabilities to exploit:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/15.png" alt="Wappalyzer Results" style="width:100%; max-width:inherit;">
</div>

We see that the website is using a <em>Ghost CMS</em> version 5.58, so we can try to search for vulnerabilities related to this CMS version.

On GitHub, we can find this exploit for the vulnerability CVE-2023-40028, which allows arbitrary file reading: <a href="https://github.com/0xDTC/Ghost-5.58-Arbitrary-File-Read-CVE-2023-40028." target="_blank">EXPLOIT!</a>

This exploit allows us to remotely read any file, as long as the file does not have elevated privileges, such as root, for example.

To do this, you need to modify the URL inside the script to point to the path of your CMS:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/16.png" alt="Exploit Modification" style="width:100%; max-width:inherit;">
</div>

Now, we can execute the script with the credentials you obtained earlier to authenticate:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/17.png" alt="Exploit Execution" style="width:100%; max-width:inherit;">
</div>

We found the user `node` by viewing the content of `/etc/passwd` file, but we cannot see the content of the `/etc/shadow` file since it has root privileges.

Since we want to find a way to access the machine, let's gather information from it.

We can look for the Ghost configuration file, which is this case will be located at → `var/lib/ghost/config.production.json`

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/18.png" alt="Config File" style="width:100%; max-width:inherit;">
  </div>

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/19.png" alt="Credentials Found" style="width:100%; max-width:inherit;">
</div>

Great! We found the user `bob@linkvortex.htb:fibber-talented-worth`. We can try using these credentials to access the server via <em>SSH</em>:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/21.png" alt="SSH Access" style="width:100%; max-width:inherit;">
</div>

Awesome! We are in. We can use the command `export TERM=xterm` to be able to use CTRL+L.

Now, our goal is to find the flags, so we begin by looking for the <em>user flag</em>:

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/22.png" alt="User Flag" style="width:100%; max-width:inherit;">
</div>

After that, let's escalate privileges to access the <em>root flag</em>.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/23.png" alt="Sudo Privileges" style="width:100%; max-width:inherit;">
</div>

We observe that the script `clean_symlink.sh` runs as root without requiring a password for any file with '.png' extension.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/24.png" alt="Script Analysis" style="width:100%; max-width:inherit;">
</div>

This script handles symbolic links pointing to pictures with the '.png' extension. In addition, it quarantines symbolic links that point to directories such as `/root` or `/etc`.

Therefore, we can create a new symbolic link pointing to any file in those two directories to read its content.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/25.png" alt="Symbolic Link" style="width:100%; max-width:inherit;">
</div>

This happens because, when they are sent to the `/var/quarantined` directory, we have full permissions since we are the owners of that directory.

Therefore, we will create a new '.txt' file that points to the `/root/root.txt` file. Then, this new file will be referenced through a symbolic link to one with '.png' extension so that can executes and allows to escalate privileges.

Finally, it will be sent to the previously mentioned directory, where we will retrieve the obtain the contents of the file in question.

<div style="text-align: center;">
  <img src="/images/Rooms/HTB/LinkVortex/26.png" alt="Root Flag" style="width:100%; max-width:inherit;">
</div>

Great! We have obtained the <em>root flag</em> and, therefore, we completed the machine.

---

<div style="text-align: center;">
  <a href="https://www.hackthebox.com/achievement/machine/1157775/638" target="_blank">
    <img src="/images/Rooms/HTB/LinkVortex/27.png" alt="Hack The Box Achievement" style="width:100%; max-width:inherit;">
  </a>
</div>
