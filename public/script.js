// ============================================
// MODERN CUSTOMER SUPPORT CHATBOT
// Enhanced JavaScript with Modern Features
// ============================================

let conversationHistory = [];
let isWaitingForResponse = false;
let currentTheme = 'light';
let selectedFile = null;

// Initialize the chat
document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();
    await loadAgentConfig();
    setupEventListeners();
    setupAccessibility();
    hideWelcomeOnFirstMessage();
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initializeTheme() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    currentTheme = theme;
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (!themeIcon) return;
    
    if (theme === 'dark') {
        themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    } else {
        themeIcon.innerHTML = `
            <path d="M12 3V1M12 23V21M21 12H23M1 12H3M18.364 18.364L19.778 19.778M4.222 4.222L5.636 5.636M18.364 5.636L19.778 4.222M4.222 19.778L5.636 18.364M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// ============================================
// AGENT CONFIGURATION
// ============================================

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

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const themeToggle = document.getElementById('themeToggle');
    const attachButton = document.getElementById('attachButton');
    const voiceButton = document.getElementById('voiceButton');
    const fileInput = document.getElementById('fileInput');
    const removeFileBtn = document.getElementById('removeFile');
    const suggestedQuestions = document.querySelectorAll('.question-chip');
    
    // Form submission
    if (chatForm) {
        chatForm.addEventListener('submit', handleSubmit);
    }
    
    // Textarea auto-resize and character count
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            autoResizeTextarea(messageInput);
            updateCharacterCount(messageInput);
        });
        
        // Handle Enter key (Shift+Enter for new line, Enter to send)
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isWaitingForResponse && messageInput.value.trim()) {
                    handleSubmit(e);
                }
            }
        });
        
        // Keyboard navigation for message history
        let messageHistory = [];
        let historyIndex = -1;
        
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && messageInput.value === '') {
                e.preventDefault();
                if (historyIndex < messageHistory.length - 1) {
                    historyIndex++;
                    messageInput.value = messageHistory[messageHistory.length - 1 - historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex > 0) {
                    historyIndex--;
                    messageInput.value = messageHistory[messageHistory.length - 1 - historyIndex];
                } else {
                    historyIndex = -1;
                    messageInput.value = '';
                }
            } else if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
                historyIndex = -1;
            }
        });
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // File attachment
    if (attachButton && fileInput) {
        attachButton.addEventListener('click', () => fileInput.click());
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', removeFile);
    }
    
    // Voice input (placeholder - would need Web Speech API implementation)
    if (voiceButton) {
        voiceButton.addEventListener('click', () => {
            alert('Voice input feature coming soon!');
            // TODO: Implement Web Speech API
        });
    }
    
    // Suggested questions
    suggestedQuestions.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.textContent.trim();
            messageInput.value = question;
            messageInput.focus();
            autoResizeTextarea(messageInput);
            handleSubmit(new Event('submit'));
        });
    });
    
    // Escape key to close/minimize (if needed)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Could implement minimize functionality here
        }
    });
}

// ============================================
// MESSAGE HANDLING
// ============================================

async function handleSubmit(e) {
    e.preventDefault();
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || isWaitingForResponse) {
        return;
    }
    
    // Hide welcome message on first user message
    hideWelcomeMessage();
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Save to history for navigation
    if (!conversationHistory.some(msg => msg.role === 'user' && msg.content === message)) {
        const historyInput = document.getElementById('messageInput');
        if (historyInput) {
            // Store in history (would need to persist this properly)
        }
    }
    
    messageInput.value = '';
    autoResizeTextarea(messageInput);
    updateCharacterCount(messageInput);
    
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
            showErrorAnimation();
        } else {
            addMessageToChat(data.response, 'agent');
        }
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('Sorry, I\'m having trouble connecting. Please check your connection and try again.', 'agent');
        showErrorAnimation();
        console.error('Error:', error);
    }
}

// ============================================
// UI UPDATES
// ============================================

function addMessageToChat(message, role) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.setAttribute('role', 'article');
    messageDiv.setAttribute('aria-label', `${role} message`);
    
    const avatar = role === 'user' ? '👤' : '🤖';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar" role="img" aria-label="${role} avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-text">${formatMessage(message)}</div>
            <div class="message-time" aria-label="Sent at ${currentTime}">${currentTime}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Announce new message to screen readers
    announceMessage(role, message);
    
    // Update conversation history
    conversationHistory.push({
        role: role,
        content: message
    });
}

function formatMessage(message) {
    // Escape HTML first
    let formatted = escapeHtml(message);
    
    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert bullet points
    formatted = formatted.replace(/^•\s(.+)$/gm, '<li>$1</li>');
    if (formatted.includes('<li>')) {
        formatted = formatted.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    }
    
    // Convert numbered lists
    formatted = formatted.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
    
    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formatted = formatted.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    return formatted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showTypingIndicator() {
    isWaitingForResponse = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message agent-message typing-indicator-container';
    typingDiv.id = 'typing-indicator';
    typingDiv.setAttribute('aria-live', 'polite');
    typingDiv.setAttribute('aria-label', 'Agent is typing');
    
    typingDiv.innerHTML = `
        <div class="message-avatar" role="img" aria-label="Agent avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    
    // Disable send button and input
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    if (sendButton) sendButton.disabled = true;
    if (messageInput) messageInput.disabled = true;
}

