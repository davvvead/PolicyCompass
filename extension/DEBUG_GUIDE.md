# Extension Debugging Checklist

## Issue: "Error: Could you try rephrasing your question?"

This error happens when:
1. Extension is loaded but using OLD code
2. API endpoint is unreachable
3. Message passing between content script and background worker is broken
4. Content script isn't injected into the page

## Quick Fix Steps

### Step 1: Reload the Extension (Most Common Fix!)
```
1. Open chrome://extensions/
2. Find "PolicyCompass - Government Service Navigator"
3. Click the REFRESH icon (circular arrow) at bottom right of the extension box
4. Go back to ei.gc.ca and try again
```

### Step 2: Verify Extension is Loaded
```
1. Open chrome://extensions/
2. Confirm "PolicyCompass - Government Service Navigator" appears
3. Check that icons/icon-16.png shows as the extension icon
4. Enable "Developer mode" if not already on
```

### Step 3: Check Browser Console Logs
```
1. Go to ei.gc.ca
2. Right-click → Inspect → Console tab
3. Look for messages starting with "[PolicyCompass]"
4. If you see connection errors, the API isn't reachable
5. If you see nothing, the content script isn't injected
```

### Step 4: Check Extension Logs
```
1. Open chrome://extensions/
2. Find PolicyCompass extension
3. Click "Details" 
4. Click "Errors" or scroll down to see any load errors
5. Or click "Inspect views: service worker" to see background.js console
```

### Step 5: Verify API is Running
```
Terminal:
curl -X POST http://localhost:3000/api/extension/process \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "pageContent": "test", "pageTitle": "test", "pageUrl": "https://www.canada.ca"}'

Should return JSON with success: true
```

## Next Steps if Still Broken

1. Check if manifest.json is valid JSON:
   ```
   node -e "console.log(JSON.parse(require('fs').readFileSync('/Users/davvead/Documents/govai/extension/manifest.json', 'utf8')))"
   ```

2. Check if icons directory exists:
   ```
   ls -la /Users/davvead/Documents/govai/extension/icons/
   ```

3. Check if ei.gc.ca matches the host_permissions in manifest.json:
   - Current: `https://www.canada.ca/*`
   - ei.gc.ca URL: `https://www.canada.ca/en/employment-social-development/services/ei/...`
   - ✓ These match!

4. Open Service Worker Console:
   - chrome://extensions/ → PolicyCompass → Details → Click "service worker" under "Inspect views"
   - This shows background.js console logs, will reveal API call errors

## Expected Flow

1. User types in extension popup
2. Content script receives message
3. Background worker calls http://localhost:3000/api/extension/process
4. API returns { success: true, summary: "...", highlights: [...], guidance: [...] }
5. Content script displays response in chatbox
6. Browser console shows: "[PolicyCompass] API response received: {...}"
