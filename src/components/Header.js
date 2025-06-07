export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--background-color);
          border-bottom: 1px solid var(--border-color);
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .actions {
          display: flex;
          gap: var(--spacing-md);
        }
      </style>
      
      <div class="header">
        <div class="logo">
          <img src="/assets/logo.svg" alt="AI Math Chat" width="32" height="32">
          <h1>Advanced AI Math Chat</h1>
        </div>
        <div class="actions">
          <button id="themeToggle">🌓</button>
          <button id="settingsBtn">⚙️</button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const themeToggle = this.shadowRoot.getElementById('themeToggle');
    const settingsBtn = this.shadowRoot.getElementById('settingsBtn');

    themeToggle.addEventListener('click', () => {
      document.documentElement.toggleAttribute('data-theme-dark');
    });

    settingsBtn.addEventListener('click', () => {
      window.location.href = '/settings';
    });
  }
}

customElements.define('app-header', Header);