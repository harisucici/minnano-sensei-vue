<template>
  <div class="practice">
    <div v-if="isAuthenticated">
      <div class="practice-header">
        <h1>AI Practice Session</h1>
        <div class="session-info">
          <div class="current-streak">
            <span class="streak-icon">🔥</span>
            <span class="streak-count">{{ user.currentStreak }} day streak</span>
          </div>
          <div class="session-timer">
            <span class="timer-icon">⏱️</span>
            <span class="timer-count">{{ formatTime(sessionTime) }}</span>
          </div>
        </div>
      </div>
      
      <div class="practice-container">
        <div class="chat-area">
          <div id="chat-messages" ref="chatContainer">
            <div 
              v-for="message in conversation" 
              :key="message.id" 
              :class="['message', `${message.sender}-message`]"
            >
              <div class="message-content">
                <div class="message-header">
                  <strong>{{ message.sender === 'ai' ? 'Sensei:' : 'You:' }}</strong>
                  <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                </div>
                <div class="message-body">{{ message.message }}</div>
              </div>
            </div>
          </div>
          
          <div class="input-area">
            <textarea 
              v-model="userInput" 
              @keydown.enter.exact.prevent="handleEnter"
              @keydown.shift.enter.exact="handleShiftEnter"
              placeholder="Type your Japanese question or practice sentence here..." 
              ref="inputArea"
            ></textarea>
            <div class="input-controls">
              <button @click="sendMessage" :disabled="isSending" class="send-btn">
                <span v-if="!isSending">Send</span>
                <span v-else>Sending...</span>
              </button>
              <button @click="clearConversation" class="clear-btn">Clear</button>
            </div>
          </div>
        </div>
        
        <div class="practice-sidebar">
          <div class="tips-section">
            <h3>Practice Tips</h3>
            <ul>
              <li>Ask about specific grammar points</li>
              <li>Request example sentences</li>
              <li>Practice conversation scenarios</li>
              <li>Ask for corrections</li>
              <li>Learn cultural context</li>
            </ul>
          </div>
          
          <div class="grammar-help">
            <h3>Quick Grammar Help</h3>
            <div class="grammar-item" @click="insertGrammar('は (wa) - Topic marker')">
              <span class="grammar-pattern">は (wa)</span>
              <span class="grammar-desc">Topic marker</span>
            </div>
            <div class="grammar-item" @click="insertGrammar('です (desu) - Copula')">
              <span class="grammar-pattern">です (desu)</span>
              <span class="grammar-desc">Copula</span>
            </div>
            <div class="grammar-item" @click="insertGrammar('を (wo) - Direct object')">
              <span class="grammar-pattern">を (wo)</span>
              <span class="grammar-desc">Direct object</span>
            </div>
          </div>
          
          <div class="session-summary">
            <h3>Today's Progress</h3>
            <div class="summary-item">
              <span class="summary-label">Messages</span>
              <span class="summary-value">{{ conversation.length }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Learning Time</span>
              <span class="summary-value">{{ formatTime(sessionTime) }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Streak Maintained</span>
              <span class="summary-value">✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="auth-required">
      <h2>Access Denied</h2>
      <p>Please sign in to access the AI practice session.</p>
      <router-link to="/login" class="cta-button">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PracticeView',
  data() {
    return {
      userInput: '',
      isSending: false
    };
  },
  computed: {
    ...mapGetters(['getConversation', 'isAuthenticated', 'getUser']),
    conversation() {
      return this.getConversation;
    },
    user() {
      return this.getUser;
    }
  },
  methods: {
    ...mapActions(['addMessage', 'clearConversation']),
    sendMessage() {
      if (!this.userInput.trim() || this.isSending) return;
      
      // Add user message
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        message: this.userInput,
        timestamp: new Date()
      };
      
      this.addMessage(userMessage);
      this.userInput = '';
      this.isSending = true;
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = this.generateAIResponse(userMessage.message);
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          message: aiResponse,
          timestamp: new Date()
        };
        
        this.addMessage(aiMessage);
        this.isSending = false;
      }, 1000);
      
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    handleEnter() {
      this.sendMessage();
    },
    handleShiftEnter(event) {
      // Allow shift+enter for new line
      const textarea = event.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      
      this.userInput = text.substring(0, start) + '\n' + text.substring(end);
      
      // Move cursor to new position
      this.$nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      });
    },
    generateAIResponse(userInput) {
      // Simple pattern matching for demo purposes
      const lowerInput = userInput.toLowerCase();
      
      if(lowerInput.includes('hello') || lowerInput.includes('こんにちは') || lowerInput.includes('konnichiwa')) {
        return "Kon'nichiwa! こんにちは！ How can I help you with your Japanese studies today?";
      } else if(lowerInput.includes('thank') || lowerInput.includes('ありがとう') || lowerInput.includes('arigato')) {
        return "Dou itashimashite! どういたしまして！ You're welcome!";
      } else if(lowerInput.includes('how') && lowerInput.includes('say')) {
        return "To say that in Japanese, you can use the particle 'wo' (を) to mark the object. For example: 'hon wo yomu' (本を読む) means 'to read a book'.";
      } else if(lowerInput.includes('grammar')) {
        return "Japanese grammar uses particles to indicate the role of words in a sentence. For example, 'ha' (は) marks the topic, 'wo' (を) marks the direct object, and 'ni' (に) often indicates direction or time.";
      } else {
        const responses = [
          "That's a great question! In Japanese, particles are very important to understand sentence structure.",
          "Interesting! Japanese has many particles that indicate the grammatical function of words.",
          "Good question! Remember that in Japanese, the verb typically comes at the end of the sentence.",
          "Great! Japanese sentence structure is typically subject-object-verb, unlike English."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  updated() {
    this.scrollToBottom();
  }
}
</script>

<style scoped>
.practice {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.practice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #eee;
}

.practice-header h1 {
  margin: 0;
  color: #333;
}

.session-info {
  display: flex;
  gap: 1.5rem;
}

.current-streak, .session-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.streak-icon, .timer-icon {
  font-size: 1.2rem;
}

.practice-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

#chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 1.5rem;
  display: flex;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 1rem;
  border-radius: 10px;
  line-height: 1.5;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.timestamp {
  color: #999;
  font-weight: normal;
}

.user-message .message-content {
  background-color: #1a73e8;
  color: white;
  border-bottom-right-radius: 0;
}

.ai-message .message-content {
  background-color: #e8f0fe;
  color: #202124;
  border-bottom-left-radius: 0;
}

.input-area {
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-area textarea {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.input-controls {
  display: flex;
  gap: 0.5rem;
}

.send-btn, .clear-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}

.send-btn {
  background-color: #1a73e8;
  color: white;
}

.send-btn:hover:not(:disabled) {
  background-color: #0d62d0;
}

.clear-btn {
  background-color: #f0f0f0;
  color: #333;
}

.clear-btn:hover {
  background-color: #e0e0e0;
}

.send-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.practice-sidebar {
  width: 300px;
  background: white;
  border-left: 1px solid #eee;
  padding: 1.5rem;
  overflow-y: auto;
}

.tips-section h3, .grammar-help h3, .session-summary h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.tips-section ul {
  padding-left: 1.2rem;
  font-size: 0.9rem;
  color: #666;
}

.grammar-help {
  margin: 1.5rem 0;
}

.grammar-item {
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.grammar-item:hover {
  background-color: #f5f5f5;
}

.grammar-pattern {
  font-weight: bold;
  color: #1a73e8;
  display: block;
}

.grammar-desc {
  font-size: 0.8rem;
  color: #666;
}

.session-summary {
  margin-top: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.summary-label {
  color: #666;
  font-size: 0.9rem;
}

.summary-value {
  font-weight: 500;
  color: #333;
}

.auth-required {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
  background: #f5f7fa;
}

.auth-required h2 {
  color: #1a73e8;
  margin-bottom: 1rem;
}

.auth-required p {
  margin-bottom: 1.5rem;
  color: #666;
  max-width: 400px;
}

.cta-button {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s, box-shadow 0.3s;
}
</style>