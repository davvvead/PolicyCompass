// Popup script
document.getElementById('toggleSwitch').addEventListener('click', function() {
  this.classList.toggle('active');
  const enabled = this.classList.contains('active');
  chrome.storage.local.set({ enabled });
});

// Language selection
document.querySelectorAll('input[name="language"]').forEach(input => {
  input.addEventListener('change', function() {
    chrome.storage.local.set({ language: this.value });
  });
});

// Accessibility settings
document.getElementById('accessibility-mode').addEventListener('change', function() {
  chrome.storage.local.set({ highContrastMode: this.checked });
});

document.getElementById('voice-enabled').addEventListener('change', function() {
  chrome.storage.local.set({ voiceEnabled: this.checked });
});

// Load saved settings
chrome.storage.local.get(['enabled', 'language', 'highContrastMode', 'voiceEnabled'], (result) => {
  if (result.enabled) {
    document.getElementById('toggleSwitch').classList.add('active');
  }
  
  if (result.language) {
    document.querySelector(`input[value="${result.language}"]`).checked = true;
  }
  
  if (result.highContrastMode) {
    document.getElementById('accessibility-mode').checked = true;
  }
  
  if (result.voiceEnabled) {
    document.getElementById('voice-enabled').checked = true;
  }
});

function openOptions() {
  chrome.runtime.openOptionsPage();
}
