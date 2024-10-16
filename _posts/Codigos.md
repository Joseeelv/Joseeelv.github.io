
# Escaneo de puertos:
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >sudo nmap -p- -open -sS -sV -sC -n -Pn -vvv --min-rate 5000 &lt;target_IP&gt; -oN filename</code></pre>
  </div>
</div>


# Búsqueda de binarios SUID activado:
<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >find / -perm -4000 -type f -ls 2&gt;/dev/null</code></pre>
  </div>
</div>

# Ataque con Hydra

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre><code class="language-bash" >hydra -l username -P /&lt;path_to_wordlist&gt; &lt;Protocol&gt;::&lt;//target_IP&gt;</code></pre>
  </div>
</div>