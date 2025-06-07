import { Header } from '../components/Header.js';
import { Chat } from '../components/Chat.js';
import { MessageInput } from '../components/MessageInput.js';
import { Settings } from '../components/Settings.js';
import { initTheme } from './themes.js';
import { setupUtils } from './utils.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    // Initialize theme
    initTheme();
    
    // Setup utility functions
    setupUtils();
    
    // Mount components
    this.mountComponents();
    
    // Setup event listeners
    this.setupEventListeners();
  }

  mountComponents() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <app-header></app-header>
      <main class="container">
        <chat-window></chat-window>
      </main>
      <message-input></message-input>
    `;
  }

  setupEventListeners() {
    document.addEventListener('message-send', async (e) => {
      const chat = document.querySelector('chat-window');
      const message = e.detail.message;
      
      // Add user message
      chat.addMessage({
        type: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString()
      });
      
      try {
        // Send to API and get response
        const response = await this.sendToAPI(message);
        
        // Add AI response
        chat.addMessage({
          type: 'ai',
          content: response,
          timestamp: new Date().toLocaleTimeString()
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
      }
    });
  }

  async sendToAPI(message) {
    const settings = JSON.parse(localStorage.getItem('chatSettings')) || {};
    
    const response = await fetch('https://ai.api-url-production.workers.dev/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen',
        prompt: message,
        max_tokens: settings.maxTokens || 8000,
        temperature: settings.temperature || 0.6
      })
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.response;
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});