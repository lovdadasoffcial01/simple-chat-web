export class MessageInput extends HTMLElement {
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
        .input-container {
          padding: var(--spacing-md);
          background: var(--background-color);
          border-top: 1px solid var(--border-color);
        }
        
        .input-wrapper {
          display: flex;
          gap: var(--spacing-md);
        }
        
        textarea {
          flex: 1;
          min-height: 60px;
          max-height: 150px;
          padding: var(--spacing-md);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--border-color);
          resize: vertical;
        }
        
        .actions {
          display: flex;
          gap: var(--spacing-sm);
        }
      </style>
      
      <div class="input-container">
        <div class="toolbar">
          <button class="quick-action">Solve Problem</button>
          <button class="quick-action">Explain Concept</button>
          <button class="quick-action">Plot Graph</button>
          <button class="quick-action">Code Example</button>
        </div>
        <div class="input-wrapper">
          <textarea
            id="messageInput"
            placeholder="Ask a math or code question..."
            rows="3"
          ></textarea>
          <div class="actions">
            <button id="sendBtn" class="btn-primary">Send</button>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const textarea = this.shadowRoot.getElementById('messageInput');
    const sendBtn = this.shadowRoot.getElementById('sendBtn');

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });
  }

  sendMessage() {
    const textarea = this.shadowRoot.getElementById('messageInput');
    const message = textarea.value.trim();
    
    if (message) {
      this.dispatchEvent(new CustomEvent('message-send', {
        detail: { message },
        bubbles: true,
        composed: true
      }));
      
      textarea.value = '';
    }
  }
}

customElements.define('message-input', MessageInput);