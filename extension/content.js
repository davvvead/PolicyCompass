// PolicyCompass Content Script
// Injected into government websites to create floating widget

console.log('PolicyCompass content script loaded on:', window.location.href);

// Verify chrome API access with detailed logging
(function checkChromeAPI() {
  if (typeof chrome !== 'undefined') {
    console.log('✓ chrome object exists');
    if (chrome.runtime) {
      console.log('✓ chrome.runtime exists');
      if (chrome.runtime.sendMessage) {
        console.log('✓ chrome.runtime.sendMessage exists');
      } else {
        console.error('✗ chrome.runtime.sendMessage does NOT exist');
      }
    } else {
      console.error('✗ chrome.runtime does NOT exist');
    }
  } else {
    console.error('✗ chrome object does NOT exist - this should not happen in a content script');
  }
})();

// Create floating widget container
function initializeWidget() {
  // Check if widget already exists
  if (document.getElementById('policycompass-widget')) {
    return;
  }

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'policycompass-widget';
  widgetContainer.innerHTML = `
    <div id="policycompass-widget-wrapper">
      <div id="policycompass-toggle-btn" class="policycompass-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div id="policycompass-chatbox" class="policycompass-chatbox hidden">
        <div class="policycompass-header">
          <h3>PolicyCompass</h3>
          <button id="policycompass-close-btn" class="policycompass-close">×</button>
        </div>
        <div id="policycompass-messages" class="policycompass-messages"></div>
        <div class="policycompass-input-area">
          <input 
            type="text" 
            id="policycompass-input" 
            placeholder="Ask me about this page..." 
            class="policycompass-input"
          />
          <button id="policycompass-send-btn" class="policycompass-send">→</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  // Initialize event listeners
  initializeEventListeners();
}

function initializeEventListeners() {
  const toggleBtn = document.getElementById('policycompass-toggle-btn');
  const closeBtn = document.getElementById('policycompass-close-btn');
  const sendBtn = document.getElementById('policycompass-send-btn');
  const input = document.getElementById('policycompass-input');
  const chatbox = document.getElementById('policycompass-chatbox');
  const messagesContainer = document.getElementById('policycompass-messages');

  // Toggle chatbox
  toggleBtn.addEventListener('click', () => {
    const isHidden = chatbox.classList.toggle('hidden');
    
    // Show welcome message on first open
    if (!isHidden && messagesContainer.children.length === 0) {
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'policycompass-message ai-message';
      welcomeMsg.innerHTML = `
        <strong>Welcome to PolicyCompass 👋</strong>
        <p>I'm here to help explain government services and policies in simple language.</p>
        <p><em>Ask me anything about this page!</em></p>
      `;
      messagesContainer.appendChild(welcomeMsg);
    }
  });

  // Close chatbox
  closeBtn.addEventListener('click', () => {
    chatbox.classList.add('hidden');
  });

  // Send message
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function sendMessage() {
  const input = document.getElementById('policycompass-input');
  const messagesContainer = document.getElementById('policycompass-messages');
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Check if chrome.runtime is available
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'policycompass-message ai-message';
    errorMsg.textContent = 'Error: Extension not properly initialized. Please refresh the page.';
    messagesContainer.appendChild(errorMsg);
    return;
  }

  // Add user message to chat
  const userMsg = document.createElement('div');
  userMsg.className = 'policycompass-message user-message';
  userMsg.textContent = userMessage;
  messagesContainer.appendChild(userMsg);

  // Clear input
  input.value = '';

  // Add loading indicator
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'policycompass-message ai-message';
  loadingMsg.textContent = 'Loading...';
  loadingMsg.id = 'policycompass-loading';
  messagesContainer.appendChild(loadingMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Get page content and process with AI
  const pageContent = document.body.innerText.substring(0, 5000);
  const pageTitle = document.title;

  // Send to background script for processing
  try {
    chrome.runtime.sendMessage(
      {
        action: 'processQuery',
        query: userMessage,
        pageContent: pageContent,
        pageTitle: pageTitle,
        pageUrl: window.location.href
      },
      (response) => {
        // Remove loading indicator
        const loading = document.getElementById('policycompass-loading');
        if (loading) loading.remove();

        if (chrome.runtime.lastError) {
          console.error('PolicyCompass error:', chrome.runtime.lastError);
          const errorMsg = document.createElement('div');
          errorMsg.className = 'policycompass-message ai-message';
          errorMsg.textContent = 'Error: ' + chrome.runtime.lastError.message;
          messagesContainer.appendChild(errorMsg);
        } else if (response && response.error) {
          console.error('API error:', response.error);
          const errorMsg = document.createElement('div');
          errorMsg.className = 'policycompass-message ai-message';
          errorMsg.textContent = response.error;
          messagesContainer.appendChild(errorMsg);
        } else if (response && response.summary) {
          // Add AI response
          const aiMsg = document.createElement('div');
          aiMsg.className = 'policycompass-message ai-message';
          aiMsg.innerHTML = response.summary;
          messagesContainer.appendChild(aiMsg);

          // Highlight relevant elements on page
          if (response.highlights && response.highlights.length > 0) {
            highlightPageElements(response.highlights);
          }
        } else {
          console.error('Invalid response:', response);
          const errorMsg = document.createElement('div');
          errorMsg.className = 'policycompass-message ai-message';
          errorMsg.textContent = 'No response received. Please try again.';
          messagesContainer.appendChild(errorMsg);
        }

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    const errorMsg = document.createElement('div');
    errorMsg.className = 'policycompass-message ai-message';
    errorMsg.textContent = 'Error: ' + error.message;
    messagesContainer.appendChild(errorMsg);
  }
}

function highlightPageElements(highlights) {
  // Find and highlight relevant text/elements on the page
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  const nodesToReplace = [];

  while (node = walker.nextNode()) {
    highlights.forEach(highlight => {
      if (node.textContent.toLowerCase().includes(highlight.toLowerCase())) {
        nodesToReplace.push({
          node: node,
          text: highlight
        });
      }
    });
  }

  nodesToReplace.forEach(({ node, text }) => {
    const parent = node.parentNode;
    const regex = new RegExp(`(${text})`, 'gi');
    const html = node.textContent.replace(regex, '<mark class="policycompass-highlight">$1</mark>');
    const span = document.createElement('span');
    span.innerHTML = html;
    parent.replaceChild(span, node);
  });
}

// Initialize widget when DOM is ready
console.log('Document ready state:', document.readyState);
if (document.readyState === 'loading') {
  console.log('Waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired, initializing widget');
    initializeWidget();
  });
} else {
  console.log('DOM already loaded, initializing widget immediately');
  initializeWidget();
}

// Final verification after page load
window.addEventListener('load', () => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    console.log('✓ PolicyCompass: chrome.runtime is available and ready');
  } else {
    console.error('✗ PolicyCompass: chrome.runtime is NOT available - extension may not be working');
  }
});
