// Chat application JavaScript
let conversationHistory = [];
let isWaitingForResponse = false;

// Initialize the chat
document.addEventListener('DOMContentLoaded', async () => {
    await loadAgentConfig();
    sendInitialGreeting();
    setupEventListeners();
});

// Load agent configuration
async function loadAgentConfig() {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        
        // Update UI with agent name
        const agentNameElement = document.getElementById('agent-name');
        if (agentNameElement) {
            agentNameElement.textContent = config.agent_name || 'AI Support Agent';
        }
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// Send initial greeting
async function sendInitialGreeting() {
    const greetingElement = document.getElementById('initial-greeting');
    if (greetingElement) {
        try {
            const response = await fetch('/api/config');
            const config = await response.json();
            const agentName = config.agent_name || 'AI Support Agent';
            greetingElement.textContent = `Hello! I'm ${agentName}, your support assistant. How can I help you today?`;
        } catch (error) {
            greetingElement.textContent = "Hello! I'm your support assistant. How can I help you today?";
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    
    chatForm.addEventListener('submit', handleSubmit);
    
    // Handle Enter key (Shift+Enter for new line, Enter to send)
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    });
    
    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
    });
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || isWaitingForResponse) {
        return;
    }
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send message to backend
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: conversationHistory
            })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        hideTypingIndicator();
        
        if (data.error) {
            addMessageToChat('Sorry, I encountered an error. Please try again.', 'agent');
        } else {
            addMessageToChat(data.response, 'agent');
        }
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('Sorry, I\'m having trouble connecting. Please check your connection and try again.', 'agent');
        console.error('Error:', error);
    }
}

// Add message to chat UI
function addMessageToChat(message, role) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const avatar = role === 'user' ? '👤' : '🤖';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-text">${formatMessage(message)}</div>
            <div class="message-time">${currentTime}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Update conversation history
    conversationHistory.push({
        role: role,
        content: message
    });
}

// Format message (convert markdown-like formatting to HTML)
function formatMessage(message) {
    // Convert **bold** to <strong>
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points
    message = message.replace(/^•\s(.+)$/gm, '<li>$1</li>');
    message = message.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convert numbered lists
    message = message.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
    
    // Convert line breaks
    message = message.replace(/\n/g, '<br>');
    
    return message;
}

// Show typing indicator
function showTypingIndicator() {
    isWaitingForResponse = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message agent-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="message-text typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    
    // Disable send button
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    if (sendButton) sendButton.disabled = true;
    if (messageInput) messageInput.disabled = true;
}

// Hide typing indicator
function hideTypingIndicator() {
    isWaitingForResponse = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    
    // Enable send button
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    if (sendButton) sendButton.disabled = false;
    if (messageInput) messageInput.disabled = false;
    if (messageInput) messageInput.focus();
}

// Scroll to bottom of chat
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
