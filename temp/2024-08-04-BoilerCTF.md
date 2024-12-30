---
title: Boiler CTF
layout: post
post-image: "../assets/images/Rooms/BoilerCTF/boiler.png"
description: Intermediate level CTF
difficulty: Medium
enlace: https://tryhackme.com/r/room/boilerctf2
tags:
- Enumeration
- Privilege Escalation
- Web
---

First of all, we are going to perform a network scanning, to see what ports are open:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >sudo nmap -p- -open -sC -sV -sS -n --min-rate 5000 -Pn -vvv &lt;target_IP&gt; </code></pre>
  </div>
</div>


<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Let's check the website:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We see that it is a website of a default Apache service, so , we are going to check if there are hidden directories on this domain:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >fuzz -w &lt;path_to_wordlist&gt; -u &lt;target_IP&gt;/FUZZ </code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Since there's nothing in the hidden directories, we are going to log in to the *FTP* server, using username *Anonymous*:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We download the file and we open it:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We see that is readable, so we are going to decrypt it.

As a result, we have the phrase: *Just wanted to see if you find it. Lol. Remember: Enumeration is the key!*

Now, we are going to check the directory `/robots.txt`:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

We found a series of ASCII numbers that, if we turn to a base64 and MD5, we obtain the string *kidding* (A waste of time..).

Let's keep checking stuff:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

In the directory `/joomla`, this nothing relevant at first glance, but we can fuzz the website to find hidden directories within it.

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Indeed, we found a large number of hidden directories within the directory `/joomla`.

We see there is a directory called `/_tests`, so let's check it out:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

If we search for *sar2html* on Google, we will find an exploit on Exploit-DB that can be used against it  → [exploit-db/Sar2HTML](https://www.exploit-db.com/exploits/47204) (here is the exploit).

The exploit tell us that we can perform a remote command execution 'RCE' in the navigation bar due to `*plot=*`, so let's test it:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

If we use `whoami`, we see that it tell us we are the user **www-data**, so let's list the files and directories to see what we can find:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 10.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

As we can see, we found several files, the most interesting one is *log.txt*. If we use `plot=;cat log.txt` we will obtain a login history:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 11.png" alt="Untitled" onclick="openModal(this.src)" />
</div>
*
After doing that, we can see a username *basterd* and his password *superduperp@$$*. Thanks to these credentials, we are able to perform a *SSH* connection:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 12.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Once inside, we see a file called `backup.sh`. If we open it, we found the directory `/home/stoner`, which contains the username and his password.

Let's pivot to that user using `su stoner` and typing the following password: `superduperp@$$no1knows`. Now, if we navigate though directories, we find his directory and of course, we can access it.

As a result, we obtain the flag:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 13.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Now, we want to find the root flag, which needs root privileges, so we need to find a way to escalate privileges.

To achieve this, first, let's check if the user *stoner* can execute binaries using `sudo -l` :

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 14.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

No luck, so let's find another way to escalate privileges such as checking the binaries with the SUID bit set:

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >find / -perm -4000 -type f -ls 2>/dev/null</code></pre>
  </div>
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 16.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

As a result of the search, we can see that the binary is `/find`, so if we go to the following website [GTFObins-find](https://gtfobins.github.io/gtfobins/find/#suid), we found information on how to run the exploit.

After that, we become a root user, and we have access to that file:
<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BoilerCTF/Untitled 15.png" alt="Untitled" onclick="openModal(this.src)" />
</div>

Done, we have found the *root_flag*. And the challenge is solved.

---