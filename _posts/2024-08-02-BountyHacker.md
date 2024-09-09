---
title: Bounty Hacker
layout: post
post-image: "../assets/images/Rooms/BountyHacker/BH.png"
description: You talked a big game about being the most elite hacker in the solar system. Prove it and claim your right to the status of Elite Bounty Hacker!
difficulty: Easy
enlace: https://tryhackme.com/r/room/cowboyhacker
tags:
- Enumeration
- Privilege Escalation
- Fuzzing
- Web
---

# User.txt
Using `nmap`, we will scan the ports of the target machine:

<div style="text-align:center;"> <div class="code-container"> <div class="code-header"> Bash <button class="copy-button" data-code="bash">Copy</button> </div> <pre><code class="language-bash">nmap -sC -sV -p- target_ip</code></pre> </div> </div> <div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 1.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

We have found several open ports → 21 (FTP service), 22 (SSH service), and 80 (web page).

Let's check what's on port 80, which is the web page:

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 2.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

As we can see, we didn't find much, but we can try searching for hidden directories on this website using **gobuster**.

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 3.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

We didn't find anything important, just a directory "/images" which does not contain anything relevant.

Remember, we have port 21 (FTP) open, which is a server where we can upload and download files. We can see that this service offers anonymous access, so we'll take advantage of that:

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 4.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

If we list the files on the server, we find a couple of them that we can download to our machine using the `get <filename>` command:

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 5.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

The file *locks.txt* contains many passwords, and the file tasks.txt contains some text and the name of the author.

Since we have the name and a series of passwords, we'll perform an SSH connection to access the system:

- First, we create a file 'users.txt' containing all the usernames we obtained from the previous web page.

- We perform a brute force attack using `hydra` to find a matching username and password.

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/a1.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

Now we proceed to make the `SSH` connection.

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 6.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

Next, we use the find command to search for the User.txt file, which is our flag to find → `find / -type f -name 'user.txt'`.

Where `-type` (file type), `-name` (file name).

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 7.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

# Root.txt

To obtain the ***Root.txt*** file, we need to escalate privileges since the previous *find* search tells us that we don't have access to the /root directory.

To do this, we need to find a way to acquire root permissions.

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 8.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

We see that the user*Lin* can execute tar commands, so we need to find an exploit.

We search for the exploit on gtfobins → [GTFOBins-Tar](https://gtfobins.github.io/gtfobins/tar/#sudo), look for tar, and go to the **Sudo** section.

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/Untitled 9.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

If we run that command on the target machine, we will have root access and can search for the file.

<div style="text-align: center; "> <img src="../assets/images/Rooms/BountyHacker/b.png" alt="Untitled" onclick="openModal(this.src)" /> </div>

We have found the root.txt flag.

---