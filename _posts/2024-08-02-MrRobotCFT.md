---
title: Mr Robot CTF
layout: post
post-image: "../assets/images/Rooms/MrRobotCTF/mr.png"
description: Based on the Mr. Robot show, can you root this box?
difficulty: Medium
enlace: https://tryhackme.com/r/room/mrrobot
tags:
- Enumeration
- Exploit
- Brute force
- Hash cracking
- Web
---

# Process to obtain the user.txt:

We are going to perform an port scan from the attacking machine:
 
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy
      </button>
    </div>
    <pre><code class="language-bash" >sudo nmap -p- -open -sV -sC -sS --min-rate 5000 -n -Pn -vvv target_IP</code></pre>
  </div>
</div>

We have obtained:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled1.png" alt="Untitled" onclick="openModal(this.src)"/>
  </div>

As we can see, we have two open ports: Http (80) and Https(443), we can access them entering the IP address into the address bar of our browser.

Let's check for hidden directories by fuzzing the website with Gobuster:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >gobuster dir --url target_IP -w path_to_wordlist</code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled3.png" alt="Untitled" onclick="openModal(this.src)"/>
  </div>

First of all, every website may contain a directory called */robots.txt*, so let's check it out:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

Great, we found the first key, which we can view its content by accessing it from the navigator bar `target_IP/key.txt` or by using the command `curl target_IP/key.txt` from the terminal:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

As we can see above, we found a directory called */dashboard*, which belongs to a WordPress admin (*/wp-admin*).

If we access this directory, we obtain the following result:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

We are facing a login panel, which means that we need credentials (username and password) to access the resource.

In addition, we found a directory called */license* that, if we access it, will lead us to a password at the end. If we perform a `curl` on this directory, we will obtain the username and password:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

It is encrypted in base64, so let's convert it and obtain the content:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

As we can see, we obtain a username and his password.

We are going to use these credentials in the login panel obtained earlier to access the content of the */wp-admin* directory.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

We are in, so now we will proceed to search the other keys.

As we know, WordPress runs on *PHP*; therefore, we are going to create a PHP reverse shell to gain access and achieve remote command execution (RCE), using a script found on GitHub → [Pentestmonkey-php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell).


Now, we paste the script in the Appearance section → Editor → Archives:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 10.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

Next, we open a port to listen using `netcat`. To do this, we need to modify the script obtained earlier by entering our IP address and the listening port:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 11.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  


<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 12.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

We perform the reverse shell and we are in.

Now, we are going to look for other keys, these are usually written in plain text files with a '.txt'.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 13.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

We search for all files that end with the '.txt' extension, and we see that the second key is located in the directory */home*.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 14.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

Through the command `cat filename`, we can display the content of the flag; however, it tells us that we do not have the required permissions, so we need to find a way to escalate privileges.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 15.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

In addition to the key, in the */home* directory we found another file which is a password, but it is encrypted.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 16.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

We will use the following website to decrypt the file with the extension '.md5'.
[Crackstation](https://crackstation.net/):

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 17.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

There is our password, which will help us escalate privileges.

First, we handle the tty to be able to type the `su` command in the terminal and escalate privileges.

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >python -c "import pty;pty.spawn("/bin/bash")"</code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 19.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

Now, we are the user robot and we have the required permissions to access to the second key.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 20.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

To find the last key, we first perform a search using the `find` command with the same parameters as before, but we do not obtain anything.

So we need to find a way to discover where the flag is located. We can look for some binaries with the SUID bit set, which allows us to execute a script as root:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled 21.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

Great!, we found one binary that is quite unusual, which is */usr/local/bin/nmap*. If we look at [GTFOBins-Nmap](https://gtfobins.github.io/gtfobins/nmap/#sudo), we can obtain information about how to run the exploit. In this case, we focus on the sudo type since we want to become root user:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled22.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  


Let's run the exploit:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled23.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

We have escalated privileges to root. Now, we are able to access the last key, which is located, as expected, in the root directory.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/MrRobotCTF/Untitled24.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>  

Done! If we use the `cat` command, we will display the content of the flag.

---
