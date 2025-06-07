export class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = this.loadSettings();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  loadSettings() {
    return JSON.parse(localStorage.getItem('chatSettings')) || {
      temperature: 0.6,
      maxTokens: 8000,
      autoScroll: true,
      syntaxHighlight: true
    };
  }

  saveSettings() {
    localStorage.setItem('chatSettings', JSON.stringify(this.settings));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .settings-container {
          max-width: 600px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }
        
        .setting-group {
          margin-bottom: var(--spacing-xl);
        }
        
        .setting-group h2 {
          margin-bottom: var(--spacing-md);
          color: var(--primary-color);
        }
        
        .setting-item {
          margin-bottom: var(--spacing-md);
        }
        
        .slider-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .slider-label {
          display: flex;
          justify-content: space-between;
        }
      </style>
      
      <div class="settings-container">
        <div class="setting-group">
          <h2>Model Parameters</h2>
          <div class="setting-item">
            <div class="slider-container">
              <div class="slider-label">
                <span>Temperature</span>
                <span id="temperatureValue">${this.settings.temperature}</span>
              </div>
              <input
                type="range"
                id="temperature"
                min="0"
                max="1"
                step="0.1"
                value="${this.settings.temperature}"
              >
            </div>
          </div>
          <div class="setting-item">
            <div class="slider-container">
              <div class="slider-label">
                <span>Max Tokens</span>
                <span id="maxTokensValue">${this.settings.maxTokens}</span>
              </div>
              <input
                type="range"
                id="maxTokens"
                min="1000"
                max="8000"
                step="1000"
                value="${this.settings.maxTokens}"
              >
            </div>
          </div>
        </div>
        
        <div class="setting-group">
          <h2>Interface</h2>
          <div class="setting-item">
            <label>
              <input
                type="checkbox"
                id="autoScroll"
                ${this.settings.autoScroll ? 'checked' : ''}
              >
              Auto-scroll to bottom
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input
                type="checkbox"
                id="syntaxHighlight"
                ${this.settings.syntaxHighlight ? 'checked' : ''}
              >
              Syntax highlighting
            </label>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const temperature = this.shadowRoot.getElementById('temperature');
    const maxTokens = this.shadowRoot.getElementById('maxTokens');
    const autoScroll = this.shadowRoot.getElementById('autoScroll');
    const syntaxHighlight = this.shadowRoot.getElementById('syntaxHighlight');

    temperature.addEventListener('input', (e) => {
      this.settings.temperature = parseFloat(e.target.value);
      this.shadowRoot.getElementById('temperatureValue').textContent = this.settings.temperature;
      this.saveSettings();
    });

    maxTokens.addEventListener('input', (e) => {
      this.settings.maxTokens = parseInt(e.target.value);
      this.shadowRoot.getElementById('maxTokensValue').textContent = this.settings.maxTokens;
      this.saveSettings();
    });

    autoScroll.addEventListener('change', (e) => {
      this.settings.autoScroll = e.target.checked;
      this.saveSettings();
    });

    syntaxHighlight.addEventListener('change', (e) => {
      this.settings.syntaxHighlight = e.target.checked;
      this.saveSettings();
    });
  }
}

customElements.define('settings-panel', Settings);