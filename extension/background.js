// PolicyCompass Background Service Worker
// Handles AI processing and communication between content script and backend

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'processQuery') {
    processUserQuery(request, sender, sendResponse);
    return true; // Keep the message channel open for async response
  }
});

async function processUserQuery(request, sender, sendResponse) {
  try {
    const { query, pageContent, pageTitle, pageUrl } = request;

    console.log('[PolicyCompass] Processing query:', query);
    console.log('[PolicyCompass] API endpoint: http://localhost:3000/api/extension/process');

    // Call your PolicyCompass backend API
    const response = await fetch('http://localhost:3000/api/extension/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        pageContent,
        pageTitle,
        pageUrl,
        tabId: sender.tab.id
      })
    });

    console.log('[PolicyCompass] API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[PolicyCompass] API error:', response.status, errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[PolicyCompass] API response received:', data);

    sendResponse({
      success: true,
      summary: data.summary,
      highlights: data.highlights,
      guidance: data.guidance
    });
  } catch (error) {
    console.error('[PolicyCompass] Catch error:', error.message);
    sendResponse({
      success: false,
      error: error.message || 'Unable to process your request. Please try again.'
    });
  }
}

// Store extension state
chrome.storage.local.set({
  enabled: true,
  language: 'en',
  accessibilityMode: false
});
