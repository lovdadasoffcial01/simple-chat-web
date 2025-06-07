export function setupUtils() {
  // Add copy functionality to code blocks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
      const code = e.target.nextElementSibling.textContent;
      navigator.clipboard.writeText(code).then(() => {
        e.target.textContent = 'Copied!';
        setTimeout(() => {
          e.target.textContent = 'Copy';
        }, 1500);
      });
    }
  });

  // Format code blocks
  window.formatCode = (code, language) => {
    if (!code) return '';
    
    return `<pre><button class="copy-btn">Copy</button><code class="language-${language}">${code}</code></pre>`;
  };

  // Format timestamps
  window.formatTime = (date) => {
    return new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(date);
  };
}