function hideTypingIndicator() {
    isWaitingForResponse = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    
    // Enable send button and input
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    if (sendButton) sendButton.disabled = false;
    if (messageInput) {
        messageInput.disabled = false;
        messageInput.focus();
    }
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ============================================
// FILE HANDLING
// ============================================

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    selectedFile = file;
    showFilePreview(file);
}

function showFilePreview(file) {
    const filePreview = document.getElementById('filePreview');
    const fileThumbnail = document.getElementById('fileThumbnail');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    
    if (!filePreview || !fileThumbnail || !fileName || !fileSize) return;
    
    // Show preview container
    filePreview.style.display = 'flex';
    
    // Set file name
    fileName.textContent = file.name;
    
    // Set file size
    fileSize.textContent = formatFileSize(file.size);
    
    // Show thumbnail if image
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileThumbnail.src = e.target.result;
            fileThumbnail.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        fileThumbnail.style.display = 'none';
    }
}

function removeFile() {
    selectedFile = null;
    const filePreview = document.getElementById('filePreview');
    const fileInput = document.getElementById('fileInput');
    
    if (filePreview) filePreview.style.display = 'none';
    if (fileInput) fileInput.value = '';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

function updateCharacterCount(textarea) {
    const characterCount = document.getElementById('characterCount');
    if (!characterCount || !textarea) return;
    
    const current = textarea.value.length;
    const max = 1000;
    characterCount.textContent = `${current}/${max}`;
    
    // Update color based on limit
    if (current > max * 0.9) {
        characterCount.style.color = 'var(--error)';
    } else if (current > max * 0.7) {
        characterCount.style.color = 'var(--warning)';
    } else {
        characterCount.style.color = 'var(--text-tertiary)';
    }
}

function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
}

function hideWelcomeOnFirstMessage() {
    // This will be called when first message is sent
    // Currently handled in handleSubmit
}

function showErrorAnimation() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        chatContainer.style.animation = 'shake 0.5s';
        setTimeout(() => {
            chatContainer.style.animation = '';
        }, 500);
    }
}

// Add shake animation to CSS dynamically if needed
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// ACCESSIBILITY
// ============================================

function setupAccessibility() {
    // Focus management
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.focus();
    }
    
    // Live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'liveRegion';
    document.body.appendChild(liveRegion);
}

function announceMessage(role, message) {
    const liveRegion = document.getElementById('liveRegion');
    if (liveRegion) {
        const roleText = role === 'user' ? 'You said' : 'Agent said';
        liveRegion.textContent = `${roleText}: ${message.substring(0, 100)}`;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollToBottom = debounce(scrollToBottom, 100);
