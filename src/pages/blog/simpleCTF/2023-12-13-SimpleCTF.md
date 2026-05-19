In this room we are going to proceed to obtain the flags _user.txt_ and _root.txt_ through several techniques that we are going to see below.

First of all, we are going to perform a port scan to see what information we can find.

Using the command `nmap -p- <ip_machine>` we can see all the open ports on the machine.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf1.png" alt="Nmap full port scan output revealing open ports 21, 80, and 2222 on the target machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We found several open ports, let's gather information about the obtained ports.

<div style="text-align:center;">
  <pre><code class="language-bash">nmap -sC -sV -p&lt;ports&gt;- --min-rate 3000 &lt;ip_machine&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf2.png" alt="Nmap service version scan identifying FTP, HTTP, and SSH services on the discovered ports" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

As a result, we have obtained the following ports:

- `Port 21`: FTP service, which is used for file transfer.
- `Port 80`: HTTP service, which is used for web hosting.
- `Port 2222`: SSH service, which is used for secure remote access.

If we access the web page hosted on port 80, we can see that there is a web page hosted on it.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf3.png" alt="Apache2 default webpage served on port 80 of the target machine" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Nice, we have found a Apache2 default page, let's see if we can find any interesting information on this web page. To do this, we are going to use the tool _gobuster_ to perform a directory enumeration.

<div style="text-align:center;">
  <pre><code class="language-bash">gobuster dir -url &lt;machine_ip&gt; -w &lt;wordlist&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf4.png" alt="Gobuster directory enumeration results identifying /robots.txt and /simple endpoints" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Awasome, we have found two directories, _robots.txt_ and _simple_, let's see what information we can find in these directories.

## /robots.txt

This endpoint is used to indicate to web crawlers which directories they can access and which they cannot. In this case, we can see that there is a directory called _simple_ that is not allowed to be accessed by web crawlers, let's see if we can access it manually.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf5.png" alt="robots.txt file content showing the /simple directory restriction" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

## /simple

Now, this endpoint is pretty relevant, because we are in front of a CMS home page. If we inspect the page, we can see that there is a link to a login page, let's see if we can access it.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf6.png" alt="CMS Made Simple homepage with navigation menu and login link" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Indeed, we have found a login page, let's see if we can find any vulnerability in this login page.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf7.png" alt="CMS Made Simple login page with admin credential input fields" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We can use _searchsploit_ to see if there are any known vulnerabilities in this CMS.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf8.png" alt="Searchsploit search results showing CVE-2019-9053 SQL injection vulnerability for CMS Made Simple" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We have found a vulnerability, CVE-2019-9053, which is a SQL Injection vulnerability. This vulnerability allows us to extract the password of the user _mitch_.

But, searching in Google we can find a script that exploits this vulnerability, which is written in Python3. We can find it in <a href="https://github.com/pedrojosenavasperez/CVE-2019-9053-Python3" target="_blank">https://github.com/pedrojosenavasperez/CVE-2019-9053-Python3</a>

Using this script, we can extract the password of the user _mitch_.

<div style="text-align:center;">
  <pre><code class="language-bash">python3 exploit.py -u &lt;url&gt; --crack -w &lt;wordlist&gt;</code></pre>
</div>

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf9.png" alt="Python3 exploit script output extracting user mitch's password hash using CVE-2019-9053" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We have obtained the password of the user _mitch_, which is _sunbath_. However, this password is encrypted, so we need to decrypt it to be able to use it.

We can use the tool _hashcat_ to decrypt the password. We can see that the hash type is 20, which corresponds to MD5.

Now, we can use that password to establish an SSH connection to the target machine.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf10.png" alt="SSH connection established to the target machine as user mitch" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

After successfully connecting to the machine, we can see that we are in the home directory of the user _mitch_. In this directory, we can see a file called _user.txt_, which contains the user flag.

We can now display the content of the user flag by executing the `cat` command:

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf11.png" alt="cat user.txt output revealing the user flag" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We have successfully retrieved the user flag.

Navigating to the parent directory via `cd ..`, we observe two user directories: _mitch_ (containing the user.txt file) and _sunbath_.

Attempting to access the _sunbath_ directory with `cd sunbath` results in a permission denial error, indicating insufficient access rights.

To escalate our privileges, we must enumerate potential privilege escalation vectors using the `sudo -l` command:

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf12.png" alt="sudo -l output showing vim can be executed with sudo privileges" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

The output reveals that the _vim_ binary can be executed with elevated privileges without password authentication. This misconfiguration presents a critical privilege escalation vulnerability. We can consult GTFOBins <a href="https://gtfobins.github.io/" target="_blank">https://gtfobins.github.io/</a> to identify exploitation methodologies for this binary.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf13.png" alt="GTFOBins documentation showing the vim sudo privilege escalation technique" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We execute the privilege escalation exploit by invoking `sudo vim` and leveraging its shell escape functionality. Consequently, we spawn an interactive bash shell to facilitate filesystem traversal and subsequent root flag retrieval.

<div style="text-align: center;">
  <img src="/images/Rooms/THM/SimpleCTF/sctf14.png" alt="Root shell obtained through vim privilege escalation, displaying the root flag" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
