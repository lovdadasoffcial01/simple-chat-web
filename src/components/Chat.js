export class Chat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.messages = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .chat-container {
          height: calc(100vh - 120px);
          overflow-y: auto;
          padding: var(--spacing-md);
        }
        
        .message {
          margin-bottom: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--border-radius-lg);
          max-width: 80%;
        }
        
        .message.user {
          margin-left: auto;
          background: var(--primary-color);
          color: white;
        }
        
        .message.ai {
          margin-right: auto;
          background: var(--secondary-color);
          color: white;
        }
      </style>
      
      <div class="chat-container" id="chatContainer">
        ${this.messages.map(msg => this.messageTemplate(msg)).join('')}
      </div>
    `;
  }

  messageTemplate(message) {
    return `
      <div class="message ${message.type}">
        <div class="message-content">${message.content}</div>
        <div class="message-time">${message.timestamp}</div>
      </div>
    `;
  }

  addMessage(message) {
    this.messages.push(message);
    this.render();
    this.scrollToBottom();
  }

  scrollToBottom() {
    const container = this.shadowRoot.getElementById('chatContainer');
    container.scrollTop = container.scrollHeight;
  }

  setupEventListeners() {
    // Add any chat-specific event listeners here
  }
}

customElements.define('chat-window', Chat);