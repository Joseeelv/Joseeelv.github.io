---
title: Brooklyn Nine Nine
layout: post
post-image: "../assets/images/Rooms/BNN/bnn.png"
description: This room is aimed for beginner level hackers but anyone can try to hack this box. There are two main intended ways to root the box.
difficulty: Easy
enlace: https://tryhackme.com/r/room/brooklynninenine
tags:
- Enumeration
- FTP
- Privilege Escalation
- Brute force
- Exploit
---

# User.txt

First, we are going to scan the first 1024 ports:
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >nmap -sC -sV -p0-1023 &lt;target_IP&gt;</code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We have the following ports open: 21 '*FTP*', 22 '*SSH*', 80 '*HTTP*', and others..


<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

Success. Once inside, we can see a file called *note_to_jake.txt*. Using the command `get <filename>` we can download the file to our machine.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

After download the file, we open it using the `cat <filename>` command:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

After reading the file, we obtain the username *jake*.
Through the tool Hydra, we can perform a brute force attack with that username and a wordlist:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >hydra -l &lt;username&gt; -P /&lt;path_to_wordlist&gt; &lt;Protocol&gt;::&lt;//target_IP&gt;</code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

After obtaining the password for that user, we can establish a connection via *SSH*:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We are in, so let's look for the *user.txt*:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

# Root.txt

We already have the user flag, as we can see in the image above.

Now, we will proceed to obtain the root flag. For this, we need to escalate privileges, since this flag can only be read by a root user.

First of all, we check if *jake* can execute binaries using `sudo -l`:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Cool! The user *jake* can execute the `less` command with root permissions. 

Since this is a sudo binary, we can run the exploit in the following way → [GTFObins-less](https://gtfobins.github.io/gtfobins/less/#sudo):

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

And if we type `!/bin/sh`, we become root user:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

Done, we find the *root.txt* and obtain the flag:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 10.png" alt="Untitled" onclick="openModal(this.src)"/>
</div>

---
